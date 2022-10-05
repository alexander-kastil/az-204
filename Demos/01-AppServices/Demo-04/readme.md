# Easy Authentication

[Authentication and authorization in Azure App Service and Azure Functions](https://docs.microsoft.com/en-us/azure/app-service/overview-authentication-authorization)

- Enable Easy Auth on Git Deployment App

- Explain:

    ```javascript
    getuser();

    function getuser() {
        console.log('Checking for easy auth user');
        fetch('/.auth/me')
            .then((response) => response.json())
            .then((data) => {
                console.log('response: ', data);
                if (data[0]) {
                    console.log('token: ', data[0].access_token);
                    console.log('user: ', data[0].user_id);
                }
            });
    }
    ```
