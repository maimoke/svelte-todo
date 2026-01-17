import "dotenv/config";
import { betterAuth } from "better-auth";
import { Pool } from "pg";

type CreateAuthOptions = {
  plugins?: any[];
};

export function createAuth(options?: CreateAuthOptions) {
  return betterAuth({
    database: new Pool({
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

    plugins: options?.plugins ?? [],
  });
}