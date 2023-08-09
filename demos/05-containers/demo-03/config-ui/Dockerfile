##### Stage 1 - Create the build-image
FROM node:16-alpine as build
LABEL author="Alexander Pajer"

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

##### Stage 2 - Create the run-time-image
FROM nginx:alpine
VOLUME /var/cache/nginx

# Take output from node build
COPY --from=build /app/dist/config-ui/ /usr/share/nginx/html
# Add nginx url rewriteconfig
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
# Substitute environment vars
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]

# docker build --rm -f Dockerfile -t config-ui .
# docker run -d --rm -p 5052:80 --env ENV_API_URL="https://localhost:5001" config-ui

# browse using http://localhost:5052/

# Publish Image to dockerhub
# docker tag config-ui arambazamba/config-ui
# docker push arambazamba/config-ui
