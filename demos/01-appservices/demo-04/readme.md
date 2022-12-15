# Easy Authentication

[Authentication and authorization in Azure App Service and Azure Functions](https://docs.microsoft.com/en-us/azure/app-service/overview-authentication-authorization)

## Demos

- Enable Easy Auth on [git-deploy-app](https://github.com/arambazamba/git-deploy-app)

- Explain `index.js`:

    ```javascript
    (function () {
    console.log('Checking for easy auth user');
    fetch('/.auth/me')
        .then((response) => response.json())
        .then((data) => {
            document.getElementById('noauth').style.display = 'none';
            if (data[0]) {
                const msg = `<p>You are logged in as: ${data[0].user_id}</p><p>Open F12 Dev Tools to see your tokens from /.auth/me</p>`;
                document.getElementById('auth').innerHTML = msg;
                console.log('Full easy auth response: ', data[0]);
                console.log('ID token: ', data[0].id_token);
                console.log('Access token: ', data[0].access_token);
            }
        })
        .catch(() => {
            const div = document.getElementById('auth');
            if (div) {
                div.style.display = 'none';
            }
        });
    })();
    ```
