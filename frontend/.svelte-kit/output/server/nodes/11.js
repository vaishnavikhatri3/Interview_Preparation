

export const index = 11;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/profile/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/11.8588528b.js","_app/immutable/chunks/index.970da750.js","_app/immutable/chunks/navigation.6d757e07.js","_app/immutable/chunks/singletons.d8c5f87b.js","_app/immutable/chunks/auth.e9f4a933.js","_app/immutable/chunks/stores.08ff67f5.js"];
export const stylesheets = ["_app/immutable/assets/11.2078cbdf.css"];
export const fonts = [];
