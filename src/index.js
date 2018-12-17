import createElement from "./config/createElement";
import render from "./config/render";
import mount from "./config/mount";
import diff from "./config/diff";

const createVirtualApp = count =>
  createElement("div", {
    attrs: {
      id: "app",
      dataCount: count
    },
    children: [
      "The current count is: ",
      count.toString(),
      ...Array.from({ length: count }, () =>
        createElement("div", {
          attrs: {},
          children: [
            createElement("img", {
              attrs: {
                src: "https://media.giphy.com/media/cuPm4p4pClZVC/giphy.gif"
              }
            }),
            count % 2 === 0 ? "Caption!" : ""
          ]
        })
      )
    ]
  });

// create the initial object representation of dom elements including root tag name, it's attributes and children;
let virtualApp = createVirtualApp(0);

// create the initial dom elements.
const $app = render(virtualApp);

// mount the initial dom elements.
let $rootEl = mount($app, document.getElementById("app"));

setInterval(() => {
	const n = Math.floor(Math.random() * 10);
	// create the new object representation of dom elements
	const updatedVirtualApp = createVirtualApp(n);
	// diff the two virtual representations and store the patches to be made
	const patch = diff(virtualApp, updatedVirtualApp);
	// Apply the patches.
	$rootEl = patch($rootEl);

	virtualApp = updatedVirtualApp;
}, 3000);
