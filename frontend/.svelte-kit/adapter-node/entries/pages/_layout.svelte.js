import { c as create_ssr_component, a as subscribe, e as each, b as add_attribute, d as escape, v as validate_component } from "../../chunks/index2.js";
import { p as page } from "../../chunks/stores.js";
import { i as isSidebarOpen, u as user, a as isDarkMode, l as levelInfo, t as toast } from "../../chunks/stores2.js";
const Sidebar_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: ".sidebar.svelte-1n5vsub{position:fixed;top:0;left:0;height:100vh;width:260px;background:linear-gradient(180deg, #0f172a 0%, #1e293b 100%);color:#e2e8f0;display:flex;flex-direction:column;z-index:1000;transform:translateX(0);transition:transform 0.3s ease}.sidebar-header.svelte-1n5vsub{display:flex;align-items:center;justify-content:space-between;padding:1.5rem 1.25rem;border-bottom:1px solid rgba(255,255,255,0.08)}.logo.svelte-1n5vsub{display:flex;align-items:center;gap:0.75rem}.logo-icon.svelte-1n5vsub{width:36px;height:36px;background:linear-gradient(135deg, #6366f1, #2563eb);border-radius:10px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.85rem;color:#fff}.logo-text.svelte-1n5vsub{font-size:1.15rem;font-weight:700;color:#fff;letter-spacing:-0.02em}.close-btn.svelte-1n5vsub{display:none;background:none;border:none;color:#94a3b8;cursor:pointer;padding:0.25rem}.nav-items.svelte-1n5vsub{flex:1;padding:1rem 0.75rem;display:flex;flex-direction:column;gap:0.25rem;overflow-y:auto}.nav-item.svelte-1n5vsub{display:flex;align-items:center;gap:0.85rem;padding:0.75rem 1rem;border-radius:10px;color:#94a3b8;text-decoration:none;font-size:0.925rem;font-weight:500;transition:all 0.2s ease}.nav-item.svelte-1n5vsub:hover{background:rgba(255,255,255,0.06);color:#e2e8f0}.nav-item.active.svelte-1n5vsub{background:rgba(99,102,241,0.15);color:#818cf8}.nav-icon.svelte-1n5vsub{display:flex;align-items:center;flex-shrink:0}.sidebar-footer.svelte-1n5vsub{padding:1rem 0.75rem;border-top:1px solid rgba(255,255,255,0.08)}.logout-btn.svelte-1n5vsub{display:flex;align-items:center;gap:0.85rem;width:100%;padding:0.75rem 1rem;border:none;border-radius:10px;background:transparent;color:#94a3b8;font-size:0.925rem;font-weight:500;cursor:pointer;transition:all 0.2s ease;font-family:inherit}.logout-btn.svelte-1n5vsub:hover{background:rgba(239,68,68,0.1);color:#f87171}.overlay.svelte-1n5vsub{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.4);z-index:999}@media(max-width: 768px){.sidebar.svelte-1n5vsub{transform:translateX(-100%)}.sidebar.open.svelte-1n5vsub{transform:translateX(0)}.close-btn.svelte-1n5vsub{display:block}.overlay.svelte-1n5vsub{display:block}}",
  map: null
};
const Sidebar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  let $isSidebarOpen, $$unsubscribe_isSidebarOpen;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_isSidebarOpen = subscribe(isSidebarOpen, (value) => $isSidebarOpen = value);
  let navItems = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: "grid"
    },
    {
      href: "/interview/start",
      label: "Start Interview",
      icon: "play"
    },
    {
      href: "/interview/history",
      label: "History",
      icon: "clock"
    },
    {
      href: "/practice",
      label: "Practice",
      icon: "book"
    },
    {
      href: "/timer",
      label: "Focus Timer",
      icon: "timer"
    },
    {
      href: "/resume",
      label: "Resume",
      icon: "file"
    },
    {
      href: "/profile",
      label: "Profile",
      icon: "user"
    }
  ];
  function isActive(href) {
    return $page.url.pathname === href;
  }
  $$result.css.add(css$3);
  $$unsubscribe_page();
  $$unsubscribe_isSidebarOpen();
  return `<nav class="${["sidebar svelte-1n5vsub", $isSidebarOpen ? "open" : ""].join(" ").trim()}"><div class="sidebar-header svelte-1n5vsub"><div class="logo svelte-1n5vsub"><span class="logo-icon svelte-1n5vsub">AI</span>
      <span class="logo-text svelte-1n5vsub">InterviewAce</span></div>
    <button class="close-btn svelte-1n5vsub" aria-label="Close sidebar"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button></div>

  <div class="nav-items svelte-1n5vsub">${each(navItems, (item) => {
    return `<a${add_attribute("href", item.href, 0)} class="${["nav-item svelte-1n5vsub", isActive(item.href) ? "active" : ""].join(" ").trim()}"><span class="nav-icon svelte-1n5vsub">${item.icon === "grid" ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect></svg>` : `${item.icon === "play" ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>` : `${item.icon === "clock" ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>` : `${item.icon === "book" ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>` : `${item.icon === "file" ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>` : `${item.icon === "timer" ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline><line x1="22" y1="3" x2="19" y2="6"></line><line x1="22" y1="3" x2="16" y2="3"></line></svg>` : `${item.icon === "user" ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>` : ``}`}`}`}`}`}`}</span>
        <span class="nav-label">${escape(item.label)}</span>
      </a>`;
  })}</div>

  <div class="sidebar-footer svelte-1n5vsub"><button class="logout-btn svelte-1n5vsub"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
      <span>Logout</span></button></div></nav>


${$isSidebarOpen ? `
  <div class="overlay svelte-1n5vsub" role="presentation"></div>` : ``}`;
});
const Topbar_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: ".topbar.svelte-abyblv{position:sticky;top:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:0 2rem;height:68px;background:rgba(255,255,255,0.8);backdrop-filter:blur(12px);border-bottom:1px solid #e2e8f0}.topbar-left.svelte-abyblv{display:flex;align-items:center;gap:1rem}.hamburger.svelte-abyblv{display:none;background:none;border:none;color:#475569;cursor:pointer;padding:0.25rem;border-radius:6px}.hamburger.svelte-abyblv:hover{background:#f1f5f9}.page-title.svelte-abyblv h1{margin:0;font-size:1.35rem;font-weight:700;color:#0f172a;letter-spacing:-0.02em}.topbar-right.svelte-abyblv{display:flex;align-items:center;gap:0.75rem}.icon-btn.svelte-abyblv{width:36px;height:36px;border:none;border-radius:8px;background:transparent;color:#64748b;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.2s}.icon-btn.svelte-abyblv:hover{background:#f1f5f9;color:#6366f1}.level-badge.svelte-abyblv{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg, #6366f1, #2563eb);display:flex;align-items:center;justify-content:center;cursor:default}.level-num.svelte-abyblv{color:#fff;font-size:0.75rem;font-weight:800}.user-badge.svelte-abyblv{display:flex;align-items:center;gap:0.65rem;padding:0.4rem 0.75rem 0.4rem 0.4rem;background:#f1f5f9;border-radius:30px;cursor:default}.avatar.svelte-abyblv{width:32px;height:32px;background:linear-gradient(135deg, #6366f1, #2563eb);border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:600;font-size:0.85rem}.user-email.svelte-abyblv{font-size:0.875rem;color:#475569;font-weight:500}@media(max-width: 768px){.topbar.svelte-abyblv{padding:0 1rem}.hamburger.svelte-abyblv{display:block}.user-email.svelte-abyblv{display:none}}",
  map: null
};
const Topbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let initials;
  let $user, $$unsubscribe_user;
  let $isDarkMode, $$unsubscribe_isDarkMode;
  let $levelInfo, $$unsubscribe_levelInfo;
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  $$unsubscribe_isDarkMode = subscribe(isDarkMode, (value) => $isDarkMode = value);
  $$unsubscribe_levelInfo = subscribe(levelInfo, (value) => $levelInfo = value);
  $$result.css.add(css$2);
  initials = $user?.email ? $user.email.charAt(0).toUpperCase() : "U";
  $$unsubscribe_user();
  $$unsubscribe_isDarkMode();
  $$unsubscribe_levelInfo();
  return `<header class="topbar svelte-abyblv"><div class="topbar-left svelte-abyblv"><button class="hamburger svelte-abyblv" aria-label="Toggle sidebar"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg></button>
    <div class="page-title svelte-abyblv">${slots.title ? slots.title({}) : ``}</div></div>

  <div class="topbar-right svelte-abyblv">
    <button class="icon-btn svelte-abyblv" title="Toggle dark mode">${$isDarkMode ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>` : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`}</button>

    
    <div class="level-badge svelte-abyblv" title="${"Level " + escape($levelInfo.level, true) + " - " + escape($levelInfo.title, true)}"><span class="level-num svelte-abyblv">${escape($levelInfo.level)}</span></div>

    
    <div class="user-badge svelte-abyblv"${add_attribute("title", $user?.email || "User", 0)}><span class="avatar svelte-abyblv">${escape(initials)}</span>
      <span class="user-email svelte-abyblv">${escape($user?.email?.split("@")[0] || "User")}</span></div></div>
</header>`;
});
const Toast_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".toast-container.svelte-1qumyke{position:fixed;top:1rem;right:1rem;z-index:9999;display:flex;flex-direction:column;gap:0.5rem;max-width:400px;pointer-events:none}.toast.svelte-1qumyke{display:flex;align-items:center;gap:0.65rem;padding:0.85rem 1rem;border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,0.12);animation:svelte-1qumyke-slideIn 0.3s ease;pointer-events:auto;font-size:0.9rem;color:#fff}@keyframes svelte-1qumyke-slideIn{from{opacity:0;transform:translateX(100%)}to{opacity:1;transform:translateX(0)}}.toast-success.svelte-1qumyke{background:#059669}.toast-error.svelte-1qumyke{background:#dc2626}.toast-warning.svelte-1qumyke{background:#d97706}.toast-info.svelte-1qumyke{background:#2563eb}.toast-icon.svelte-1qumyke{font-size:1.1rem;font-weight:700;flex-shrink:0}.toast-message.svelte-1qumyke{flex:1;line-height:1.4}.toast-close.svelte-1qumyke{background:none;border:none;color:rgba(255,255,255,0.7);cursor:pointer;padding:0.15rem;flex-shrink:0;border-radius:4px}.toast-close.svelte-1qumyke:hover{color:#fff;background:rgba(255,255,255,0.1)}",
  map: null
};
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
const Toast = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $toast, $$unsubscribe_toast;
  $$unsubscribe_toast = subscribe(toast, (value) => $toast = value);
  $$result.css.add(css$1);
  $$unsubscribe_toast();
  return `<div class="toast-container svelte-1qumyke">${each($toast, (t) => {
    return `<div class="${"toast toast-" + escape(t.type, true) + " svelte-1qumyke"}" role="alert"><span class="toast-icon svelte-1qumyke">${escape(icon(t.type))}</span>
      <span class="toast-message svelte-1qumyke">${escape(t.message)}</span>
      <button class="toast-close svelte-1qumyke" aria-label="Dismiss"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
    </div>`;
  })}
</div>`;
});
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: ':root{--bg-primary:#f8fafc;--bg-secondary:#ffffff;--bg-card:#ffffff;--text-primary:#111827;--text-secondary:#475569;--text-muted:#64748b;--border-color:#e2e8f0;--border-light:#f1f5f9;--sidebar-bg:linear-gradient(180deg, #0f172a 0%, #1e293b 100%)}:root.dark{--bg-primary:#0f172a;--bg-secondary:#1e293b;--bg-card:#1e293b;--text-primary:#f1f5f9;--text-secondary:#94a3b8;--text-muted:#64748b;--border-color:#334155;--border-light:#1e293b}body{margin:0;min-height:100vh;font-family:Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;background:var(--bg-primary);color:var(--text-primary);transition:background 0.3s, color 0.3s}.app-layout.svelte-a8dhyg{display:flex;min-height:100vh}.main-area.svelte-a8dhyg{flex:1;margin-left:260px;display:flex;flex-direction:column;min-height:100vh}.content.svelte-a8dhyg{flex:1;padding:2rem;max-width:1200px;width:100%;box-sizing:border-box}.auth-layout.svelte-a8dhyg{display:flex;align-items:center;justify-content:center;min-height:100vh;padding:1.5rem;background:linear-gradient(180deg, #eef2ff 0%, #f8fafc 100%)}.auth-layout.svelte-a8dhyg section{width:min(100%, 420px);background:#ffffff;border-radius:24px;box-shadow:0 24px 80px rgba(15, 23, 42, 0.08);padding:2rem;border:1px solid rgba(148, 163, 184, 0.15)}.auth-layout.svelte-a8dhyg h1{margin:0 0 1.5rem;font-size:clamp(1.75rem, 2.4vw, 2.5rem);letter-spacing:-0.03em;color:#0f172a}.auth-layout.svelte-a8dhyg form{display:grid;gap:1rem}.auth-layout.svelte-a8dhyg label{display:block;margin-bottom:0.25rem;font-size:0.95rem;color:#475569}.auth-layout.svelte-a8dhyg input{width:100%;padding:0.95rem 1rem;margin-top:0.5rem;border:1px solid #cbd5e1;border-radius:14px;background:#f8fafc;font-size:1rem;color:#0f172a;box-sizing:border-box}.auth-layout.svelte-a8dhyg button{width:100%;padding:1rem;margin-top:1rem;border:none;border-radius:14px;background:#2563eb;color:#fff;font-weight:700;cursor:pointer;transition:background-color 0.2s ease}.auth-layout.svelte-a8dhyg button:hover{background:#1d4ed8}.auth-layout.svelte-a8dhyg p.error{margin:0.85rem 0 0;color:#b91c1c;font-size:0.95rem}.auth-layout.svelte-a8dhyg p{margin:1.25rem 0 0;color:#475569}.auth-layout.svelte-a8dhyg a{color:#2563eb;text-decoration:none}.auth-layout.svelte-a8dhyg a:hover{text-decoration:underline}@media(max-width: 768px){.main-area.svelte-a8dhyg{margin-left:0}.content.svelte-a8dhyg{padding:1rem}}',
  map: null
};
function getPageTitle(path) {
  if (path === "/dashboard")
    return "Dashboard";
  if (path === "/interview/start")
    return "Start Interview";
  if (path === "/interview/session")
    return "Interview Session";
  if (path === "/interview/history")
    return "Interview History";
  if (path === "/interview/result")
    return "Interview Results";
  if (path === "/profile")
    return "Profile";
  if (path === "/resume")
    return "Resume";
  if (path === "/practice")
    return "Practice";
  if (path === "/timer")
    return "Focus Timer";
  return "InterviewAce AI";
}
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isAuthPage;
  let isDashboardPage;
  let pageTitle;
  let $$unsubscribe_isDarkMode;
  let $page, $$unsubscribe_page;
  $$unsubscribe_isDarkMode = subscribe(isDarkMode, (value) => value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  const authPages = ["/login", "/register"];
  $$result.css.add(css);
  isAuthPage = authPages.includes($page.url.pathname);
  isDashboardPage = !isAuthPage;
  pageTitle = getPageTitle($page.url.pathname);
  $$unsubscribe_isDarkMode();
  $$unsubscribe_page();
  return `${validate_component(Toast, "Toast").$$render($$result, {}, {}, {})}

${isDashboardPage ? `<div class="app-layout svelte-a8dhyg">${validate_component(Sidebar, "Sidebar").$$render($$result, {}, {}, {})}
    <div class="main-area svelte-a8dhyg">${validate_component(Topbar, "Topbar").$$render($$result, {}, {}, {
    title: () => {
      return `<h1 slot="title">${escape(pageTitle)}</h1>`;
    }
  })}
      <main class="content svelte-a8dhyg">${slots.default ? slots.default({}) : ``}</main></div></div>` : `<main class="auth-layout svelte-a8dhyg">${slots.default ? slots.default({}) : ``}</main>`}`;
});
export {
  Layout as default
};
