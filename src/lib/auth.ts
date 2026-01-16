import { createAuth } from "./auth.core";
import { sveltekitCookies } from "better-auth/svelte-kit";
import { getRequestEvent } from "$app/server";

export const auth = createAuth({
  plugins: [sveltekitCookies(getRequestEvent)],
});