import "dotenv/config"
import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { sveltekitCookies } from "better-auth/svelte-kit";
import { getRequestEvent } from "$app/server";

export const auth = betterAuth({
    database: new Pool({
        // connection options
         connectionString: process.env.DB_CONNECTION as string,
    }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
   plugins: [sveltekitCookies(getRequestEvent)],
});
