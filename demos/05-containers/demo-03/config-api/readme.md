# Containers and Environment Variables in .NET

Build Image:

```
docker build --rm -f dockerfile -t config-api:env-vars .
```

Run Image without env vars:

```
docker run -it --rm -p 5051:80 config-api:env-vars
```

Visit http://localhost:5051/settings

# Run Image with env vars

```
docker run -it --rm -p 5051:80 config-api:env-vars -e "App__UseEnv"="true" 
```