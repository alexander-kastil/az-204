# Azure Functions as Container & Configuration Injection

Build Image:

```
docker build --rm -f Dockerfile -t func-app-config .
```

Start container with env vars:

```
docker run -d --rm -p 5053:80 -e "MyEnvVar=Changed" func-app-config
```

Browse: http://localhost:5053/api/getEnvValue
