import os, uuid
from azure.identity import DefaultAzureCredential
from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient

account_url = "https://foodpicsdev.blob.core.windows.net"
blob_container_name = "food"
default_credential = DefaultAzureCredential()

blob_service_client = BlobServiceClient(account_url=account_url, credential=default_credential)
container_client = blob_service_client.get_container_client(blob_container_name)

blob_list = container_client.list_blobs()
for blob in blob_list:
    print("\t" + blob.name)