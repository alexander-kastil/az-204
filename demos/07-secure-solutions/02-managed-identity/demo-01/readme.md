# Use System assigned Managed Identities to access Key Vault

- Execute `appservice-use-mi.azcli`. It deploys `food-api-mi`.

- Explain [food-api-mi](./food-api-mi/) and it's `UseManagedIdentity` property in `appsettings.json`.

    ```json
    "FoodCatalogApi": {
        "Title": "Food Catalog Api",
        "AuthEnabled": false,
        "UseAppConfig": false,
        "UseSQLite": true,
        "UseManagedIdentity": true,
```