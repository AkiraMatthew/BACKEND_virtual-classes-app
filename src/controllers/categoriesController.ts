import { Request, Response } from "express";
import { Category } from "../models";

export const categoriesController = {
    index: async (req: Request, res: Response) => {
        try {
                const categories = await Category.findAll({ //You can use the findAll propertiers to specify the behavior of the query response received in the frontend
                attributes: ['id', 'name', 'position'],
                order: [['position', 'ASC']]
            });
            
            //throw new Error('database connection error')
            return res.json(categories)
        } catch (error) {
            if(error instanceof Error){
                return res.status(400).json({ message: error.message })
            }
        }
    }
}