<script lang="ts">
  import { goto } from "$app/navigation";
  import { authClient } from "$lib/auth-client.js";
  import { onMount } from "svelte";

  export let data;
  const { tasks } = data;
  let user = "";

  function createTask() {
    goto("/task/create");
  }

  function editTask(id: string) {
    goto(`/task/${id}/edit`);
  }

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          goto("/");
        },
      },
    });
  };

  onMount(async () => {
    const { data: session } = await authClient.getSession();
    if (session?.user) {
      user = session.user.name;
    } else {
      goto("/login");
    }
  });

  async function deleteTask(id: string) {
    if (!confirm("Delete this task?")) return;

    const res = await fetch(`/task/${id}/delete`, {
      method: "DELETE",
    });

    if (res.ok) {
      location.reload();
    } else {
      alert("Failed to delete task");
    }
  }

  function progressClass(progress: string) {
    switch (progress) {
      case "todo":
        return "badge todo";
      case "in-progress":
        return "badge in-progress";
      case "done":
        return "badge done";
      default:
        return "badge";
    }
  }
</script>

<div class="actions">
  <button class="logout" on:click={handleLogout}> Sign Out </button>
</div>

<h1 class="title">Hello {user}</h1>

<h1 class="title">📋 Task Dashboard</h1>

<button class="create-btn" on:click={createTask}> Create Task </button>

{#if tasks.length === 0}
  <p>No tasks found.</p>
{:else}
  <div class="task-grid">
    {#each tasks as task}
      <div class="task-card">
        <h3>{task.task}</h3>
        <p class="desc">{task.description}</p>

        <div class="meta">
          <span class={progressClass(task.progress)}>
            {task.progress}
          </span>
          <span class="author">👤 {task.createBy}</span>
        </div>

        <div class="actions">
          <button class="edit" on:click={() => editTask(task.id)}>
            ✏️ Edit
          </button>
          <button class="delete" on:click={() => deleteTask(task.id)}>
            🗑 Delete
          </button>
        </div>
      </div>
    {/each}
  </div>
{/if}

<style>
  .title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .task-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1rem;
  }

  .task-card {
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid #ddd;
    background: white;
  }

  .desc {
    margin: 0.5rem 0;
    color: #555;
  }

  .meta {
    display: flex;
    justify-content: space-between;
    margin-top: 0.5rem;
    font-size: 0.85rem;
  }

  .badge {
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    font-weight: 500;
    text-transform: capitalize;
  }

  .badge.todo {
    background: #e0e7ff;
    color: #3730a3;
  }

  .badge.in-progress {
    background: #fef3c7;
    color: #92400e;
  }

  .badge.done {
    background: #dcfce7;
    color: #166534;
  }

  .author {
    color: #666;
  }

  .create-btn {
    margin-bottom: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    background: #4f46e5;
    color: white;
    border: none;
    cursor: pointer;
  }

  .create-btn:hover {
    background: #4338ca;
  }

  .actions {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.75rem;
  }

  .actions button {
    padding: 0.3rem 0.6rem;
    font-size: 0.85rem;
    border-radius: 4px;
    border: none;
    cursor: pointer;
  }

  .actions .edit {
    background: #fbbf24;
    color: #78350f;
  }

  .actions .logout {
    background: #ef4444;
    color: white;
  }
</style>
