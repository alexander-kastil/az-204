##### Stage 1 - Create the build-image
FROM node:18 as node
LABEL author="Alexander Pajer"
WORKDIR /app
COPY package.json package.json
RUN npm install
COPY . .
RUN npm run build -- -c production

##### Stage 2 - Create the run-time-image
FROM nginx:alpine
VOLUME /var/cache/nginx
# Copy from build-image to nginx base folder
COPY --from=node /app/dist/food-orders-dashboard /usr/share/nginx/html
# Copy nginx config
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
# Set environment variables
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]

# docker build --rm -f Dockerfile -t food-orders-dashboard .
# docker run -d --rm -p 5052:80 --env ENV_FUNC_EP="https://foodorders-7714.azurewebsites.net/api" food-orders-dashboard

# to check the env var attach shell and execute: echo ${ENV_API_URL}
# browse using http://localhost:5052/

# Publish Image to dockerhub
# docker tag food-orders-dashboard arambazamba/food-orders-dashboard
# docker push arambazamba/food-orders-dashboard
