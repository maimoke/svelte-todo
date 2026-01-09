<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { authClient } from "$lib/auth-client.js";

  let task = $state("");
  let description = $state("");
  let progress = $state("todo");
  let loading = $state(false);
  let error: string | null = $state(null);
  let createBy = $state("");

  onMount(async () => {
    const { data: session } = await authClient.getSession();
    if (session?.user) {
        createBy = session.user.name;
    } else {
      goto("/login");
    }
  });
  
  async function submit() {
    error = null;
    loading = true;

    const res = await fetch("/task/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task,
        description,
        progress,
        createBy
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      error = data?.message ?? "Failed to create task";
      loading = false;
      return;
    }

    // ✅ success → back to dashboard
    goto("/dashboard");
  }
</script>

<h1 class="title">➕ Create Task</h1>

<form class="form" on:submit|preventDefault={submit}>
  <label>
    Task Title
    <input type="text" bind:value={task} required placeholder="Task name" />
  </label>

  <label>
    Description
    <textarea bind:value={description} rows="4" placeholder="Task details" />
  </label>

  <label>
    Progress
    <select bind:value={progress}>
      <option value="todo">Todo</option>
      <option value="in-progress">In Progress</option>
      <option value="done">Done</option>
    </select>
  </label>

  {#if error}
    <p class="error">{error}</p>
  {/if}

  <div class="actions">
    <button type="submit" disabled={loading}>
      {loading ? "Creating…" : "Create"}
    </button>

    <button type="button" class="cancel" on:click={() => goto("/dashboard")}>
      Cancel
    </button>
  </div>
</form>

<style>
  .title {
    font-size: 1.4rem;
    margin-bottom: 1rem;
  }

  .form {
    max-width: 420px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  label {
    display: flex;
    flex-direction: column;
    font-size: 0.9rem;
    gap: 0.3rem;
  }

  input,
  textarea,
  select {
    padding: 0.45rem;
    border-radius: 6px;
    border: 1px solid #ccc;
  }

  .actions {
    display: flex;
    gap: 0.5rem;
  }

  button {
    padding: 0.45rem 1rem;
    border-radius: 6px;
    border: none;
    cursor: pointer;
  }

  button[type="submit"] {
    background: #4f46e5;
    color: white;
  }

  .cancel {
    background: #e5e7eb;
  }

  .error {
    color: #dc2626;
    font-size: 0.85rem;
  }
</style>
