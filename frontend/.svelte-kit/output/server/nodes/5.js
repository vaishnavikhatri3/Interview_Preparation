

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/interview/result/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.0f341479.js","_app/immutable/chunks/index.970da750.js","_app/immutable/chunks/navigation.6d757e07.js","_app/immutable/chunks/singletons.d8c5f87b.js","_app/immutable/chunks/stores.5bfbc33e.js","_app/immutable/chunks/auth.e9f4a933.js"];
export const stylesheets = ["_app/immutable/assets/5.ff1e015f.css"];
export const fonts = [];
