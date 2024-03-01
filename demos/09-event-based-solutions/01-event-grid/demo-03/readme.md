# Real-time connected Angular Micro-frontend using Azure Event Grid and SignalR

This demo shows how to use Azure Event Grid and SignalR to create a real-time connected Angular Micro-frontend.

## Readings

[CloudEvent schema](https://docs.microsoft.com/en-us/azure/event-grid/cloudevents-schema)

[SignalR](https://docs.microsoft.com/en-us/azure/azure-signalr)

## Demo

[Food orders dashboard](./food-orders-dashboard/) `food-orders-ui` implemented as Angular Micro-Frontend using `@ngrx/component-store`

[Food orders dashboard function](./food-orders-dashboard-func/) that acts as an endpoint for the event grid topic webhook subscription and communicates with the SignalR service that provides a real time connection to the orders dashboard

![architecture](_images/architecture.png)

-   The Event Grid Topic receives a CloudEvent triggered by `post-order.http`

-   A function app:
    -   Acts as an endpoint for the event grid topic webhook subscription using a binding
    -   Communicates with the SignalR service that provides a real time connection to the orders dashboard

### Setup & Steps

-   Execute `create-food-order-app.azcli` in [wsl bash](https://learn.microsoft.com/en-us/windows/wsl/install) to provision the environment and deploy the function app. Navigate to the Azure portal and check that the resources have been created.

    ![azure](_images/azure.png)

-   Update SignalR config key `fxEndpoint` in `environment.ts` of `food-orders-ui` using the values from the terminal of the previous step.

    ![azure](_images/cfg.png)

    ```typescript
    export const environment = {
        production: false,
        fxEndpoint: 'https://foodorders-7325.azurewebsites.net/api',
    };
    ```

-   Start the Micro-Frontend using `ng serve` in `food-orders-dashboard` and open [http://localhost:4200](http://localhost:4200). Open the F12 Dev tools and check that the SignalR connection is established.

    ![websocket](_images/websocket.png)

-   Send a mock CloudEvent using `post-order.http` by updating `@topicurl` and `@topickey` with the values from the terminal:

    ```
    @topicurl=foodtopic-prod.westeurope-1.eventgrid.azure.net
    @topickey=C1q1BdqhPGsNsmy5wBzjtsgTTN1u2GbiffNoU8EJlcM=

    POST  https://{{topicurl}}//api/events HTTP/1.1
    content-type: application/cloudevents+json; charset=utf-8
    aeg-sas-key: {{topickey}}

    { ...
    ```


https://user-images.githubusercontent.com/16348023/201038870-7420343a-f847-443d-9b25-2df2f71c44e5.mp4


> Credits: The demo is an updated and modernized version of [https://github.com/DavidGSola/serverless-eventgrid-viewer](https://github.com/DavidGSola/serverless-eventgrid-viewer)
