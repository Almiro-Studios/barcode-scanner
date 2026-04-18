# Use a node base image
FROM node:18-alpine as builder

ARG GH_TOKEN
ENV GH_TOKEN=$GH_TOKEN

# Set the working directory
WORKDIR /app

# Copy the source code to the container
COPY package.json .

RUN npm install -g npm@latest

# Install the node dependencies
RUN npm i --ignore-scripts

# Use a node base image
FROM node:18-alpine as runner

WORKDIR /app

COPY --from=builder /app/package.json package.json
COPY --from=builder /app/node_modules node_modules
COPY src src
COPY public public

CMD ["npm", "run", "start"]