import type { Actions } from './$types';

export const actions: Actions = {
  default: async ({ request }) => {
    const form = await request.formData();
    const email = form.get('email');
    const password = form.get('password');

    if (typeof email !== 'string' || typeof password !== 'string') {
      return { error: 'Invalid login data' };
    }

    return { email, password };
  }
};
