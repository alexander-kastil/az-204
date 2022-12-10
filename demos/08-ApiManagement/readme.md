# API Management

[API Management Documentation](https://docs.microsoft.com/en-us/azure/api-management/)

[Swaggger](https://swagger.io/)

[API Management Policies](https://docs.microsoft.com/en-us/azure/api-management/api-management-policies)

## Demos

- Api Management Create / Add Api
- Create Product
- Explain Policies
- Create Subscription / Use it

Use Subscription Key:

```
curl --header "Ocp-Apim-Subscription-Key: <key string>" https://<apim gateway>.azure-api.net/api/path
curl https://<apim gateway>.azure-api.net/api/path?subscription-key=<key string>
```

## CLI Reference

[az apim](https://docs.microsoft.com/en-us/cli/azure/apim?view=azure-cli-latest)

## Additional Labs & Walkthroughs

[Learning Path - Architect API integration in Azure](https://docs.microsoft.com/en-us/learn/paths/architect-api-integration/)
