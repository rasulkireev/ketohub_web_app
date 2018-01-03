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

# Run linter, scss formatter, and tests
RUN npm run lint \
    && ./node_modules/@angular/cli/bin/ng test --browser ChromeHeadlessCI --no-watch --code-coverage --single-run=true
