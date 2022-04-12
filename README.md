# Microservices Implementation

This is a sample code to show how we can connect 3 different backends through Apache Kafka

# How to execute it?

- First Step: Up the Kafka container
  - Execute 
    ```yaml 
       > cd kafka
       > docker-compose up -d
  - After Kafka's up, you can see and create new topics accessing the address: http://localhost:9021

- Second Step: Start the backend applications
  - **Open 3 terminals side-by-side** to see the messages transit
  - Execute the commands:
    - On the first terminal: 
        ```yaml 
           > cd front-api 
           > npm install
           > npm start
    - On the second terminal: 
        ```yaml 
           > cd node-api
           > npm install
           > npm start
    - On the third terminal: 
        ```yaml 
           > cd python-api
           > python3 main.py

# How to test it?

- When all the backends are started, on Postman, Insomnia or other tool, create a new **POST REQUEST** with the following settings:
  - Request Url: http://localhost:3000/recommendations
  - Body:
    - clientId: It's a fake id of client
    - sku: It's a fake sample key user
    ```yaml
    { "clientId": "{{$guid}}", "sku": { { $randomInt } } }
    ```
- After sending the request, you will receive a message informing you that your request was sent to processing.
- You will be able to see the message exchange via Kafka in the terminal. See the examples below:
  - Message received by node-api and sent by front-api.
    ```yaml
    { clientId: "197c0136-c8e8-4d7a-b2fe-3f6257ca5691", sku: 492 }
    ```
  - Message received by python-api and sent by node-api
    ```yaml
    Receiving message @ 2022-04-11 16:38:33.115488 | Message = b'{"clientId":"197c0136-c8e8-4d7a-b2fe-3f6257ca5691","sku":492}'
    ```
  - Message sent by python-api to node-api
    ```yaml
      Producing message @ 2022-04-11 16:38:33.115913 | Message = {'client_id': '197c0136-c8e8-4d7a-b2fe-3f6257ca5691', 'sku': 492, 'recommendations': ['Recommendation SDyHhpCSqoAJuyDrmJTtqxzbUDcEpPxH', 'Recommendation tVhPdabYMSXCPtJkemCXzRYueqAykWNY', 'Recommendation GSkGyDTPwrgohKOzzUCByPnAoJftmyMm', 'Recommendation UwLRdlLJOePxGUiaYmsIYWVfysccoBuR', 'Recommendation AdPqnyTUrQBtAcKeFyBnOFbDfaWyCRGi']}
    ```
  - Message received by front-api and sent by node-api
    ```yaml
    {
      message:
        {
          client_id: "197c0136-c8e8-4d7a-b2fe-3f6257ca5691",
          sku: 492,
          recommendations:
            [
              "Recommendation SDyHhpCSqoAJuyDrmJTtqxzbUDcEpPxH",
              "Recommendation tVhPdabYMSXCPtJkemCXzRYueqAykWNY",
              "Recommendation GSkGyDTPwrgohKOzzUCByPnAoJftmyMm",
              "Recommendation UwLRdlLJOePxGUiaYmsIYWVfysccoBuR",
              "Recommendation AdPqnyTUrQBtAcKeFyBnOFbDfaWyCRGi",
            ],
        },
    }
    ```

# IMPORTANT WARNING

This application could not work correctly on Mac M1 chips due to the Kafka incompatibility
