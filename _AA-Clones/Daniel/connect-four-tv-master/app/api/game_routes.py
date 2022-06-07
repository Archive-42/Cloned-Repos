from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Game, Move

game_routes = Blueprint('game', __name__)


@game_routes.route('', methods=["POST"])
def create_game():
  game = Game()
  player1 = request.get_json().get('player1')
  game.player1 = player1
  db.session.add(game)
  db.session.commit()
  return {"game": game.id}

@game_routes.route('/<game_id>/player', methods=["POST"])
def add_player_to_game(game_id):
  game = Game.query.filter_by(id=game_id).first()
  player2 = request.get_json().get('player2')
  game.player2 = player2
  db.session.add(game)
  db.session.commit()
  return {"game": game.id}

@game_routes.route('/<game_id>')
def game(game_id):
  game = Game.query.filter_by(id=game_id).first()
  return {"game": game.to_dict()}


@game_routes.route('/<game_id>/player/<player_id>/move', methods=["POST"])
def make_move(game_id, player_id):
  game = Game.query.filter_by(id=game_id).first()
  moves = game.moves
  column_id = request.get_json().get('column')
  if moves:
    latest_move = list(moves)[-1]
    if latest_move.player_id != player_id:
      if not game.column_exists(column_id):
        return {"error": f"Column {column_id} doesn't exists, {player_id}"}
      if game.column_has_room(column_id):
        move = Move()
        move.game = game
        move.player_id = player_id
        move.column = column_id
        db.session.add(move)
        db.session.commit()
      else:
        return {"error": f"Column {column_id} is full {player_id}"}
    else:
      return {"error": f"It's not your move {player_id}"}
  else:
    if player_id == game.player1:
      move = Move()
      move.game = game
      move.player_id = player_id
      move.column = request.get_json().get('column')
      db.session.add(move)
      db.session.commit()
    else:
      return {"error": f"It's not your move {player_id}"}
  return {"success": True}
