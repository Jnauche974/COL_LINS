# Loopback App BAse Image
#Install Loopback
FROM node:latest
WORKDIR /BackEnd
COPY package.json /BackEnd/
RUN npm install
COPY . /BackEnd
EXPOSE 8080
CMD [ "npm", "start" ]
