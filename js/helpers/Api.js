globalThis.Api ??= class Api {
  static async fetch(options, proxy) {
    const r = await fetch(proxy || options.url, proxy ? { method: 'POST', body: JSON.stringify(options) } : options);
    return { response: r, request: options, proxy, json: await r.json() };
  }
}
