import { c as create_ssr_component, d as add_attribute } from './index2-b5666d43.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let email = "";
  let password = "";
  return `<section><h1>Login</h1>
  <form><label>Email
      <input type="email" required${add_attribute("value", email, 0)}></label>

    <label>Password
      <input type="password" required minlength="8"${add_attribute("value", password, 0)}></label>

    <button type="submit">Login</button>
    ${``}</form>
  <p>Don&#39;t have an account? <a href="/register">Register</a></p></section>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-9a797f9d.js.map
