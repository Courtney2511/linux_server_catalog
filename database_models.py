import sys
from datetime import datetime, timedelta
from sqlalchemy import Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine

Base = declarative_base()


class Category(Base):
    __tablename__ = 'category'
    id = Column(Integer, primary_key=True)
    name = Column(String(80), nullable=False)


class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    name = Column(String(30), nullable=False)
    email = Column(String(100), nullable=False)

class Photo(Base):
    __tablename__ = 'item'
    id = Column(Integer, primary_key=True)
    description = Column(String(250))
    category_id = Column(Integer, ForeignKey('category.id'))
    category = relationship(Category)
    picture = Column(String(100))
    date_created = Column(DateTime, default=datetime.utcnow)
    user_id = Column(Integer, ForeignKey('user.id'))
    user = relationship(User)


engine = create_engine('sqlite:///photocatalogue.db')

Base.metadata.create_all(engine)
