import { c as attr } from "../../../chunks/root.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils2.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let email = "";
    let password = "";
    $$renderer2.push(`<section><h1>Login</h1> <form><label>Email <input type="email"${attr("value", email)} required=""/></label> <label>Password <input type="password"${attr("value", password)} required="" minlength="8"/></label> <button type="submit">Login</button> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></form> <p>Don't have an account? <a href="/register">Register</a></p></section>`);
  });
}
export {
  _page as default
};
