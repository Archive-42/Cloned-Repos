from app import app
with app.app_context():
    from app.models import db
    db.drop_all()
    db.create_all()
