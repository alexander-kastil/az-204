# Using Microsoft Authentication Library - MSAL Auth Code Grant and NgRx

Sample taken from [Food App](https://github.com/arambazamba/food-app)

- .NET 6 Api 
- Angular 13 UI using NgRx 

[Microsoft identity platform documentation](https://docs.microsoft.com/en-us/azure/active-directory/develop/)

[MSAL Auth Flows](https://docs.microsoft.com/en-us/azure/active-directory/develop/msal-authentication-flows)

[.NET Core Authentication Snippets](https://docs.microsoft.com/en-us/aspnet/core/security/authentication/social/microsoft-logins?view=aspnetcore-6.0)

[Tutorial: Sign in users and call the Microsoft Graph API from an Angular single-page application (SPA) using auth code flow](https://docs.microsoft.com/en-us/azure/active-directory/develop/tutorial-v2-angular-auth-code)

## Demo

- Requirements
- Create 2 App Registrations
- Configure Angular MSAL Auth
- Configure Api MSAL

### Requirements

- [Azure Trial Account](https://azure.microsoft.com/en-us/free/)

- [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest)

- [Getting Started with Azure CLI](https://github.com/arambazamba/ng-adv/tree/feature/msal-auth/Tooling/04-CLI)

    > Note: For Visual Studio Code integration install [Azure CLI Tools](https://marketplace.visualstudio.com/items?itemName=ms-vscode.azurecli) and [Azure Account](https://marketplace.visualstudio.com/items?itemName=ms-vscode.azure-account)

- [az ad app](https://docs.microsoft.com/en-us/cli/azure/ad/app?view=azure-cli-latest)    

### Create 2 App Registrations

- Requires two app registrations: one for the api - one for the ng ui.

![app-reg](./_images/msal-app.png)

Create app registration base using `create-msal-app-reg.azcli`.

>Note: The current state of Azure CLI does not allow setting all props of the app registration. Please check and complete them manually

API App Registration:

![api-auth](./_images/api-auth.png)

![api-expose](./_images/api-expose.png)

![api-scope](./_images/api-scope.png)

UI App Registration:

![ui-auth](./_images/ui-auth.png)

![ui-permissions](./_images/ui-permissions.png)

### Configure Angular MSAL Auth

Update `environment.ts`:

```json
export const environment = {
  production: false,
  authEnabled: true,
  apiUrl: 'https://localhost:5001/',
  azure: {
    applicationInsights: 'a196d36f-...',
    appReg: {
      clientId: 'd23642f7-...',
      authority:
        'https://login.microsoftonline.com/d92b247e-.../',
      redirectUri: 'http://localhost:4200/',
      scopes: [
        ['https://graph.microsoft.com/v1.0/me', ['user.read']],
        [
          'https://localhost:5001/food',
          ['api://b509d389-.../access_as_user'],
        ],
      ],
    },
  },
};
```

`package.json`:

```
"@azure/msal-angular": "^2.0.6",
"@azure/msal-browser": "^2.20.0",
```

To keep the root module clean, most of the msal activity is implemented in `auth.module.ts` and `auth.facade.ts`. auth.module.ts is imported into `app.module.ts`:

```typescript
@NgModule({
  declarations: [...],
  imports: [
    ...
    MsalAuthHelperModule,
  ],
```

`MsalAuthHelperModule`:

![ng-layout.png](./_images/ng-layout.png)

`auth.module.ts`:

```typescript
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    MsalModule,
    StoreModule.forFeature(authFeatureKey, authReducer),
  ],
  providers: [
    MsalAuthFacade,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory,
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
  ],
})
export class MsalAuthHelperModule {}
```

`auth.facade.ts`:

```typescript
@Injectable()
export class MsalAuthFacade {
  constructor(
    @Inject(forwardRef(() => ConfigService)) private cs: ConfigService,
    private msalBC: MsalBroadcastService,
    private store: Store<MsalAuthState>
  ) {
    this.handleLoginSuccess(this.msalBC);
  }
   
  getUser() {...

  cfgInitAndAuthenticated() {...

  handleLoginSuccess = (broadcast: MsalBroadcastService) => {...

  logout() {...
}

// factories used in module
export function MSALInstanceFactory(): IPublicClientApplication {
  // update clientId and authority from ui app registration
  let config = {
    auth: {
      clientId: 'd23642f7-...',
      authority: 'https://login.microsoftonline.com/d92b247e-...',
      redirectUri: '/',
    },
    ...
  };
  return new PublicClientApplication(config);
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['user.read',]);
  // custom scope taken from api app registration
  protectedResourceMap.set('https://localhost:5001/food', ['api://b509d389-.../access_as_user',]);
  return {interactionType: InteractionType.Redirect, protectedResourceMap,};
}
...
```

`MSALInterceptorConfigFactory` is used to configure the MSAL Interceptor. `MSALGuardConfigFactory` defines `InteractionType` and is used in the Route Guard:

```typescript
export declare enum InteractionType {
    Redirect = "redirect",
    Popup = "popup",
    Silent = "silent"
}

...

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent, canActivate: [MsalGuard] },
  {
    path: 'food',
    loadChildren: () => import('./food/food.module').then((m) => m.FoodModule),
    canLoad: [MsalGuard],
  },
];
```

>Note: Additional docs [https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/docs/v2-docs/configuration.md](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/docs/v2-docs/configuration.md).

### Configure .NET Api MSAL Auth

`appsettings.json`:

```json
{
  "AzureAd": {
      "TenantId": "d92b247e-...",
      "ClientId": "b509d389-...",
      "Instance": "https://login.microsoftonline.com/",
      "cacheLocation": "localStorage",
  },
```

`Startup.cs`:

```c#
public void ConfigureServices(IServiceCollection services)

  services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
      .AddMicrosoftIdentityWebApi(Configuration)
      .EnableTokenAcquisitionToCallDownstreamApi()
      .AddInMemoryTokenCaches();

  services.AddAuthorization();
```

```c#
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)

  app.UseCors("default");
  app.UseHttpsRedirection();
  app.UseRouting();
  app.UseAuthentication();
  app.UseAuthorization();
```

`FoodController.cs`:

```c#
[Authorize]
[Route ("[controller]")]
[ApiController]
public class FoodController : ControllerBase {

  static readonly string[] scopeRequiredByApi = new string[] { "access_as_user" };

  [HttpGet ()]
  public IEnumerable<FoodItem> GetFood () {
      HttpContext.VerifyUserHasAnyAcceptedScope(scopeRequiredByApi);
      return ctx.Food.ToArray ();
  }
```
