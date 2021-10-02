FROM node:14.10.0
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json ./

RUN npm ci
# Copy app source code
COPY . .

#Expose port and start application
EXPOSE 5000
EXPOSE 80
CMD [ "npm", "start" ]