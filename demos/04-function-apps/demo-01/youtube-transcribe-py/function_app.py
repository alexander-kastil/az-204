import azure.functions as func
import logging
from langchain_community.document_loaders import youtube


app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)

@app.route(route="do_transcribe")
def do_transcribe(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    req_body = req.get_json()
    url = req_body.get('url')

    if url:
        loader=youtube.YoutubeLoader.from_youtube_url(url)
        transcript=loader.load()
        return func.HttpResponse(f"Transcript of the following {url}: {transcript[0].page_content}")
    else:
        return func.HttpResponse(
             "This HTTP triggered function executed successfully. Pass a valid youtube url in the query string or in the request body for transcript.",
             status_code=200
        )