FROM docker.io/node:8-stretch

# Enable support for Chromium
ARG DEBIAN_FRONTEND=noninteractive
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add - && \
    echo 'deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main' | sudo tee /etc/apt/sources.list.d/google-chrome.list \
    apt-get update \
    && apt-get install -y google-chrome-stable
ENV CHROME_BIN=chromium

# Install protractor and dependencies.
RUN apt-get install -y openjdk-8-jdk libgconf-2-4 \
    && apt-cache search jdk \
    && export JAVA_HOME=/usr/lib/jvm/java-8-openjdk \
    && export PATH=$PATH:/usr/lib/jvm/java-8-openjdk/bin \
    && npm install -g protractor@5.3.1 \
    && webdriver-manager update

WORKDIR /app
