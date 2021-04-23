FROM node:latest
RUN npm install -g serve
ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]

RUN npm install
COPY . .
ENV PORT 8080
EXPOSE 8080
CMD ["serve", "-s", "build", "-l", "8080"]
