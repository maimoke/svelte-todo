<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  let id = $derived($page.params.id);

  let task = $state("");
  let description = $state("");
  let progress = $state<"todo" | "in-progress" | "done">("todo");

  let loading = $state(false);
  let error = $state<string | null>(null);

  onMount(async () => {
    const res = await fetch(`/task/${id}/edit`);
    if (!res.ok) return;

    const data = await res.json();
    task = data.task;
    description = data.description;
    progress = data.progress;
  });

  async function save() {
    loading = true;
    error = null;

    const res = await fetch(`/task/${id}/edit`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task, description, progress })
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      error = data?.message ?? "Failed to update task";
      loading = false;
      return;
    }

    goto("/dashboard");
  }
</script>

<h1>✏️ Edit Task</h1>

<form class="form" on:submit|preventDefault={save}>
  <label>
    Task Title
    <input type="text" bind:value={task} required />
  </label>

  <label>
    Description
    <textarea rows="4" bind:value={description} />
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

  <button disabled={loading}>
    {loading ? "Saving…" : "Save"}
  </button>
</form>

<style>

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

  button {
    padding: 0.45rem 1rem;
    border-radius: 6px;
    border: none;
    cursor: pointer;
  }
  .error {
    color: #dc2626;
    font-size: 0.85rem;
  }
</style>