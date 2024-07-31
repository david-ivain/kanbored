/**
 * @template T
 */
export class ElResponse {
	status = () => {
		return this._status;
	};
	content = () => {
		return this._content;
	};

	/**
	 * @param {"200" | "400" | "404" | "409"} status
	 * @param {T} content
	 */
	constructor(status, content) {
		/** @private */
		this._status = status;
		/** @private */
		this._content = content;
	}
	/**
	 * @template T
	 * @param {T} content
	 * @returns {ElResponse<T>}
	 */
	static OK(content) {
		return new ElResponse("200", content);
	}
	/**
	 * @template T
	 * @param {T} content
	 * @returns {ElResponse<T>}
	 */
	static NotFound(content) {
		return new ElResponse("404", content);
	}
	/**
	 * @template T
	 * @param {T} content
	 * @returns {ElResponse<T>}
	 */
	static Conflict(content) {
		return new ElResponse("409", content);
	}
	/**
	 * @template T
	 * @param {T} content
	 * @returns {ElResponse<T>}
	 */
	static BadRequest(content) {
		return new ElResponse("400", content);
	}
}

/**
 * @template T
 */
export class ElRouter {
	constructor() {
		this._api = new ElRouterAPI();
	}

	get API() {
		return this._api;
	}

	/**
	 * @param {string} route
	 * @param {(params?: {[key: string]: any}) => Promise<ElResponse<T>>} callback
	 */
	get(route, callback) {
		this._registerEndpoint("get", route, callback);
	}
	/**
	 * @param {string} route
	 * @param {(params?: {[key: string]: any}) => Promise<ElResponse<T>>} callback
	 */
	post(route, callback) {
		this._registerEndpoint("post", route, callback);
	}
	/**
	 * @param {string} route
	 * @param {(params?: {[key: string]: any}) => Promise<ElResponse<T>>} callback
	 */
	put(route, callback) {
		this._registerEndpoint("put", route, callback);
	}
	/**
	 * @param {string} route
	 * @param {(params?: {[key: string]: any}) => Promise<ElResponse<T>>} callback
	 */
	delete(route, callback) {
		this._registerEndpoint("delete", route, callback);
	}

	/**
	 * @param {"get" | "post" | "put" | "delete"} method
	 * @param {string} route
	 * @param {(params?: {[key: string]: any}) => Promise<ElResponse<T>>} callback
	 */
	_registerEndpoint(method, route, callback) {
		this._api.addCallback(method, route, callback);
	}
}

export async function pageNotFound() {
	return ElResponse.NotFound("<h1>404: NOT FOUND</h1>");
}

export class ElRouterAPI {
	constructor() {
		/** @type {Record<string, (params?: {[key: string]: any}) => Promise<ElResponse>>} */
		this._routes = {};
	}

	/**
	 * @param {string} route
	 * @param {{[key: string]: any}=} params
	 */
	get = async (route, params) => {
		return await this._callbackHelper("get", route, params);
	};
	/**
	 * @param {string} route
	 * @param {{[key: string]: any}=} params
	 */
	post = async (route, params) => {
		return await this._callbackHelper("post", route, params);
	};
	/**
	 * @param {string} route
	 * @param {{[key: string]: any}=} params
	 */
	put = async (route, params) => {
		return await this._callbackHelper("put", route, params);
	};
	/**
	 * @param {string} route
	 * @param {{[key: string]: any}=} params
	 */
	delete = async (route, params) => {
		return await this._callbackHelper("delete", route, params);
	};

	/**
	 * @private
	 * @param {"get" | "post" | "put" | "delete"} method
	 * @param {string} route
	 * @param {{[key: string]: any}=} params
	 */
	async _callbackHelper(method, route, params) {
		let callback = this._routes[`${method}:${route}`];
		if (callback) return await callback(params);
		const routeArray = route.split("/");
		const param0 = routeArray.pop();
		routeArray.push("{}");

		callback = this._routes[`${method}:${routeArray.join("/")}`];
		if (callback) return await callback({ ...(params ?? {}), param0 });

		return await pageNotFound();
	}

	/**
	 * @param {"get" | "post" | "put" | "delete"} method
	 * @param {string} route
	 * @param {(params?: {[key: string]: any}) => Promise<ElResponse>} callback
	 */
	addCallback(method, route, callback) {
		this._routes[`${method}:${route}`] = callback;
	}
}
