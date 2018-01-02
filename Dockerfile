FROM docker.io/node:8-stretch

# Enable support for Chromium
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update \
    && apt-get install -y chromium
ENV CHROME_BIN=chromium

# Install and build the application
COPY . /app
WORKDIR /app
RUN npm install \
    && cd functions && npm install && cd ../ \
    && ./node_modules/@angular/cli/bin/ng build --prod --aot \
    && ./node_modules/scssfmt/cli.js  --recursive 'src/**/**/*.scss' --diff \
    && ./node_modules/@angular/cli/bin/ng test --browser ChromeHeadlessCI --no-watch --code-coverage --single-run=true

# Deploy application if on master branch
ARG BRANCH
ARG FIREBASE_TOKEN
RUN if $BRANCH -eq "master"; then npm install -g firebase-tools && firebase deploy --token=$FIREBASE_TOKEN --non-interactive

# Expose ports
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
