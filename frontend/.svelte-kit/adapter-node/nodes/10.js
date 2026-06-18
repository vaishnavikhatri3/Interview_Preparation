

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/practice/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/10.1b75b07e.js","_app/immutable/chunks/index.970da750.js","_app/immutable/chunks/navigation.3f136a22.js","_app/immutable/chunks/singletons.a497e1b1.js","_app/immutable/chunks/auth.e9f4a933.js"];
export const stylesheets = ["_app/immutable/assets/10.37efe30a.css"];
export const fonts = [];
