# Photobomb (Item Catalog Project)

## About

Photo sharing application that allows users to share photos in a variety of categories.

## Contents

1. backend
  * contains the backend python server and database

2. frontend
  * contains the frontend React/Redux application

## How to run the application:

Ensure Python 2.7 is installed

```
$ python -v
```

Clone the repo into your terminal

```
$ git clone https://github.com/Courtney2511/item_catalogue.git
```

Navigate to the 
# Photobomb

API:

### PHOTOS

  */photos*

  •  GET:
      * returns a list of all photos

  * success response:
      * code: 200
      ```json
      "photos": [
    {
      "category": {
        "id": 1,
        "name": "Animals",
        "photo_count": 5
      },
      "date_created": 1489091422,
      "description": "This is my awesome photo.   It is not the only photo, but it is my favourite... well except for that other one, but it is nsfw",
      "id": 1,
      "name": "two giraffe heads in the sky",
      "picture": "https://static.pexels.com/photos/34482/giraffe-animals-zoo-funny.jpg",
      "user": {
        "email": "courtney@test.com",
        "id": 1,
        "username": "Courtney"
      }
    } ]```

  • POST:

    • Data params:

    ```json
    {
      "name": "friends",
      "description": "sunset antics",
      "category": "People",
      "url": "https://static.pexels.com/photos/53364/girls-women-happy-sexy-53364.jpeg",
      "userId": "1"
    } ```
