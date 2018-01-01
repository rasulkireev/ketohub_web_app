FROM docker.io/node:8-stretch

# Install and build the application
COPY . /app
WORKDIR /app
RUN npm install \
    && ./node_modules/@angular/cli/bin/ng build --prod --aot

# Enable support for Chromium
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update \
    && apt-get install -y chromium
ENV CHROME_BIN=chromium

# Run linter, scss formatter, and tests
RUN ./node_modules/@angular/cli/bin/ng lint \
    && ./node_modules/scssfmt/cli.js  --recursive 'src/**/**/*.scss' --diff \
    && ./node_modules/@angular/cli/bin/ng test --browser ChromeHeadlessCI --no-watch --code-coverage --single-run=true

# Report code coverage via Coveralls
RUN cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js

# Expose ports
EXPOSE 8080

# Set environment for production
ENV NODE_ENV=production
ARG ENV_FILE=production

COPY nginx/default.conf /etc/nginx/conf.d/

CMD ["nginx", "-g", "daemon off;"]
