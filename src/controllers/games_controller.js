import gameModel from '../models/game.js'
import fs from 'fs-extra'


import { v2 as cloudinary } from 'cloudinary'
import {v4 as uuidv4} from 'uuid'

const getAllGamesControllers = async (req, res) => {
    try{
    const games = await gameModel.getAllGamesModel()
    res.status(200).json(games)
    } catch (error) {
        console.log(error);
    }
}

const getGameControllerByID = async (req, res) => {
    const { id } = req.params
    try {
        const game = await gameModel.getGameByIdModel(id)
        const status = game.error ? 404 : 200
        res.status(status).json(game)
    } catch (error) {
        res.status(500).json(error)
    }
}

const createGameController = async (req, res) => {
    const newGameData = {
        id: uuidv4(),
        ...req.body
    }
    try {
        const cloudinaryResponse = await cloudinary.uploader.upload(req.files.imagen.tempFilePath,{folder:'games'})
        newTourData.imagen = cloudinaryResponse.secure_url
        newTourData.public_id= cloudinaryResponse.public_id
        const game = await gameModel.createTourModel(newGameData)

        await fs.unlink(req.files.imagen.tempFilePath)
        
        res.status(201).json(game)
    } catch (error) {
        res.status(500).json(error)
    }
}

const updateGameController = async (req, res) => {
    const { id } = req.params
    try {
        console.log(id);
        console.log(req.body);

        const game = await gameModel.updateGameModel(id, req.body)
        res.status(200).json(game)
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteGameController = async (req, res) => {
    const { id } = req.params
    try {

        const GamesFind = await gameModel.getGameByIdModel(id)
        cloudinary.uploader.destroy(GamesFind.public_id)

        await gameModel.deleteGameModel(id)
        res.status(200).json({ msg: "Game eliminado" })
    } catch (error) {
        res.status(500).json(error)
    }
}


export {
    getAllGamesControllers,
    getGameControllerByID,
    createGameController,
    updateGameController,
    deleteGameController,

}
