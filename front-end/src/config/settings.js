const defaults = require("./settings.default.json");
const envSpecificSettings = require(`./settings.${process.env.NODE_ENV}.json`);

let overrides = {};
if (process.env.API_BASE_URL) {
  overrides["apiBaseUrl"] = process.env.API_BASE_URL;
}

export default Object.assign({}, defaults, envSpecificSettings, overrides);
