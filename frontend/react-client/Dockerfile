FROM node:24.0.2-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=/reguanapi

ARG REACT_APP_IMAGES_URL
ENV REACT_APP_IMAGES_URL=https://s3.yandexcloud.net/reguard-busket

RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]