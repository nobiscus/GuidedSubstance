class Link extends HTMLElement {
  listener() {
    window.router.routeTo(this.getAttribute("to"), this.getAttribute("item"));
  }
  constructor() {
    super();
    this.addEventListener("click", this.listener);
  }
  disconnectedCallback() {
    this.removeEventListener("click", this.listener);
  }
}

customElements.define("hyper-link", Link);

const clearContent = () => {
  document.querySelector("#content").innerHTML = "";
};

export const createRoutes = (config) => {
  const loadContent = (id, name) => {
    name ? config[id](name) : config[id]();
  };

  const reRouteChores = (id, name) => {
    document.title = name ? `${id}/${name}` : id;
    clearContent();
    loadContent(id, name);
    window.scrollTo(0, 0);
  };

  const routeTo = (id, name) => {
    reRouteChores(id, name);
    window.history.pushState({ id, name }, `${id}`, ``);
  };

  window.addEventListener("popstate", ({ state: { id, name } }) => {
    reRouteChores(id, name);
  });

  window.router = { routeTo };

  return routeTo;
};
