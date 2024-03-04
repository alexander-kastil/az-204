package com.function;

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

/**
 * Azure Functions with HTTP Trigger.
 */
public class Function {

    @FunctionName("UploadNewsletter")
    public HttpResponseMessage run(
            @HttpTrigger(name = "req", methods = {
                    HttpMethod.POST }, authLevel = AuthorizationLevel.ANONYMOUS) HttpRequestMessage<String> request,
            @BlobOutput(name = "outputBlob", path = "newsletters/{blobName}", connection = "StorageConnection") OutputBinding<String> outputBlob,
        final ExecutionContext context) {
                context.getLogger().info("Java HTTP trigger processed a request.");

                // Parse query parameter
                final String text = request.getBody();
                String fileName = "newsletter-" + java.util.UUID.randomUUID() + ".txt";

                outputBlob.setValue(text);

                return request.createResponseBuilder(HttpStatus.OK)
                                .body("Text file uploaded successfully!")
                                .build();
        }
}
