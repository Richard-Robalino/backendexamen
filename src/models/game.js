import dotenv from 'dotenv'
dotenv.config()

const gameModel = {

    async getAllGamesModel() {
        const peticion = await fetch(process.env.URL_BDD_GAMES)
        const games = await peticion.json()
        return games
    },

    async getGameByIdModel(gameId) {
        const response = await fetch(`${process.env.URL_BDD_GAMES}/${gameId}`);
        if (!response.ok) {
            return { error: "Game no encontrado" }
        }
        const data = await response.json()
        return data
    },

    async createGameModel(newGame) {
        const url = process.env.URL_BDD_GAMES
        const peticion = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(newGame),
            headers: { 'Content-Type': 'application/json' }
        })
        const data = await peticion.json()
        return data
    },

    async updateGameModel(gameId, updateGameModel) {
        const url = `${process.env.URL_BDD_GAMES}/${gameId}`
        const peticion = await fetch(url, {
            method: "PUT",
            body: JSON.stringify(updateGameModel),
            headers: { 'Content-Type': "application/json" }
        })
        const data = await peticion.json()
        return data
    },

    async deleteGameModel(gameId) {
        const url = `${process.env.URL_BDD_GAMES}/${gameId}`
        const peticion = await fetch(url, {
            method: "DELETE"
        })
        const data = await peticion.json()     
        return data
    },
}

export default gameModel
