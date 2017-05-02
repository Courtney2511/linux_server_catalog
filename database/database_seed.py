from database.models import Category, User, Photo
from database import create_db, db_session, drop_db

drop_db()

create_db()

# set up categories:
categories = ['Animals', 'Black and White', 'Landscape', 'People', 'Food']


for category in categories:
    newCategory = Category(name=category)
    db_session.add(newCategory)
    db_session.commit()


# set up users:
newUser1 = User(username="Courtney",
                email="courtney@test.com",
                password="password")
db_session.add(newUser1)
db_session.commit()

newUser2 = User(username="Cayleigh",
                email="cayleigh@test.com",
                password="password")
db_session.add(newUser2)
db_session.commit()

# set up photos
photo1 = Photo(name="two giraffe heads in the sky",
               description=""""
                This is my awesome photo.   It is not the only photo, but it
                is my favourite... well except for that other one, but it is
                nsfw
                """,
               category_id=1,
               picture="""https://static.pexels.com/photos/34482/giraffe-animals-zoo-funny.jpg""",
               user_id=1)
db_session.add(photo1)

photo2 = Photo(name="pug life",
                description="This is my awesome photo.   It is not the only photo, but it is my favourite... well except for that other one, but it is nsfw",
               category_id=1,
               picture="https://static.pexels.com/photos/30116/pexels-photo-30116.jpg",
               user_id=2)
db_session.add(photo2)

photo3 = Photo(name="sea turtle",
                description="This is my awesome photo.   It is not the only photo, but it is my favourite... well except for that other one, but it is nsfw",
               category_id=1,
               picture="https://static.pexels.com/photos/27631/pexels-photo-27631.jpg",
               user_id=1)
db_session.add(photo3)

photo4 = Photo(name="flamingos in love",
               category_id=1,
               picture="https://static.pexels.com/photos/39627/flamingo-valentine-heart-valentine-s-day-39627.jpeg",
               user_id=2)
db_session.add(photo4)

photo5 = Photo(name="foxy lady",
               description="This is my awesome photo.   It is not the only photo, but it is my favourite... well except for that other one, but it is nsfw",
               category_id=1,
               picture="https://static.pexels.com/photos/158340/fuchs-wild-animal-predator-animal-world-158340.jpeg",
               user_id=1)
db_session.add(photo5)

photo6 = Photo(name="smoke rising",
               description="This is my awesome photo.   It is not the only photo, but it is my favourite... well except for that other one, but it is nsfw",
               category_id=2,
               picture="https://static.pexels.com/photos/37727/pexels-photo-37727.png",
               user_id=2)
db_session.add(photo6)

photo7 = Photo(name="connected",
               description="This is my awesome photo.   It is not the only photo, but it is my favourite... well except for that other one, but it is nsfw",
               category_id=2,
               picture="https://static.pexels.com/photos/265702/pexels-photo-265702.jpeg",
               user_id=1)
db_session.add(photo7)

photo8 = Photo(name="piano keys",
               description="This is my awesome photo.   It is not the only photo, but it is my favourite... well except for that other one, but it is nsfw",
               category_id=2,
               picture="https://static.pexels.com/photos/164935/pexels-photo-164935.jpeg",
               user_id=2)
db_session.add(photo8)

photo9 = Photo(name="scenic rice paddy",
               description="This is my awesome photo.   It is not the only photo, but it is my favourite... well except for that other one, but it is nsfw",
               category_id=3,
               picture="https://static.pexels.com/photos/247599/pexels-photo-247599.jpeg",
               user_id=1)
db_session.add(photo9)

photo10 = Photo(name="aurora borealis",
               description="This is my awesome photo.   It is not the only photo, but it is my favourite... well except for that other one, but it is nsfw",
               category_id=3,
               picture="https://static.pexels.com/photos/6657/snow-landscape-nature-sky.jpeg",
               user_id=1)
db_session.add(photo10)

photo11 = Photo(name="girl with piercings and tattoos",
               description="This is my awesome photo.   It is not the only photo, but it is my favourite... well except for that other one, but it is nsfw",
               category_id=4,
               picture="https://static.pexels.com/photos/94589/pexels-photo-94589.jpeg",
               user_id=1)
db_session.add(photo11)

photo12 = Photo(name="steamed clams",
               description="This is my awesome photo.   It is not the only photo, but it is my favourite... well except for that other one, but it is nsfw",
               category_id=5,
               picture="https://static.pexels.com/photos/24565/pexels-photo-24565.jpg",
               user_id=1)
db_session.add(photo12)

db_session.commit()
