# Post to Microsoft Teams using Graph REST API and Azure Function

- Create the app registration by executing `create-confidential-appreg.azcli`:

    ![appreg1](_images/app-reg1.png)

    ![appreg2](_images/app-reg2.png)

- Add the clientId and the secret to the `local.settings.json` file of `post-teams-func`:

        