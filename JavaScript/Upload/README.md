# Upload

Uploading in Siesta is a 2-step process.

1. Contact the API to get the uploading credentials and URL  
    This response is used to upload a file, explained in this next point.

2. Upload the file to our filesystem  
    Using the response from the last API-call, we send a POST request to the `url` defined in the response, a body containing the information
    given in `form` of the response and lastly the file you wish to upload.


**WARNING**  
The receiving end of the `POST` request is *highly* sensitive, and *will* reject you if the body is not correct.
