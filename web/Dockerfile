FROM node:14-alpine as builder

WORKDIR /app
ENV REACT_APP_BACKEND_URL https://quizzery-api.azurewebsites.net
COPY ["package.json", "package-lock.json*", "./"]

RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]