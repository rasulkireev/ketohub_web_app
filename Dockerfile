FROM docker.io/node:8-stretch

# Install and build the application
COPY . /app
WORKDIR /app

RUN npm install \
    && cd functions && npm install && cd ../ \
    && npm run build

# Enable support for Chromium
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update \
    && apt-get install -y chromium
ENV CHROME_BIN=chromium

# Run linters and tests
RUN npm run lint \
    && npm run coverage -- --browser ChromeHeadlessCI
