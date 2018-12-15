// Translate our virtual dom elements to real DOM elements.
const render = vNode => {
  if (typeof vNode === "string") {
    return document.createTextNode(vNode);
  }

  return renderElem(vNode);
};

const renderElem = ({ tagName, attrs, children }) => {
  // create the element
  const $el = document.createElement(tagName);
  // add all attribute as specified
  for (const [k, v] of Object.entries(attrs)) {
    $el.setAttribute(k, v);
  }

  // append all children
  for (const child of children) {
    $el.appendChild(render(child));
  }

  return $el;
};

export default render;
