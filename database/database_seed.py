from models import Category, User, Photo
from database import create_db, db_session, drop_db
import random
import string
import hashlib


drop_db()

create_db()


def make_salt():
    """ returns a random 5 letter salt """
    return ''.join(random.choice(string.letters) for x in xrange(5))


# hashes a users password
def make_pw_hash(name, password, salt=None):
    """ returns a hash of a users password with a salt """
    if not salt:
        salt = make_salt()
    pw_hash = hashlib.sha256(name + password + salt).hexdigest()
    return '%s,%s' % (pw_hash, salt)


# set up categories:
categories = ['Animals', 'Black and White', 'Landscape', 'People', 'Food']


for category in categories:
    newCategory = Category(name=category)
    db_session.add(newCategory)
    db_session.commit()


# set up users:
username1 = "Courtney"
password1 = "password"
hashed1 = make_pw_hash(username1, password1)

newUser1 = User(username=username1,
                email="courtney@test.com",
                password=hashed1)
db_session.add(newUser1)
db_session.commit()

username2 = "Cayleigh"
password2 = "password"
hashed2 = make_pw_hash(username2, password2)

newUser2 = User(username=username2,
                email="cayleigh@test.com",
                password=hashed2)
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
