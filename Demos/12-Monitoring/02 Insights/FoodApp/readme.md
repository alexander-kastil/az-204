# Publishing

## Docker

Download an Image

`docker pull microsoft/mssql-server-linux:latest`

### Base Switches & Things to know

Detached: `-d`

Cleanup: `--rm`

Map Ports `LocalPort:DockerPort` : `--p 8080:5000`

Mount Containers to allow Network Communication: `--link sqllinux:sqllinux`

Prefexing prod keeps Intellisense in file and allows you to have more than one Dockerfile. Example:

`Dockerfile` or `anguarui.dockerfile`

[Docker CLI Reference](https://docs.docker.com/engine/reference/commandline/cli/)

[Docker Compose Cheatsheet](https://devhints.io/docker-compose)

---

## Containerize a 3-Tier Application

### Run SQL for Linux in Container

```
docker run -d --name sqllinux -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=TiTp4SQL@dmin' microsoft/mssql-server-linux:latest
```

Show running containers: `docker ps -a`

Kill & Remove Containers

```
docker kill CONTAINERID
docker rm CONTAINERID
```

### Containerize .NET Core Web Api - Dockerfile

Specify Dockerfile for Build: -f ... Dockerfile | prod.dockerfile

Adjust Connection String & use it in Startup.cs:

`"DockerConnection": "Data Source=sqllinux;Initial Catalog=VoucherDockerDB;;User ID=sa;Password=TiTp4SQL@dmin"`

```
var conStr = configuration["ConnectionStrings:DockerConnection"];
services.AddEntityFrameworkSqlServer().AddDbContext<SkillDBContext>(options => options.UseSqlServer(conStr));
```

```
docker build --rm -f Dockerfile -t skillsapi .
docker run -d --rm -p 8080:8080 --link sqllinux:sqllinux skillsapi
```

Publish Image to Dockerhub

```
docker tag skillsapi arambazamba/skillsapi
docker push arambazamba/skillsapi
```

### Containerize Angular Frontend

[NGINX](https://www.nginx.com/) is a commonly used Web Server to serve static Apps like Angular

Execute in `..\13 Publishing\VouchersUI\`

#### Build & check NGINX - app.nginx.dockerfile

Look at `/config/nginx.conf`

Execute

```
docker build -f app.nginx.dockerfile -t nginxtest .
docker run -d -p 8080:80/tcp nginxtest
```

Check `http://localhost:8080` for result

Attach a shell to the docker container & investigate `/usr/share/nginx/html`

#### Create a Production Build - app.prod.dockerfile

Build SkillsUI image:

```
docker build --rm -f "Dockerfile" -t arambazamba/skillsui .
```

Run SkillsUI:

```
docker run -d --rm -p 8085:80 arambazamba/skillsui
```

Publish to Dockerhub - no tagging needed because of -t in build

```
docker push arambazamba/skillsui
```

---

### 3-Tier Farm - docker-compose.yml

```
version: "2.1"

services:
  skillsui:
    image: skillsui
    ports:
      - 8085:80
    networks:
      - skills-network
    depends_on:
      - skillsapi
  skillsapi:
    image: skillsapi
    ports:
      - 8080:5000
    networks:
      - skills-network
    depends_on:
      - sqllinux
  sqllinux:
    image: microsoft/mssql-server-linux
    ports:
      - 1433:1433
    environment:
      ACCEPT_EULA: "Y"
      SA_PASSWORD: "TiTp4SQL@dmin"
    networks:
      - skills-network
networks:
  skills-network:
    driver: bridge
```

Build your Network - not needed because images are used

`docker-compose build`

Run Network:

`docker-compose up`

Publish Image:

```
docker login
docker tag foodui arambazamba/foodui
docker push arambazamba/foodui
```

> Note: Use your own dockerhub username :-)

---

#### Run Angular agains NGINX in watch mode - app.dev.dockerfile

On Windows Host the mountend folder needs to be shared on Windows and "Shared Devices" needs to be enabled in Docker Desktop

![abc](_images/windows-share.png)

Build App & keep "dist"-folder when building:

`ng build --watch --delete-output-path false`

Build the dev container:

`docker build --rm -t vouchersdev -f app.dev.dockerfile .`

Run & Map local `dist/vouchersui` folder as `html` to nginx:

Use on Windows:

`docker run -p 8080:80 -v ${PWD}/dist/vouchersui:/usr/share/nginx/html vouchersdev`

Use on Linux / Mac Host

`docker run -p 8080:80 -v $(pwd)/dist/vouchersui:/usr/share/nginx/html vouchersdev`

Be aware that `nginx.conf` contains a route that redirects Server Side `404 errors` to Angular's `index.html` for Angular Routing to detect the route.

```
location / {
try_files $uri $uri/ /index.html =404;
}
```

---

## Kubernetes

[Kubernetes Base Terms](https://docs.bytemark.co.uk/article/kubernetes-terminology-glossary/)

[Kubectl Commands](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands)

Enable Kubernetes in Docker Desktop:

- Go to Docker Desktop Settings
- Check Enable Kubernetes -> Press Yes to install if asked

![Kubernetes](_images/kubernetes.png)

### Getting Started

Create a Deployment:

```
kubectl create deployment foodui --image arambazamba/foodui
```

Expose using a Service:

```
kubectl expose deployment foodui --type=LoadBalancer --port=8080
```

Forward the port to Service

![port-forward](_images/port-forward.png)

> Note: Can also be done using: `kubectl port-forward pods/foodui-5656cfd5b8-gc2m9 8060:80 -n default`

Cleanup:

```
kubectl delete service foodui
kubectl delete deployment foodui
```

> Note: Just in case you want to host on a classic Webserver (ie. IIS) you would have to configure URL Rewrite for Angular Subroutes

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <system.webServer>
        <rewrite>
            <rules>
                <rule name="SPA" stopProcessing="true">
                    <match url=".*" />
                    <conditions logicalGrouping="MatchAll">
                    <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
                    <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
                    </conditions>
                    <action type="Rewrite" url="./index.html" />
                </rule>
            </rules>
        </rewrite>
    </system.webServer>
</configuration>
```
