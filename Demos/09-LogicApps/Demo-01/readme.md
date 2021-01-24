# Demo Logic Apps & Azure Cognitive Services

To create a Congnitve Services Account review and execute `create-cognitive.azcli`.

> Note: Finde a reference for Azure Cognitive Services [here](https://docs.microsoft.com/en-us/cli/azure/cognitiveservices?view=azure-cli-latest).

Setup Cognitive Services for Text Analysis:

```
curl https://raw.githubusercontent.com/MicrosoftDocs/mslearn-route-and-process-data-logic-apps/master/setup-textanalytics.sh > setup-textanalytics.sh
bash setup-textanalytics.sh
```

Create SQL Server database to store positive tweets:

```
curl https://raw.githubusercontent.com/MicrosoftDocs/mslearn-route-and-process-data-logic-apps/master/setup-sql-database.sh > setup-sql-database.sh
bash setup-sql-database.sh
```

## Additional Labs & Walkthroughs

[]()

[Build automated workflows to integrate data and apps with Azure Logic Apps](https://docs.microsoft.com/en-us/learn/paths/build-workflows-with-logic-apps/)
