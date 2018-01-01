FROM sinet/nginx-node:6.9.1

# Install and build the application
COPY . /app
WORKDIR /app
RUN npm install
RUN npm run lint
RUN npm run test
RUN npm run build

RUN cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js

# Expose ports
EXPOSE 8080

ENV NODE_ENV=production
ARG ENV_FILE=production

COPY nginx/default.conf /etc/nginx/conf.d/

CMD ["nginx", "-g", "daemon off;"]
