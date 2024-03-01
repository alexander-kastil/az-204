(function (window) {
  window["env"] = window["env"] || {};
  window["env"].CATALOG_API_URL = "${ENV_CATALOG_API_URL}";
  window["env"].ORDERS_API_URL = "${ENV_ORDERS_API_URL}";
  window["env"].AUTH_ENABLED = "${ENV_AUTH_ENABLED}" || false;
  window["env"].CLIENT_ID = "${ENV_CLIENT_ID}";
  window["env"].AUTHORITY = "${ENV_AUTHORITY}";
  window["env"].REDIRECT_URI = "${ENV_REDIRECT_URI}";
  window["env"].APPLICATION_INSIGHTS = "${ENV_APPLICATION_INSIGHTS}";
  window['env'].APIM_KEY = "${ENV_APIM_KEY}";
})(this);

