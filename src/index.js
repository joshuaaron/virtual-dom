import createElement from "./config/createElement";
import render from "./config/render";
import mount from "./config/mount";
import diff from "./config/diff";

const createVApp = count =>
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

let vApp = createVApp(0);
const $app = render(vApp);
let $rootEl = mount($app, document.getElementById("app"));

setInterval(() => {
  const n = Math.floor(Math.random() * 10);
  const vNewApp = createVApp(n);
  const patch = diff(vApp, vNewApp);

  // we might replace the whole $rootEl,
  // so we want the patch will return the new $rootEl
  $rootEl = patch($rootEl);

  vApp = vNewApp;
}, 2000);
