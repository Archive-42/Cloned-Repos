const decode = str => {
	try {
		return decodeURIComponent(str);
	} catch(err) {
		return str;
	}
};

module.exports = pattern => {
	if (typeof pattern !== 'string') { // regex
		return url => {
			return url.match(pattern);
		};
	}

	const keys = [];
	
	pattern = pattern.replace(/:(\w+)/g, '{$1}').replace('{*}', '*'); // normalize
	pattern = pattern.replace(/(\/)?(\.)?\{([^}]+)\}(?:\(([^)]*)\))?(\?)?/g, (match, slash, dot, key, capture, opt, offset) => {
		const incl = (pattern[match.length+offset] || '/') === '/';

		keys.push(key);
		
		return (incl ? '(?:' : '')+(slash || '')+(incl ? '' : '(?:')+(dot || '')+'('+(capture || '[^/]+')+'))'+(opt || '');
	});
	pattern = pattern.replace(/([\/.])/g, '\\$1').replace(/\*/g, '(.+)');
	pattern = new RegExp('^'+pattern+'[\\/]?$', 'i');

	return str => {
		const match = str.match(pattern);

		if (!match) {
			return match;
		}

		const map = {};
		
		match.slice(1).forEach((param, i) => {
			const k = keys[i] = keys[i] || 'wildcard';

			param = param && decode(param);
			map[k] = map[k] ? [].concat(map[k]).concat(param) : param;
		});
		
		if (map.wildcard) {
			map['*'] = map.wildcard;
		}
		
		return map;
	};	
};