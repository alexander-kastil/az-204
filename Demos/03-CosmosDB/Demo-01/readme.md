# Getting Started with Cosmos DB

-   Create SQL DB in Portal
-   Upload `persons.json`
-   Show Queries, Stats, Indexing

## Basic Syntax

Sample entity:

```json
{
    "id": "680",
    "Name": "HL Road Frame - Black, 58",
    "Description": "Our lightest and best quality aluminum ...",
    "ProductNumber": "FR-R92B-58",
    "Color": "Black",
    "Model": {
        "Id": 6,
        "Name": "HL Road Frame",
        "Description": null
    },
    "Category": {
        "ParentId": 2,
        "ParentName": "Components",
        "Id": 18,
        "Name": "Road Frames"
    },
    "Size": "58",
    "Weight": 1016.04,
    "SellStartDate": "2002-06-01T00:00:00",
    "SellEndDate": null,
    "Promotion": true
}
```

Execute query for id:

```sql
SELECT *
FROM products p
WHERE p.id = '680'
```

Execute query for Color:

```sql
SELECT *
FROM p
WHERE p.Color = "Red"
ORDER by p.Size DESC
```

Using alias:

```sql
SELECT
    p.Name,
    (p.Weight * 2.2) AS WeightInPound
FROM products p
```

Products to those that have a weight that is between 1000 and 1020:

```sql
SELECT
    p.Name,
    p.Category,
    p.Size
FROM
    products p
WHERE
    p.Weight >= 1000 AND
    p.Weight <= 1020
```

Get all colors in a distinct list:

```sql
SELECT DISTINCT
    p.Color
FROM
    products p
```

VALUE operator flattens the result nesting:

```sql
SELECT DISTINCT VALUE
    p.Category.Name
FROM
    products p
```
