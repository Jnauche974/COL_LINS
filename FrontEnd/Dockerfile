# specify the node base image with your desired version node:<version>
FROM mhart/alpine-node:8
#Add the current directory in the image
ADD . /FrontEnd
# set the working directory to the image
WORKDIR /FrontEnd
# execute command npm install
RUN npm install
# replace this with your application's default port
EXPOSE 8080

CMD [ "npm run serve" ]