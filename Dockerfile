FROM node:latest

WORKDIR /home/ubuntu/ChefBot

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
CMD [ 'node', '.' ]