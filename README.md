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
