import render from "./render";

// take in two arrays, return a 'zipped' array where it pushes an array with the
// i index of each array. Loops through the shortest array.
const zip = (arr1, arr2) => {
	const zipped = [];
	for (let i = 0; i < Math.min(arr1.length, arr2.length); i++) {
		zipped.push([arr1[i], arr2[i]]);
	}
	return zipped;
};

// Method to diff the attributes of the old virtual dom and the new virtual dom.
const diffAttrs = (oldAttrs, newAttrs) => {
	const patches = [];

	// setting newAttrs
	for (const [k, v] of Object.entries(newAttrs)) {
		patches.push($node => {
			$node.setAttribute(k, v);
			return $node;
		});
	}

	// removing attrs if they don't exist in the newattrs
	for (const k in oldAttrs) {
		if (!(k in newAttrs)) {
			patches.push($node => {
				$node.removeAttribute(k);
				return $node;
			});
		}
	}

	// once called with $node, loop through all patches and return the updated node.
	return $node => {
		for (const patch of patches) {
			patch($node);
		}
		return $node;
	};
};

// Method to diff the children of the old virtual dom and the new virtual dom.
const diffChildren = (oldVChildren, newVChildren) => {
	// loop through all children up to the oldchildren length. to check changes
	const childPatches = [];
	oldVChildren.forEach((oldVChild, i) => {
		childPatches.push(diff(oldVChild, newVChildren[i]));
	});

	// slice the newchildren array from the length of oldchildren since they are diffed in the previous method, then for each
	// additional child, create the functions that will append the child once ran through render (create real dom nodes)
	const additionalPatches = [];
	for (const additionalVChild of newVChildren.slice(oldVChildren.length)) {
		additionalPatches.push($node => {
			$node.appendChild(render(additionalVChild));
			return $node;
		});
	}

	// since childPatches methods are expecting the $child, not $parent, we will get the childnodes for the parent and use the zip
	// method to return the matching patch as per index.
	return $parent => {
		for (const [patch, $child] of zip(childPatches, $parent.childNodes)) {
			patch($child);
		}

		// for any remaining patches (zip func above ensures only new nodes are passed here) apply the patch
		for (const patch of additionalPatches) {
			patch($parent);
		}
		return $parent;
	};
};

const diff = (oldVTree, newVTree) => {
	// let's assume oldVTree is not undefined!
	if (newVTree === undefined) {
		return $node => {
			$node.remove();
			// the patch should return the new root node. since there is none in this case,
			// we will just return undefined.
			return undefined;
		};
	}

	if (typeof oldVTree === "string" || typeof newVTree === "string") {
		if (oldVTree !== newVTree) {
			// could be 2 cases:
			// 1. both trees are string and they have different values
			// 2. one of the trees is text node and the other one is elem node
			// Either case, we will just render(newVTree)!
			return $node => {
				const $newNode = render(newVTree);
				$node.replaceWith($newNode);
				return $newNode;
			};
		}
		// this means that both trees are string and they have the same values
		else {
			return $node => $node;
		}
	}

	// we assume that they are totally different and will not attempt to find the differences.
	// simply render the newVTree and mount it.
	if (oldVTree.tagName !== newVTree.tagName) {
		return $node => {
			const $newNode = render(newVTree);
			$node.replaceWith($newNode);
			return $newNode;
		};
	}

	const patchAttrs = diffAttrs(oldVTree.attrs, newVTree.attrs);
	const patchChildren = diffChildren(oldVTree.children, newVTree.children);

	return $node => {
		patchAttrs($node);
		patchChildren($node);
		return $node;
	};
};

export default diff;
