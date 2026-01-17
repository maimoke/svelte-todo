import { createAuthClient } from "better-auth/svelte"
export const authClient = createAuthClient({
    baseURL: import.meta.env.BETTER_AUTH_URL as string
})

const signIn = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
  });
};