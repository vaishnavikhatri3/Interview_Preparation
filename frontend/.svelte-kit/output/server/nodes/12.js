

export const index = 12;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/register/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/12.e6eaba68.js","_app/immutable/chunks/index.970da750.js","_app/immutable/chunks/navigation.6d757e07.js","_app/immutable/chunks/singletons.d8c5f87b.js","_app/immutable/chunks/auth.e9f4a933.js"];
export const stylesheets = [];
export const fonts = [];
