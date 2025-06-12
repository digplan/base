(async () => {
  const API = Object.create(null);
  const APIDEF = (await import('./APIDEF.js')).default;

  Object.entries(APIDEF).forEach(([key]) => {
    API[key] = (vars, proxy) => API._exec(key, vars, proxy);
  });

  API._fetch = async (options, proxy) => {
    let r;
    if (!proxy) {
      if (options?.body && typeof options.body === 'object') options.body = JSON.stringify(options.body);
      r = await fetch(options.url, options);
    } else {
      options.body = JSON.stringify(options.body);
      const str = JSON.stringify(options).replace(/\\"/g, '"').replace(/}}/g,'}').replace(/body\":\"/g,'body\":');
      const b = str.slice(0, -2) + str.slice(-1);
      r = await fetch(proxy, { method: 'POST', headers: options.headers, body: b });
    }
    return { response: r, request: options, proxy, json: await r.json() };
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