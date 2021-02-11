##### Stage 1 - Create the build-image 
FROM node:12.10 as node
LABEL author="Alexander Pajer"
WORKDIR /app
COPY package.json package.json
RUN npm install
COPY . .
RUN npm run build -- --prod

##### Stage 2 - Create the run-time-image 
FROM nginx:alpine
VOLUME /var/cache/nginx

# Take from node-build
COPY --from=node /app/dist/FoodUI /usr/share/nginx/html
# Take from project folder
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf

# docker build --rm -f "Dockerfile" -t foodui .
# docker run -d --rm -p 8086:80 foodui

# Publish Image to dockerhub
# docker tag foodui arambazamba/foodui
# docker push arambazamba/foodui