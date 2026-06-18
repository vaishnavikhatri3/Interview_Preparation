import { a as attr_class, s as store_get, b as ensure_array_like, c as attr, e as escape_html, u as unsubscribe_stores, d as slot, f as stringify } from "../../chunks/root.js";
import { p as page } from "../../chunks/stores.js";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils2.js";
import "@sveltejs/kit/internal/server";
import "../../chunks/state.svelte.js";
import { i as isSidebarOpen, u as user, a as isDarkMode, l as levelInfo, t as toast } from "../../chunks/stores2.js";
function Sidebar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let navItems = [
      { href: "/dashboard", label: "Dashboard", icon: "grid" },
      {
        href: "/interview/start",
        label: "Start Interview",
        icon: "play"
      },
      { href: "/interview/history", label: "History", icon: "clock" },
      { href: "/practice", label: "Practice", icon: "book" },
      { href: "/timer", label: "Focus Timer", icon: "timer" },
      { href: "/resume", label: "Resume", icon: "file" },
      { href: "/profile", label: "Profile", icon: "user" }
    ];
    function isActive(href) {
      return store_get($$store_subs ??= {}, "$page", page).url.pathname === href;
    }
    $$renderer2.push(`<nav${attr_class("sidebar svelte-129hoe0", void 0, {
      "open": store_get($$store_subs ??= {}, "$isSidebarOpen", isSidebarOpen)
    })}><div class="sidebar-header svelte-129hoe0"><div class="logo svelte-129hoe0"><span class="logo-icon svelte-129hoe0">AI</span> <span class="logo-text svelte-129hoe0">InterviewAce</span></div> <button class="close-btn svelte-129hoe0" aria-label="Close sidebar"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button></div> <div class="nav-items svelte-129hoe0"><!--[-->`);
    const each_array = ensure_array_like(navItems);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let item = each_array[$$index];
      $$renderer2.push(`<a${attr("href", item.href)}${attr_class("nav-item svelte-129hoe0", void 0, { "active": isActive(item.href) })}><span class="nav-icon svelte-129hoe0">`);
      if (item.icon === "grid") {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect></svg>`);
      } else if (item.icon === "play") {
        $$renderer2.push("<!--[1-->");
        $$renderer2.push(`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`);
      } else if (item.icon === "clock") {
        $$renderer2.push("<!--[2-->");
        $$renderer2.push(`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`);
      } else if (item.icon === "book") {
        $$renderer2.push("<!--[3-->");
        $$renderer2.push(`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>`);
      } else if (item.icon === "file") {
        $$renderer2.push("<!--[4-->");
        $$renderer2.push(`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>`);
      } else if (item.icon === "timer") {
        $$renderer2.push("<!--[5-->");
        $$renderer2.push(`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline><line x1="22" y1="3" x2="19" y2="6"></line><line x1="22" y1="3" x2="16" y2="3"></line></svg>`);
      } else if (item.icon === "user") {
        $$renderer2.push("<!--[6-->");
        $$renderer2.push(`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></span> <span class="nav-label">${escape_html(item.label)}</span></a>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="sidebar-footer svelte-129hoe0"><button class="logout-btn svelte-129hoe0"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg> <span>Logout</span></button></div></nav> `);
    if (store_get($$store_subs ??= {}, "$isSidebarOpen", isSidebarOpen)) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="overlay svelte-129hoe0" role="presentation"></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function Topbar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let initials;
    initials = store_get($$store_subs ??= {}, "$user", user)?.email ? store_get($$store_subs ??= {}, "$user", user).email.charAt(0).toUpperCase() : "U";
    $$renderer2.push(`<header class="topbar svelte-h6bux4"><div class="topbar-left svelte-h6bux4"><button class="hamburger svelte-h6bux4" aria-label="Toggle sidebar"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg></button> <div class="page-title svelte-h6bux4"><!--[-->`);
    slot($$renderer2, $$props, "title", {});
    $$renderer2.push(`<!--]--></div></div> <div class="topbar-right svelte-h6bux4"><button class="icon-btn svelte-h6bux4" title="Toggle dark mode">`);
    if (store_get($$store_subs ??= {}, "$isDarkMode", isDarkMode)) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`);
    }
    $$renderer2.push(`<!--]--></button> <div class="level-badge svelte-h6bux4"${attr("title", `Level ${stringify(store_get($$store_subs ??= {}, "$levelInfo", levelInfo).level)} - ${stringify(store_get($$store_subs ??= {}, "$levelInfo", levelInfo).title)}`)}><span class="level-num svelte-h6bux4">${escape_html(store_get($$store_subs ??= {}, "$levelInfo", levelInfo).level)}</span></div> <div class="user-badge svelte-h6bux4"${attr("title", store_get($$store_subs ??= {}, "$user", user)?.email || "User")}><span class="avatar svelte-h6bux4">${escape_html(initials)}</span> <span class="user-email svelte-h6bux4">${escape_html(store_get($$store_subs ??= {}, "$user", user)?.email?.split("@")[0] || "User")}</span></div></div></header>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function Toast($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    function icon(type) {
      switch (type) {
        case "success":
          return "✓";
        case "error":
          return "✕";
        case "warning":
          return "⚠";
        case "info":
          return "ℹ";
      }
    }
    $$renderer2.push(`<div class="toast-container svelte-1cpok13"><!--[-->`);
    const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$toast", toast));
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let t = each_array[$$index];
      $$renderer2.push(`<div${attr_class(`toast toast-${stringify(t.type)}`, "svelte-1cpok13")} role="alert"><span class="toast-icon svelte-1cpok13">${escape_html(icon(t.type))}</span> <span class="toast-message svelte-1cpok13">${escape_html(t.message)}</span> <button class="toast-close svelte-1cpok13" aria-label="Dismiss"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let isAuthPage, isDashboardPage, pageTitle;
    const authPages = ["/login", "/register"];
    function getPageTitle(path) {
      if (path === "/dashboard") return "Dashboard";
      if (path === "/interview/start") return "Start Interview";
      if (path === "/interview/session") return "Interview Session";
      if (path === "/interview/history") return "Interview History";
      if (path === "/interview/result") return "Interview Results";
      if (path === "/profile") return "Profile";
      if (path === "/resume") return "Resume";
      if (path === "/practice") return "Practice";
      if (path === "/timer") return "Focus Timer";
      return "InterviewAce AI";
    }
    isAuthPage = authPages.includes(store_get($$store_subs ??= {}, "$page", page).url.pathname);
    isDashboardPage = !isAuthPage;
    pageTitle = getPageTitle(store_get($$store_subs ??= {}, "$page", page).url.pathname);
    Toast($$renderer2);
    $$renderer2.push(`<!----> `);
    if (isDashboardPage) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="app-layout svelte-12qhfyh">`);
      Sidebar($$renderer2);
      $$renderer2.push(`<!----> <div class="main-area svelte-12qhfyh">`);
      Topbar($$renderer2, {
        $$slots: {
          title: ($$renderer3) => {
            $$renderer3.push(`<h1 slot="title">${escape_html(pageTitle)}</h1>`);
          }
        }
      });
      $$renderer2.push(`<!----> <main class="content svelte-12qhfyh"><!--[-->`);
      slot($$renderer2, $$props, "default", {});
      $$renderer2.push(`<!--]--></main></div></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<main class="auth-layout svelte-12qhfyh"><!--[-->`);
      slot($$renderer2, $$props, "default", {});
      $$renderer2.push(`<!--]--></main>`);
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _layout as default
};
