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

        return func.HttpResponse(f"Transcript: {url}: {content}")
    else:
        return func.HttpResponse(
             "This HTTP triggered function executed successfully. Pass a valid youtube url in the query string or in the request body for transcript.",
             status_code=200
        )