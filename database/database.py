from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base

engine = create_engine('postgresql://courtney:password@localhost/photobomb')
db_session = scoped_session(sessionmaker(bind=engine))

Base = declarative_base()
Base.query = db_session.query_property()


def drop_db():
    import database.models
    Base.metadata.drop_all(bind=engine)


def create_db():
    import database.models
    Base.metadata.create_all(bind=engine)
