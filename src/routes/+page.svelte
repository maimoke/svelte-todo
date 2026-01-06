<script>
  import { goto } from "$app/navigation";
  import { authClient } from "$lib/auth-client";
  import { onMount } from "svelte";

  onMount(async () => {
    const { data: session } = await authClient.getSession();
    if (session?.user) {
        goto('/dashboard')
    } else {
        goto('/login')
    }

  });
</script>
