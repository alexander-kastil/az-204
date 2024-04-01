package com.example.blobconsolespring;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Stream;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.BlobServiceClient;
import com.azure.storage.blob.BlobServiceClientBuilder;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);

		try {
			String connectionString = "DefaultEndpointsProtocol=https;EndpointSuffix=core.windows.net;AccountName=foodpicsdev;AccountKey=BV1X0wCSWwfrekNd8sbX8J+JGhakQjpgdx14P/OojJhqr0gWq/jVzLDS2DhgqGMa7q+606ga0lLZ+ASt+6ICfA==;BlobEndpoint=https://foodpicsdev.blob.core.windows.net/;FileEndpoint=https://foodpicsdev.file.core.windows.net/;QueueEndpoint=https://foodpicsdev.queue.core.windows.net/;TableEndpoint=https://foodpicsdev.table.core.windows.net/";

			// Create a BlobServiceClient object which will be used to create a container client
			BlobServiceClient blobServiceClient = new BlobServiceClientBuilder().connectionString(connectionString).buildClient();

			//Create a unique name for the container
			String containerName = "food-" + java.util.UUID.randomUUID();

			// Create the container and return a container client object
			BlobContainerClient containerClient = blobServiceClient.createBlobContainer(containerName);
			// Get the path to the image directory
			Path path = Paths.get("../food-pics");

			// Check if directory exists
			if (!Files.exists(path)) {
				System.out.println("Directory not found");
				return;
			}

			try (Stream<Path> paths = Files.walk(path)) {
				paths
					// Filter out directories, we want files only
					.filter(Files::isRegularFile)
					// For each file
					.forEach(filePath -> {
						// Get the filename
						String filename = filePath.getFileName().toString();

						// Check if the file is an image
						if (filename.endsWith(".jpg") || filename.endsWith(".png") || filename.endsWith(".jpeg")) {
							System.out.println("Uploading " + filename);

							// Get a blob client for the file
							BlobClient blobClient = containerClient.getBlobClient(filename);

							// Upload the file
							try {
								blobClient.uploadFromFile(filePath.toString(), true);
							} catch (Exception e) {
								System.out.println("Error uploading file " + filename + ": " + e.getMessage());
							}
						}
					});
			} catch (IOException e) {
				System.out.println("Error reading files: " + e.getMessage());
			}
			System.out.println("Connected to Azure Blob Storage");
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
	}

}
