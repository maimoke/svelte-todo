import { auth as coreAuth } from "./auth.core";
import { sveltekitCookies } from "better-auth/svelte-kit";
import { getRequestEvent } from "$app/server";

export const auth = coreAuth.extend({
  plugins: [sveltekitCookies(getRequestEvent)],
});