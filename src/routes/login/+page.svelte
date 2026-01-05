<script>
  import { authClient } from "$lib/auth-client";
</script>

<button
  on:click={async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  }}
>
  Continue with Google
</button>
