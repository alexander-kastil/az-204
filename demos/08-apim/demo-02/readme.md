# XML to JSON Transformation using Policy

[API Management Policies](https://docs.microsoft.com/en-us/azure/api-management/api-management-policies)

## Demo	

- Use `getXML` of `foodutil-dev` to test the policy
- Test to show XML result
- Add the following policy to outbound:

    ```xml
    <outbound>
        <base />
        <xml-to-json kind="direct" apply="always" consider-accept-header="false" />
    </outbound>
    ```