# Getting Started with Cosmos DB

- Create SQL DB in Portal
- Upload `persons.json`
- Show Queries, Stats, Indexing

## Basic Syntax

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