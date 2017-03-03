import datetime
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from database_models import Base, Category, User, Photo

engine = create_engine('sqlite:///photocatalogue.db')

DBSession = sessionmaker(bind=engine)

session = DBSession()

# set up categories:
categories = ['Animals', 'Black and White', 'Landscape', 'People', 'Food']


for category in categories:
    newCategory = Category(name=category)
    session.add(newCategory)
    session.commit()


# set up users:
newUser1 = User(name="Courtney", email="courtney@test.com")
session.add(newUser1)
session.commit()

newUser2 = User(name="Cayleigh", email="cayleigh@test.com")
session.add(newUser2)
session.commit()

# set up photos
photo1 = Photo(description="two giraffe heads in the sky",
               category_id=1,
               picture="https://static.pexels.com/photos/34482/giraffe-animals-zoo-funny.jpg",
               date_created=datetime.datetime.now(),
               user_id=1)
session.add(photo1)

photo2 = Photo(description="pug life",
               category_id=1,
               picture="https://static.pexels.com/photos/30116/pexels-photo-30116.jpg",
               date_created=datetime.datetime.now(),
               user_id=2)
session.add(photo2)

photo3 = Photo(description="sea turtle",
               category_id=1,
               picture="https://static.pexels.com/photos/27631/pexels-photo-27631.jpg",
               date_created=datetime.datetime.now(),
               user_id=1)
session.add(photo3)

photo4 = Photo(description="flamingos in love",
               category_id=1,
               picture="https://static.pexels.com/photos/39627/flamingo-valentine-heart-valentine-s-day-39627.jpeg",
               date_created=datetime.datetime.now(),
               user_id=2)
session.add(photo4)

photo5 = Photo(description="foxy lady",
               category_id=1,
               picture="https://static.pexels.com/photos/158340/fuchs-wild-animal-predator-animal-world-158340.jpeg",
               date_created=datetime.datetime.now(),
               user_id=1)
session.add(photo5)

photo6 = Photo(description="smoke rising",
               category_id=2,
               picture="https://static.pexels.com/photos/37727/pexels-photo-37727.png",
               date_created=datetime.datetime.now(),
               user_id=2)
session.add(photo6)

photo7 = Photo(description="connected",
               category_id=2,
               picture="https://static.pexels.com/photos/265702/pexels-photo-265702.jpeg",
               date_created=datetime.datetime.now(),
               user_id=1)
session.add(photo7)

photo8 = Photo(description="piano keys",
               category_id=2,
               picture="https://static.pexels.com/photos/164935/pexels-photo-164935.jpeg",
               date_created=datetime.datetime.now(),
               user_id=2)
session.add(photo8)

photo9 = Photo(description="scenic rice paddy",
               category_id=3,
               picture="https://static.pexels.com/photos/247599/pexels-photo-247599.jpeg",
               date_created=datetime.datetime.now(),
               user_id=1)
session.add(photo9)

photo10 = Photo(description="aurora borealis",
               category_id=3,
               picture="https://static.pexels.com/photos/6657/snow-landscape-nature-sky.jpeg",
               date_created=datetime.datetime.now(),
               user_id=1)
session.add(photo10)

photo11 = Photo(description="girl with piercings and tattoos",
               category_id=4,
               picture="https://static.pexels.com/photos/94589/pexels-photo-94589.jpeg",
               date_created=datetime.datetime.now(),
               user_id=1)
session.add(photo11)

photo12 = Photo(description="steamed clams",
               category_id=5,
               picture="https://static.pexels.com/photos/24565/pexels-photo-24565.jpg",
               date_created=datetime.datetime.now(),
               user_id=1)
session.add(photo12)

session.commit()
