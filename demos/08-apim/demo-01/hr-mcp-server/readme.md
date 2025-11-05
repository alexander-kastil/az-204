## HR MCP Server

### Run the server

```powershell
dotnet run
```

### Connect with MCP Inspector

1. Start the server (see above).
2. Launch the inspector with the provided config:

```powershell
npx @modelcontextprotocol/inspector --config inspector.config.json --server hr-mcp
```

The config at `inspector.config.json` tells the inspector to use the HR MCP server's Streamable HTTP base URL `http://localhost:47002`, matching the endpoint that `app.MapMcp()` exposes. This satisfies the newer CLI requirement that `--server` reference an entry in a config file.

#### Remote (Azure) deployment

```powershell
npx @modelcontextprotocol/inspector --config inspector.config.json --server hr-mcp-azure
```

This reuses the same inspector config but selects the `hr-mcp-azure-dev` entry, which points at `https://hr-mcp-server-dev.azurewebsites.net`. Make sure the Azure app is running and reachable before launching the inspector.

> **Heads-up:** Updating `inspector.config.json` is a local workflow change only—you don’t need to republish the Azure App Service after editing this file. Republish the .NET app itself only when the server code or configuration that lives in the deployed artifact changes.
