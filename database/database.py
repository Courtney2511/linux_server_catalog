import os

from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base

database_uri = os.getenv("DATABASE_URL", 'postgresql://courtney:password@localhost/photobomb')

engine = create_engine(database_uri)
db_session = scoped_session(sessionmaker(bind=engine))

Base = declarative_base()
Base.query = db_session.query_property()


def drop_db():
    import models
    Base.metadata.drop_all(bind=engine)


def create_db():
    import models
    Base.metadata.create_all(bind=engine)
