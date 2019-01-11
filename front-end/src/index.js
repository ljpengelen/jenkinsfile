import "./styles/shell.scss";
import { h, render } from "preact";

{
  const App = require("./components/App").App;
  const root = document.querySelector("#app-root");

  root.innerHTML = "";
  render(<App />, root);
}

if (process.env.NODE_ENV === "development") {
  require("preact/devtools");

  if (module.hot) {
    module.hot.accept();
  }
}
