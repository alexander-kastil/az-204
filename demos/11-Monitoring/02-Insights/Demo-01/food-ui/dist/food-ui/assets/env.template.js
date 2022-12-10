(function (window) {
  window["env"] = window["env"] || {};
  window["env"].authEnabled = "${authEnabled}";
  window["env"].apiUrl = "${apiUrl}";
  window["env"].applicationInsights = "${applicationInsights}";
  window["env"].signalREndpoint = "${signalREndpoint}";
  window["env"].clientId = "${clientId}";
  window["env"].authority = "${authority}";
  window["env"].redirectUri = "${redirectUri}";
  window["env"].scopes = "${scopes}";
  window["env"].reactive = "${reactive}";
})(this);
