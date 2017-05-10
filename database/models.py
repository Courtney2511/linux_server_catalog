from datetime import datetime
from sqlalchemy import Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship
from database import Base


class Category(Base):
    __tablename__ = 'category'
    id = Column(Integer, primary_key=True)
    name = Column(String(80), nullable=False)
    photos = relationship("Photo", back_populates="category")

    def __init__(self, name=None):
        self.name = name

    def __repr__(self):
        return '<Category %r>' % (self.name)

    @property
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'photo_count': len(self.photos),
        }


class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    username = Column(String(30), nullable=False)
    email = Column(String(100), nullable=False)
    password = Column(String(100), nullable=True)

    def __init__(self, username=None, email=None, password=None):
        self.username = username
        self.email = email
        self.password = password

    def __repr__(self):
        return '<User %r>' % (self.username)

    @property
    def serialize(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'password': self.password
        }


class Photo(Base):
    __tablename__ = 'photo'
    id = Column(Integer, primary_key=True)
    name = Column(String(80), nullable=False)
    description = Column(String(250))
    category_id = Column(Integer, ForeignKey('category.id'), nullable=False)
    category = relationship("Category", back_populates="photos")
    picture = Column(String(500), nullable=False)
    date_created = Column(DateTime, default=datetime.utcnow)
    user_id = Column(Integer, ForeignKey('user.id'), nullable=False)
    user = relationship(User)

    def __init__(self, name=None, description=None, category_id=None,
                 picture=None, user_id=None):
        self.name = name
        self.description = description
        self.category_id = category_id
        self.picture = picture
        self.user_id = user_id

    def __repr__(self):
        return '<Photo %r>' % self.name

    @property
    def serialize(self):
        "Return object data in serializable format"
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'category': self.category.serialize,
            'picture': self.picture,
            'date_created': float(self.date_created.strftime("%s")),
            'user': self.user.serialize,
        }
