from sqlalchemy.orm import relationship
from .db import db

NUM_COLUMNS = 4
COLUMN_HEIGHT = 5


class Game(db.Model):
    __tablename__ = 'games'

    id = db.Column(db.Integer, primary_key=True)
    player1 = db.Column(db.String(40))
    player2 = db.Column(db.String(40))
    moves = relationship('Move', back_populates='game',
                         order_by='asc(Move.id)')

    def board(self, ):
        column_height = [0]*NUM_COLUMNS
        board = [[None]*COLUMN_HEIGHT for i in range(0, NUM_COLUMNS)]
        for move in self.moves:
            board[move.column][column_height[move.column]] = move.player_id
            column_height[move.column] += 1
        return board

    def column_exists(self, column_id):
        if column_id < 0 or column_id > NUM_COLUMNS:
            return False
        return True

    def column_has_room(self, column_id):
        column_count = [
            move for move in self.moves if move.column == column_id]
        return len(column_count) < COLUMN_HEIGHT

    def to_dict(self):
        return {
            "id": self.id,
            "player1": self.player1,
            "player2": self.player2,
            "board": self.board()
        }
