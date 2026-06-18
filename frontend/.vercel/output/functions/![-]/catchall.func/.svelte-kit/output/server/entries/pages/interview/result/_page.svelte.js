import "clsx";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils2.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/root.js";
import "../../../../chunks/state.svelte.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<div class="result-page">`);
    {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="loading-state svelte-1qmt4wi"><div class="spinner svelte-1qmt4wi"></div> <p>Loading your results...</p></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  _page as default
};
