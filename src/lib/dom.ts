import { JSX, render } from "preact";

// convenience method to build a DOM tree from a Preact vnode from within
// CodeMirror widgets or extensions.
export const build = (vnode: JSX.Element, container?: HTMLElement) => {
  const root = container || document.createElement("div");
  render(vnode, root);
  return root;
};
