import { Request, Response } from "express";
import { notesAll } from "../service/notes.service";

export const getNotes = async (req: Request, res: Response) => {
    const data = await notesAll()
    res.status(200).json({
        message: 'notes data',
        data
    })
}

export const getNote = async (req: Request, res: Response) => {
    const id = req.params.id

    const data = await 
}