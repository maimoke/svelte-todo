import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { usersTable } from '$lib/server/schema';

export const load: PageServerLoad = async () => {
  try {
    const tasks = await db.select().from(usersTable);

    return { tasks };
  } catch (err) {
    console.error('DB QUERY ERROR:', err);
    throw err; // keep throwing so SvelteKit shows 500
  }
};