(function (window) {
  window["env"] = window["env"] || {};
  window["env"].apiUrl = "http://localhost:5001/food";
  window["env"].applicationInsights = "a196d36f-1782-4da4-8f95-a80585361df7";
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
})(this);
