const param = val => {
	return map => {
		return map[val];
	};
};
const str = val => {
	return () => {
		return val;
	};
};

module.exports = format => {
	if (!format) return null;

	format = format.replace(/\{\*\}/g, '*').replace(/\*/g, '{*}').replace(/:(\w+)/g, '{$1}'); // normalize
	format = format.match(/(?:[^\{]+)|(?:{[^\}]+\})/g).map(item => {
		return item[0] !== '{' ? str(item) : param(item.substring(1, item.length-1));
	});

	return params => {
		return format.reduce((result, item) => {
			return result+item(params);
		}, '');
	};
};
