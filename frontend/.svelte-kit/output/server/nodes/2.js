

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.e6199520.js","_app/immutable/chunks/index.970da750.js","_app/immutable/chunks/navigation.6d757e07.js","_app/immutable/chunks/singletons.d8c5f87b.js"];
export const stylesheets = [];
export const fonts = [];
