export const createGame = async (player1) => {
    const res = await fetch("/api/games", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ player1: player1 }),
    });
    if (res.ok) {
        //res coming in as {'game': game.id}
        return await res.json();
    } else {
        console.log(res.error);
    }
};
export const addPlayer = async (gameId, player2) => {
    const res = await fetch(`/api/games/${gameId}/player`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ player2: player2 }),
    });
    if (res.ok) {
        //res coming in as {'game': game.id}
        return await res.json();
    } else {
        console.log(res.error);
    }
};

export const getGame = async (gameId) => {
    const res = await fetch(`/api/games/${gameId}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    // res coming in as {'game': game object}
    return res.ok ? await res.json() : console.log(res.error);
};

export const makeMove = async (gameId, playerId, column) => {
    // TODO
    const res = await fetch(`/api/games/${gameId}/player/${playerId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ column: column }),
    });

    return res.ok ? await res.json() : console.log(res.error);
};
