FROM node:16.3.0
WORKDIR /app
ADD package*.json ./
RUN npm install
RUN npm install pm2 -g
COPY . .
EXPOSE 3000
CMD [ "pm2-runtime", "src/index.js", "-i", "max"]