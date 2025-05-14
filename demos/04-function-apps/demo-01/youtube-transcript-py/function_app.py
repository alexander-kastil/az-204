import azure.functions as func
import logging
import os
import requests
from langchain_community.document_loaders import youtube

app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)

@app.route(route="get_transcription")
def get_transcription(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    req_body = req.get_json()
    url = req_body.get('url')

    if url:
        loader=youtube.YoutubeLoader.from_youtube_url(url)
        transcript=loader.load()
        content = transcript[0].page_content

        endpoint = os.environ["MODEL_REST_ENDPOINT"]
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
                "text": "You are an AI assistant specialized in creating comprehensive and detailed summaries. Create an in-depth analysis and summary of the provided content. Focus on key points, main arguments, and important details."
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


        return func.HttpResponse(f"Transcript: {url}: {response.json()}")
    else:
        return func.HttpResponse(
             "This HTTP triggered function executed successfully. Pass a valid youtube url in the query string or in the request body for transcript.",
             status_code=200
        )