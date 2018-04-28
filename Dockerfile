FROM node:8-stretch

# Enable support for Chrome
ARG DEBIAN_FRONTEND=noninteractive
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
    apt-get update && \
    apt install ./google-chrome-stable_current_amd64.deb -y

# Install protractor and dependencies.
RUN apt-get install -y openjdk-8-jdk libgconf-2-4 \
    && apt-cache search jdk \
    && export JAVA_HOME=/usr/lib/jvm/java-8-openjdk \
    && export PATH=$PATH:/usr/lib/jvm/java-8-openjdk/bin \
    && npm install -g protractor@5.3.1 \
    && webdriver-manager update

WORKDIR /app
