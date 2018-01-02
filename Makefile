NAME = ketohub_web_app
SHA1 = $(shell git rev-parse HEAD)
TOKEN = sW8jrLD4FxUSVEPdCr2l2IWXNvL4rRyJdX1UvNF+lUqcWrerQPDJaVNXBMVWxtU5fKB9+2b7Gl4jnC4OjEtt8NkJeeBLh6+YZy/JW+mMkiFJVWWzx3DuJNJtBnoDJsyovADahVbZRxZPY4wGPsnmfY56wHmB061wy/h48ws1pE9jelZW0vzgqyabw3SNT+mK40wbJSHL1R3ik6DFON67ubuclOMdIw19q/Dyx1ItjioXYXJgC11F2c6Y2pU3sFBU/6xzLF/xevPS146hGriaDBuERl0OP6RfPMZx2N9ZVyVGIuiNicknEWM0WsHe7Ia53il7YbTnJXu+my4k1XFlN/0DxTlZkLb2dhh2n3dEHmUhcW0KxjOjx3ypcx0CevsJJgJ1EfZglHPr+MUM++SST0PkHStD0kbzv/ReKdbLFJRDeZirtM6txmx7aIrTf8av7jSHfItJ0C/9vK8+Xiea4uucSS8QDmR6qtq6xWkx2D1XT7mqjIZHcP0CIujMMb6H6Ga46FCFVMK7ycImjr3JkpBie8AwBr49upjhBnyaSiZvu9TZCJsOU4X1mmAfWC6BnXhllQcDXX/uJAsz173C0Mgvng+5NaYiG7YuxWX3Tj5aS6mVifqiFRzfZyflAP40js8tjKmuiFvdXw21nTdYktLilwgw3gqO5SAP3e6iQBc=

.PHONY: build coverage deploy

all: build

build:
	docker build -t $(NAME):$(SHA1) -f Dockerfile .

coverage:
	docker run --name ketohub-container $(NAME):$(SHA1) echo "Container created"
	docker cp ketohub-container:/app/coverage/ ./coverage/
	cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js

deploy:
	docker run --name ketohub-container $(NAME):$(SHA1) echo "Container created"
	docker cp ketohub-container:/app/dist ./dist
	npm install -g firebase-tools
	firebase deploy --token=$(TOKEN) --non-interactive
