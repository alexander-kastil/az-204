(function (window) {
  window["env"] = window["env"] || {};
  window["env"].authEnabled = "false";
  window["env"].api = "https://localhost:5001/";
  window["env"].applicationInsights = "0a945124-73ac-4295-98b0-5116df276b7d";
  window["env"].signalREndpoint = "";
  window["env"].clientId = "d23642f7-9ccf-4165-92e7-919f625a5acc";
  window["env"].authority = "https://login.microsoftonline.com/d92b247e-90e0-4469-a129-6a32866c0d0a/";
  window["env"].redirectUri = "http://localhost:4200/";
  window["env"].scopes = [
    ['https://graph.microsoft.com/v1.0/me', ['user.read']],
    [
      'https://localhost:5001/food',
      ['api://b509d389-361a-447b-afb2-97cc8131dad6/access_as_user'],
    ],
  ];
  window["env"].reactive = "false";
  window["env"].logging = "false";
  window["env"].persistCart = "false";
})(this);
