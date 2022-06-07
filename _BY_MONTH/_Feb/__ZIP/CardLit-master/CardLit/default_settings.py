import os
from sqlalchemy import create_engine, orm

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
db = create_engine('sqlite:///' + BASE_DIR + '/app1.db')
sm = orm.sessionmaker(bind=db, autocommit=True, autoflush=True, expire_on_commit=True)
session = orm.scoped_session(sm)
