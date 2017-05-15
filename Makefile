API_SERVER=https://photobombapp.herokuapp.com/api
export API_SERVER

.PHONY: build start clean

clean:
	rm -rf public
	./pyclean.sh

build: clean
	 cd $(shell pwd)/react-app && npm run build

start-dev: build
	python photobomb.py

build-production: clean
	cd $(shell pwd)/react-app && npm run build
