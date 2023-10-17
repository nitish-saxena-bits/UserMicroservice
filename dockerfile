FROM node:18-alpine

WORKDIR /app

COPY . .

# install dependencies
RUN yarn install --production 

#command
CMD ["node", "index.js"]

#  port from container
EXPOSE 8089