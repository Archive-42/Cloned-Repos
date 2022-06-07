import React, { useState } from "react";
import { createGame } from "../services/gameApi";

function NewGameForm(props) {
    const [player1, setPlayer1] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        async function submitForm() {
            let { game } = await createGame(player1);
            props.setCurrentGameAndPlayer(game, player1);
            props.setPlayer1(player1);
        }
        submitForm();
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="player1">Player 1 Username</label>
            <input
                type="text"
                name="player1"
                value={player1}
                onChange={(e) => setPlayer1(e.target.value)}
            />
            <input type="submit" name="Begin Game" />
        </form>
    );
}

export default NewGameForm;
