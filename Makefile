NAME = ketohub_web_app

.PHONY: build test

all: build

build:
	docker build -t $(NAME):latest -f Dockerfile.prod .

test:
	docker build -t $(NAME)_test:latest -f Dockerfile.test .
	docker run --rm $(NAME)_test:latest
