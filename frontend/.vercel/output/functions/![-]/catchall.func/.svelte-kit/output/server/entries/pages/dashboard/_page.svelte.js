import { s as store_get, u as unsubscribe_stores } from "../../../chunks/root.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils2.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
import { l as levelInfo } from "../../../chunks/stores2.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    store_get($$store_subs ??= {}, "$levelInfo", levelInfo);
    {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="loading-state svelte-x1i5gj"><div class="spinner svelte-x1i5gj"></div> <p>Loading dashboard...</p></div>`);
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
