(async () => {
  const API = Object.create(null);
  const APIDEF = (await import('./APIDEF.js')).default;

  Object.entries(APIDEF).forEach(([key]) => {
    API[key] = (vars, proxy) => API._exec(key, vars, proxy);
  });

  API._fetch = async (options, proxy) => {
    let r, proxied_request;
    if (!proxy) {
      if (options?.body && typeof options.body === 'object') options.body = JSON.stringify(options.body);
      r = await fetch(options.url, options);
    } else {
      proxied_request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: options.url,
          method: options.method,
          headers: options.headers,
          body: options.body // assumed to be already a string or JSON-safe
        })
      };
      r = await fetch(proxy, proxied_request);
    }
    return { response: r, request: options, proxied_request, proxy, json: await r.json() };
  };

  API._exec = (name, vars, proxy) => {
    if(!vars && API._getDef(name).params) return { provide_params: API._getDef(name).params };
    return API._fetch(API._parse(APIDEF[name], vars), proxy);
  }

  API._getDef = (name) => {
    return { command: APIDEF[name], params: APIDEF[name].match(/\$(\w+)/g) };
  }

  API._parse = (command, vars) => {
    try {
      command = command.replace(/\$(\w+)/g, (_, v) => v in vars ? (typeof vars[v] === 'object' ? JSON.stringify(vars[v]) : vars[v]) : `$${v}`);
      const [method, url, headers, body] = command.split('\n');
      return {
        method,
        url,
        headers: headers ? Object.fromEntries(headers.split(',').map(h => h.split(':').map(s => s.trim()))) : undefined,
        body
      };
    } catch (e) {
      console.error('Parse error:', command, vars);
      throw e;
    }
  }
  window.API = API;
})();