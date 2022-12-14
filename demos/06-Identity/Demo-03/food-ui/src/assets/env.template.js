(function (window) {
  window["env"] = window["env"] || {};
  window["env"].authEnabled = "${ENV_AUTH_ENABLED}";
  window["env"].api = "${ENV_API_URL}";
  window["env"].applicationInsights = "${ENV_APP_INSIGHTS}";
  window["env"].signalREndpoint = "${ENV_SIGNALR_ENDPOINT}";
  window["env"].clientId = "${ENV_CLIENT_ID}";
  window["env"].authority = "${ENV_AUTHORITY}";
  window["env"].redirectUri = "${ENV_REDIRECT_URI}";
  window["env"].scopes = "${ENV_SCOPES}";
  window["env"].reactive = "${ENV_REACTIVE}";
  window["env"].logging = "${ENV_LOGGING}";
  window["env"].persistCart = "${ENV_PERSISTCART}";
})(this);
