<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  let task = '';
  let description = '';
  let progress = 'todo';
  let loading = false;
  let error: string | null = null;

  let id: string;

  $: id = $page.params.id;

  onMount(async () => {
    const res = await fetch(`/task/${id}/edit`);
    const data = await res.json();

    task = data.task;
    description = data.description;
    progress = data.progress;
  });

  async function save() {
    loading = true;
    error = null;

    const res = await fetch(`/task/${id}/edit`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task, description, progress })
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      error = data?.message ?? 'Failed to update task';
      loading = false;
      return;
    }

    goto('/dashboard');
  }
</script>

<h1>✏️ Edit Task</h1>

<form class="form" on:submit|preventDefault={save}>
  <label>
    Task Title
    <input
      type="text"
      bind:value={task}
      required
      placeholder="Task name"
    />
  </label>
  <label>
    Description
    <textarea
      bind:value={description}
      rows="4"
      placeholder="Task details"
    />
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
    {loading ? 'Saving…' : 'Save'}
  </button>
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

  button[type='submit'] {
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