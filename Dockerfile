FROM sinet/nginx-node:6.9.1

# Install and build the application
COPY . /app
WORKDIR /app
RUN npm install \
    && ./node_modules/@angular/cli/bin/ng build --prod --aot --environment=prod

# Expose ports
EXPOSE 8080

ENV NODE_ENV=production
ARG ENV_FILE=production

COPY nginx/default.conf /etc/nginx/conf.d/

CMD ["nginx", "-g", "daemon off;"]
