import { c as create_ssr_component, d as add_attribute } from './index2-b5666d43.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let email = "";
  let password = "";
  let confirmPassword = "";
  return `<section><h1>Register</h1>
  <form><label>Email
      <input type="email" required${add_attribute("value", email, 0)}></label>

    <label>Password
      <input type="password" required minlength="8"${add_attribute("value", password, 0)}></label>

    <label>Confirm password
      <input type="password" required minlength="8"${add_attribute("value", confirmPassword, 0)}></label>

    <button type="submit">Register</button>
    ${``}</form>
  <p>Already have an account? <a href="/login">Login</a></p></section>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-fab04c58.js.map
