##### Stage 1 - Create the build-image -> SDK, more vulnerabel, größer
FROM node:14 as node
LABEL author="Alexander Pajer"
WORKDIR /app
COPY package.json package.json
RUN npm install
COPY . .
RUN npm run build -- --prod

##### Stage 2 - Create the run-time-image  -> kein SDK, less vulnerabel (less tool), klein
FROM nginx:alpine
VOLUME /var/cache/nginx

# Take from node-build
COPY --from=node /app/dist/food-ui /usr/share/nginx/html 
# Take from project folder
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf

# docker build --rm -f "dockerfile" -t foodui .
# docker run -d --rm -p 5052:80 foodui
# http://localhost:5052/

# Publish Image to dockerhub
# docker tag foodui arambazamba/foodui
# docker push arambazamba/foodui