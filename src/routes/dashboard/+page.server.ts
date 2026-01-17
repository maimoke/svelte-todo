import type { PageServerLoad } from '../$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({locals}) => {
  // redirect not signed in user to sign in page
    if (!locals.user) {
    throw redirect(302, "/login");
  }

  // try {
  //   const tasks = await db.select().from(taskTable);

  //   return { tasks };
  // } catch (err) {
  //   console.error('DB QUERY ERROR:', err);  
  //   throw err; // keep throwing so SvelteKit shows 500
  // }
};