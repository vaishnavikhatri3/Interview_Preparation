import { a as attr_class, c as attr } from "../../../chunks/root.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils2.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/state.svelte.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let dragOver = false;
    $$renderer2.push(`<div class="resume-page"><div class="page-description svelte-1mijfb4"><p class="svelte-1mijfb4">Upload your resume to get AI-powered analysis, improvement suggestions, and tailored interview questions based on your experience.</p></div> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<div${attr_class("dropzone svelte-1mijfb4", void 0, { "drag-over": dragOver })} role="button" tabindex="0"><input id="file-input" type="file" accept=".pdf,.doc,.docx" class="hidden-input svelte-1mijfb4"/> `);
      {
        $$renderer2.push("<!--[-1-->");
        $$renderer2.push(`<div class="dropzone-content svelte-1mijfb4"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg> <p class="dropzone-title svelte-1mijfb4">Drag &amp; drop your resume here</p> <p class="dropzone-subtitle svelte-1mijfb4">or click to browse files</p> <p class="dropzone-formats svelte-1mijfb4">Supports PDF, DOC, DOCX (max 10MB)</p></div>`);
      }
      $$renderer2.push(`<!--]--></div> <button class="upload-btn svelte-1mijfb4"${attr("disabled", true, true)}>`);
      {
        $$renderer2.push("<!--[-1-->");
        $$renderer2.push(`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg> Upload Resume`);
      }
      $$renderer2.push(`<!--]--></button> <div class="info-cards svelte-1mijfb4"><div class="info-card svelte-1mijfb4"><div class="info-card-icon svelte-1mijfb4"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></div> <h3 class="svelte-1mijfb4">AI Analysis</h3> <p class="svelte-1mijfb4">Get instant feedback on your resume's strengths and areas for improvement.</p></div> <div class="info-card svelte-1mijfb4"><div class="info-card-icon svelte-1mijfb4"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg></div> <h3 class="svelte-1mijfb4">Tailored Questions</h3> <p class="svelte-1mijfb4">Receive interview questions customized to your skills and experience.</p></div> <div class="info-card svelte-1mijfb4"><div class="info-card-icon svelte-1mijfb4"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg></div> <h3 class="svelte-1mijfb4">ATS Optimization</h3> <p class="svelte-1mijfb4">Optimize your resume to pass Applicant Tracking Systems with higher scores.</p></div></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  _page as default
};
