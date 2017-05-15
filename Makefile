.PHONY: build start clean

clean:
	rm -rf public
	./pyclean.sh

build: clean
	 cd $(shell pwd)/react-app && npm run build

start: build
	python photobomb.py
