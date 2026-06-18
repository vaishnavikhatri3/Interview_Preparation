import "clsx";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils2.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/root.js";
import "../../../chunks/state.svelte.js";
import "../../../chunks/stores2.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<div class="profile-page"><div class="page-description svelte-maq4gq"><p class="svelte-maq4gq">Manage your personal information and account settings.</p></div> `);
    {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="loading-state svelte-maq4gq"><div class="spinner svelte-maq4gq"></div> <p>Loading profile...</p></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  _page as default
};
