const actions = {
  default: async ({ request }) => {
    const form = await request.formData();
    const email = form.get("email");
    const password = form.get("password");
    if (typeof email !== "string" || typeof password !== "string") {
      return { error: "Invalid login data" };
    }
    return { email, password };
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 9;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-9a797f9d.js')).default;
const server_id = "src/routes/login/+page.server.ts";
const imports = ["_app/immutable/nodes/9.73aa061d.js","_app/immutable/chunks/index.970da750.js","_app/immutable/chunks/navigation.3f136a22.js","_app/immutable/chunks/singletons.a497e1b1.js","_app/immutable/chunks/auth.e9f4a933.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=9-25d73eba.js.map
