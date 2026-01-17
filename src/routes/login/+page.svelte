<script>
  import { authClient } from "../../adapter/auth/auth-client";
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
