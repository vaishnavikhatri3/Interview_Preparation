const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.svg"]),
	mimeTypes: {".svg":"image/svg+xml"},
	_: {
		client: {"start":"_app/immutable/entry/start.e98d8010.js","app":"_app/immutable/entry/app.60b4281f.js","imports":["_app/immutable/entry/start.e98d8010.js","_app/immutable/chunks/index.970da750.js","_app/immutable/chunks/singletons.a497e1b1.js","_app/immutable/entry/app.60b4281f.js","_app/immutable/chunks/index.970da750.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./chunks/0-8f8a3003.js')),
			__memo(() => import('./chunks/1-71afec80.js')),
			__memo(() => import('./chunks/2-a8577b36.js')),
			__memo(() => import('./chunks/3-9da59c37.js')),
			__memo(() => import('./chunks/4-c831c58a.js')),
			__memo(() => import('./chunks/5-235c7ed1.js')),
			__memo(() => import('./chunks/6-6ebe2674.js')),
			__memo(() => import('./chunks/7-a100c0a1.js')),
			__memo(() => import('./chunks/8-36537f6e.js')),
			__memo(() => import('./chunks/9-25d73eba.js')),
			__memo(() => import('./chunks/10-29729879.js')),
			__memo(() => import('./chunks/11-fd98bd16.js')),
			__memo(() => import('./chunks/12-8465b7fb.js')),
			__memo(() => import('./chunks/13-d77419e2.js')),
			__memo(() => import('./chunks/14-efc4c566.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/dashboard",
				pattern: /^\/dashboard\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/interview/history",
				pattern: /^\/interview\/history\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/interview/result",
				pattern: /^\/interview\/result\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/interview/session",
				pattern: /^\/interview\/session\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/interview/start",
				pattern: /^\/interview\/start\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/interview/[id]",
				pattern: /^\/interview\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/practice",
				pattern: /^\/practice\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/profile",
				pattern: /^\/profile\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/register",
				pattern: /^\/register\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/resume",
				pattern: /^\/resume\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/timer",
				pattern: /^\/timer\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 14 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();

const prerendered = new Set([]);

export { manifest, prerendered };
//# sourceMappingURL=manifest.js.map
