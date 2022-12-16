# Redis Pub / Sub

## Demo

- Open 2 browser instances showing Redis Console

- Enter the following commands in the first browser instance:

    ```bash
    SUBSCRIBE org.food.alerts
    ```

- Enter the following commands in the second browser instance:

    ```bash
    PUBLISH org.food.alerts food-event-11
    ```    