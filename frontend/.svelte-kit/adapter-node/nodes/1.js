

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.7f7840c2.js","_app/immutable/chunks/index.970da750.js","_app/immutable/chunks/stores.6edb1b11.js","_app/immutable/chunks/singletons.a497e1b1.js"];
export const stylesheets = [];
export const fonts = [];
