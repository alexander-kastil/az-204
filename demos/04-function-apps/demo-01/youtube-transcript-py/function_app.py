import azure.functions as func
import logging
import os
import requests
import base64
from langchain_community.document_loaders import youtube

app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)

@app.route(route="get_transcription")
def get_transcription(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    req_body = req.get_json()
    url = req_body.get('url')
    lang = req_body.get('lang')
    length = req_body.get('length')

    if url:
        loader=youtube.YoutubeLoader.from_youtube_url(url)
        transcript=loader.load()
        content = transcript[0].page_content

        endpoint = os.environ["AZENDPOINT"]
        api_key = os.environ["API_KEY"]

        headers = {
            "Content-Type": "application/json",
            "api-key": api_key,
        }

        payload = {
            "messages": [
                {
                "role": "system",
                "content": [
                    {
                    "type": "text",
                    "text": "You are an AI assistant that summarizing and translating articles to german. First summarize the input and then translate it to" + lang + ". Hold the summary " + length + " concerning length."
                    }
                ]
                },
                {
                "role": "user",
                "content": [
                    {
                    "type": "text",
                    "text": content
                    }
                ]
                }
            ],
            "temperature": 0.7,
            "top_p": 0.95,
            "max_tokens": 800
            }

        try:
            response = requests.post(endpoint, headers=headers, json=payload)
            response.raise_for_status()  # Will raise an HTTPError if the HTTP request returned an unsuccessful status code
        except requests.RequestException as e:
            raise SystemExit(f"Failed to make the request. Error: {e}")


        return func.HttpResponse(f"Transcript by Alex for his friend: {url}: {response.json()}")
    else:
        return func.HttpResponse(
             "This HTTP triggered function executed successfully. Pass a valid youtube url in the query string or in the request body for transcript.",
             status_code=200
        )