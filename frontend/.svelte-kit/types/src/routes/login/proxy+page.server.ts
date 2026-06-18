// @ts-nocheck
import type { Actions } from './$types';

export const actions = {
  default: async ({ request }: import('./$types').RequestEvent) => {
    const form = await request.formData();
    const email = form.get('email');
    const password = form.get('password');

    if (typeof email !== 'string' || typeof password !== 'string') {
      return { error: 'Invalid login data' };
    }

    return { email, password };
  }
};
;null as any as Actions;