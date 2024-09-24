import logging
import azure.functions as func
from bs4 import BeautifulSoup
import requests
import json
from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient
from datetime import datetime
import os

app = func.FunctionApp()

@app.schedule(schedule="0 */5 * * * *", arg_name="myTimer", run_on_startup=True,
              use_monitor=False) 
def scrape_rates(myTimer: func.TimerRequest) -> None:
    if myTimer.past_due:
        logging.info('The timer is past due!')

    logging.info('Python timer trigger function executed.')

    url = os.getenv("SCRAPING_URL")
    connection_string = os.getenv("BLOB_STORAGE_CONNECTION_STRING")
    container_name = os.getenv("BLOB_CONTAINER_NAME")

    response = requests.get(url)

    if response.status_code == 200:
    # Parse the HTML content of the page
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Find the table in the HTML
        table = soup.find('table')
        tables = soup.find_all('table')
        if len(tables) < 2:
            return func.HttpResponse("Second table not found", status_code=404)
        table = tables[1]
        
    # Extract headers
      
    data = []

    # Iterate over the rows in the table
    for row in table.find_all('tr')[1:]:  # Skip the header row
        if row.find('td', colspan=True):  # Skip rows with colspan
            continue
        cols = row.find_all('td')
        bezeichnung = cols[0].text.strip()
        ankaufspreis = cols[4].text.strip()
        verkaufspreis = cols[5].text.strip()
        
        # Append the data to the list
        data.append({
            "Bezeichnung": bezeichnung,
            "Ankaufspreis": ankaufspreis,
            "Verkaufspreis": verkaufspreis
        })

    # Convert the list to JSON
    json_data = json.dumps(data, ensure_ascii=False, indent=4)

    # Get the current time
    current_time = datetime.utcnow().strftime('%Y%m%d%H%M%S')

    # Create the filename with the current time
    filename = f"rates_{current_time}.json"

    # Create the BlobServiceClient object
    blob_service_client = BlobServiceClient.from_connection_string(connection_string)

    # Create a container client
    container_client = blob_service_client.get_container_client(container_name)

    # Upload the JSON data to Azure Blob Storage
    blob_client = container_client.get_blob_client(filename)
    blob_client.upload_blob(json_data, overwrite=True)

    logging.info(f"Uploaded {filename} to Azure Blob Storage.")