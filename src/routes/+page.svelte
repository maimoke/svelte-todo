<script>
  import { goto } from "$app/navigation";
  import { authClient } from "../adapter/auth/auth-client";

  $effect(async () => {
    const { data: session } = await authClient.getSession();
    if (session?.user) {
        goto('/dashboard')
    } else {
        goto('/login')
    }

  });
</script>
