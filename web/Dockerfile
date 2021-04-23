FROM node:latest

ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]

RUN npm install
COPY . .
RUN npm run build
ENV PORT 8080
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
