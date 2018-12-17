// allow for creating elements without any options with default params.
export default (tagName, { attrs = {}, children = [] } = {}) => {
	// Create an object that doesn't inherit from Obj with no proto props.
	const vElem = Object.create(null);

	Object.assign(vElem, {
		tagName,
		attrs,
		children
	});

	return vElem;
};
