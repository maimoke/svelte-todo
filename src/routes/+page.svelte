<script lang="ts">
  export let data;
  const { tasks } = data;
</script>

<h1 class="title">📋 Task Dashboard</h1>

{#if tasks.length === 0}
  <p>No tasks found.</p>
{:else}
  <div class="task-grid">
    {#each tasks as task}
      <div class="task-card">
        <h3>{task.task}</h3>
        <p class="desc">{task.description}</p>

        <div class="meta">
          <span class="badge">{task.progress}</span>
          <span class="author">👤 {task.createBy}</span>
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
    background: #e0e7ff;
    border-radius: 4px;
    color: #3730a3;
  }

  .author {
    color: #666;
  }
</style>