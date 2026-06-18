

export const index = 11;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/profile/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/11.84641fa6.js","_app/immutable/chunks/index.970da750.js","_app/immutable/chunks/navigation.3f136a22.js","_app/immutable/chunks/singletons.a497e1b1.js","_app/immutable/chunks/auth.e9f4a933.js","_app/immutable/chunks/stores.f29c8a35.js"];
export const stylesheets = ["_app/immutable/assets/11.2078cbdf.css"];
export const fonts = [];
