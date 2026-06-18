import { s as store_get, u as unsubscribe_stores } from "../../../../chunks/root.js";
import { o as onDestroy } from "../../../../chunks/index-server.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils2.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/state.svelte.js";
import { p as page } from "../../../../chunks/stores.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    store_get($$store_subs ??= {}, "$page", page).url.searchParams.get("id") || "";
    onDestroy(() => {
    });
    $$renderer2.push(`<div class="session-page">`);
    {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="loading-state svelte-17llpgj"><div class="spinner svelte-17llpgj"></div> <p>Preparing your interview...</p></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
