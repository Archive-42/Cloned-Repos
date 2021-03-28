import React, { useState } from "react";
import { addPlayer } from "../services/gameApi";

export default function JoinGameForm(props) {
    const [player2, setPlayer2] = useState("");
    const [gameId, setGameId] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        async function submitForm() {
            let { game } = await addPlayer(gameId, player2);
            props.setCurrentGameAndPlayer(game, player2);
            props.setPlayer2(player2);
        }
        submitForm();
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="player1">Player 2 Username</label>
            <input
                type="text"
                name="player1"
                value={player2}
                onChange={(e) => setPlayer2(e.target.value)}
            />
            <label htmlFor="player1">Game Id</label>
            <input
                type="number"
                name="gameId"
                value={gameId}
                onChange={(e) => setGameId(e.target.value)}
            />
            <input type="submit" name="Begin Game" />
        </form>
    );
}
