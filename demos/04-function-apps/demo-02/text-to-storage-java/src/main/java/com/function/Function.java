package com.function;

import java.io.ByteArrayInputStream;
import java.nio.charset.StandardCharsets;

import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.BlobServiceClient;
import com.azure.storage.blob.BlobServiceClientBuilder;
import com.microsoft.azure.functions.ExecutionContext;
import com.microsoft.azure.functions.HttpMethod;
import com.microsoft.azure.functions.HttpRequestMessage;
import com.microsoft.azure.functions.HttpResponseMessage;
import com.microsoft.azure.functions.HttpStatus;
import com.microsoft.azure.functions.OutputBinding;
import com.microsoft.azure.functions.annotation.AuthorizationLevel;
import com.microsoft.azure.functions.annotation.BlobOutput;
import com.microsoft.azure.functions.annotation.FunctionName;
import com.microsoft.azure.functions.annotation.HttpTrigger;
import io.github.cdimascio.dotenv.Dotenv;

/**
 * Azure Functions with HTTP Trigger.
 */
public class Function {

        @FunctionName("UploadNewsletter")
        public HttpResponseMessage run(
                        @HttpTrigger(name = "req", methods = {
                                        HttpMethod.POST }, authLevel = AuthorizationLevel.ANONYMOUS) HttpRequestMessage<String> request,
                        final ExecutionContext context) {
                context.getLogger().info("Java HTTP trigger processed a request.");

                // Parse query parameter
                final String text = request.getBody();
                String fileName = "newsletter-" + java.util.UUID.randomUUID() + ".txt";

                // Load environment variables
                String connectionString = System.getenv("CONNECTION_STRING");
                String containerName = System.getenv("CONTAINER_NAME");

                // Create a BlobServiceClient object which will be used to create a container
                // client
                BlobServiceClient blobServiceClient = new BlobServiceClientBuilder().connectionString(connectionString)
                                .buildClient();

                // Create the container and return a container client object
                BlobContainerClient containerClient = blobServiceClient.getBlobContainerClient(containerName);

                BlobClient blobClient = containerClient.getBlobClient(fileName);

                // Get a reference to a blob
                ByteArrayInputStream inputStream = new ByteArrayInputStream(text.getBytes(StandardCharsets.UTF_8));

                // Upload the blob
                // blobClient.
                blobClient.upload(inputStream, text.length(), true);
                
                return request.createResponseBuilder(HttpStatus.OK).body("File uploaded successfully").build();
        }
}
