(function (window) {
  window["env"] = window["env"] || {};
  window["env"].API_URL = "${ENV_API_URL}" ;
  window["env"].AUTH_ENABLED = "${ENV_AUTH_ENABLED}" || false;
  window["env"].CLIENT_ID = "${ENV_CLIENT_ID}";
  window["env"].AUTHORITY = "${ENV_AUTHORITY}";
  window["env"].REDIRECT_URI = "${ENV_REDIRECT_URI}";
})(this);

