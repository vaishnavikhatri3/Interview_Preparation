import "clsx";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils2.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/root.js";
import "../../../chunks/state.svelte.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<div class="practice-page"><div class="page-description svelte-h2b9z2"><p class="svelte-h2b9z2">Browse practice questions by category and difficulty. Select a topic to review questions, then start a full interview session to test your knowledge.</p></div> `);
    {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="loading-state svelte-h2b9z2"><div class="spinner svelte-h2b9z2"></div> <p>Loading questions...</p></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  _page as default
};
