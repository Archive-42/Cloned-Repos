from sqlalchemy.orm import relationship
from .db import db


class Move(db.Model):
    __tablename__ = 'moves'

    id = db.Column(db.Integer, primary_key=True)
    game_id = db.Column(db.ForeignKey('games.id'))
    game = relationship('Game', back_populates='moves')
    column = db.Column(db.Integer)
    player_id = db.Column(db.String(40))

    def to_dict(self):
        return {
            "id": self.id,
            "game": self.game_id,
            "playerId": self.player_id,
            "column": self.column
        }
