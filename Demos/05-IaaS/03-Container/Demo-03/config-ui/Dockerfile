##### Stage 1 - Create the build-image 
FROM node:14 as node
LABEL author="Alexander Pajer"
WORKDIR /app
COPY package.json package.json
RUN npm install
COPY . .
RUN npm run build -- -c production

##### Stage 2 - Create the run-time-image 
FROM nginx:alpine
VOLUME /var/cache/nginx

# Take from node-build
COPY --from=node /app/dist/config-ui /usr/share/nginx/html
# Take from project folder
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]

# docker build --rm -f Dockerfile -t config-ui .
# docker run -d --rm -p 5052:80 --env ENV_API_URL="https://food-api-staging-4591.azurewebsites.net" config-ui 
# attach shell and execute: echo ${ENV_API_URL}
# browse using http://localhost:5052/

# Publish Image to dockerhub
# docker tag config-ui arambazamba/config-ui
# docker push arambazamba/config-ui