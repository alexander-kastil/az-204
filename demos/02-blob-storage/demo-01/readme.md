# Provision and use Blob Storage

[Azure Storage client libraries for .NET](https://docs.microsoft.com/en-us/dotnet/api/overview/azure/storage)

[Blob service REST API](https://docs.microsoft.com/en-us/rest/api/storageservices/blob-service-rest-api)

## Demo

- Execute `create-blob-app.azcli` to create the base resources

### Java

- Make sure Azure Developer CLI is installed und run:

    ```shell
    azd init --template blob-storage-quickstart-java
    ```


### Spring Boot

```java
spring init --dependencies=web blob-console-spring
```

```java