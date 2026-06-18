

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/interview/result/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.f30bbdbc.js","_app/immutable/chunks/index.970da750.js","_app/immutable/chunks/navigation.3f136a22.js","_app/immutable/chunks/singletons.a497e1b1.js","_app/immutable/chunks/stores.6edb1b11.js","_app/immutable/chunks/auth.e9f4a933.js"];
export const stylesheets = ["_app/immutable/assets/5.ff1e015f.css"];
export const fonts = [];
