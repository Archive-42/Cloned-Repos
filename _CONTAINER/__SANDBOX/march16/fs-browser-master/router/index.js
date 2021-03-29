const matcher = require('./matcher');
const formatter = require('./formatter');

const METHODS      = ['get', 'post', 'put', 'del'   , 'delete', 'head', 'options'];
const HTTP_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'DELETE', 'HEAD', 'OPTIONS'];

const noop = () => {};
const error = res => {
	return () => {
		res.statusCode = 404;
		res.end();
	};
};
const router = () => {
    const methods = {};
    const traps = {};

    HTTP_METHODS.forEach(method => {
		methods[method] = [];
	});

    class route {
        constructor(req, res, next) {
            const method = methods[req.method];
            const trap = traps[req.method];
            const index = req.url.indexOf('?');
            let url = index === -1 ? req.url : req.url.substr(0, index);
            let i = 0;

            next = next || error(res);
            if (!method) return next();

            const loop = err => {
                if (err) return next(err);
                while (i < method.length) {
                    const route = method[i];

                    i++;
                    req.params = route.pattern(url);
                    if (!req.params) continue;
                    if (route.rewrite) {
                        req.url = url = route.rewrite(req.params)+(index === -1 ? '' : req.url.substr(index));
                    }
                    route.fn(req, res, loop);
                    return;
                }
                if (!trap) return next();
                trap(req, res, next);
            };

            loop();
        }

        static all(pattern, rewrite, fn) {
            METHODS.forEach(method => {
                route[method](pattern, rewrite, fn);
            });
            return route;
        }
    }

    METHODS.forEach((method, i) => {
		route[method] = (pattern, rewrite, fn) => {
			if (Array.isArray(pattern)) {
				pattern.forEach(item => {
					route[method](item, rewrite, fn);
				});
				return;
			}

			if (!fn && !rewrite)                      return route[method](null, null, pattern);
			if (!fn && typeof rewrite === 'string')   return route[method](pattern, rewrite, route);
			if (!fn && typeof rewrite === 'function') return route[method](pattern, null, rewrite);
			if (!fn) return route;

			(route.onmount || noop)(pattern, rewrite, fn);

			if (!pattern) {
				traps[HTTP_METHODS[i]] = fn;
				return route;
			}

			methods[HTTP_METHODS[i]].push({
				pattern:matcher(pattern),
				rewrite:formatter(rewrite),
				fn:fn
			});
			return route;
		};
	});

    return route;
};

module.exports = router;