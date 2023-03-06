import { Request, Response } from "express";
import { getPaginationParams } from "../helpers/getPaginationParams";
import { categoryService } from "../services/categoryService";

export const categoriesController = {
    index: async (req: Request, res: Response) => {
        const [ page, perPage ] = getPaginationParams(req.query)

        try {
            const paginatedCategories = await categoryService.findAllPaginated(perPage, page)
            
            //throw new Error('database connection error')
            return res.json(paginatedCategories)
        } catch (error) {
            if(error instanceof Error){
                return res.status(400).json({ message: error.message })
            }
        }
    }
}



//this is how the code was before refatoring it with the services and the helpers folder
/*import { Request, Response } from "express";
import { Category } from "../models";

export const categoriesController = {
    index: async (req: Request, res: Response) => {
        const { page, perPage } = req.query;

        const perPageNumber = typeof perPage === 'string' && parseInt(perPage, 10) > 0
            ? parseInt(perPage, 10)
            : 10
  
        const pageNumber = typeof page === 'string' && parseInt(page, 10) > 0
            ? parseInt(page, 10)
            : 1
  
        const offset = (pageNumber - 1) * perPageNumber

        try {
            const { count, rows } = await Category.findAndCountAll({ //You can use the findAll propertiers to specify the behavior of the query response received in the frontend
                attributes: ['id', 'name', 'position'],
                order: [['position', 'ASC']],
                limit: perPageNumber,
                offset
            });
            
            //throw new Error('database connection error')
            return res.json( { 
                categories: rows,
                page: pageNumber,
                perPage: perPageNumber,
                total: count
             } )
        } catch (error) {
            if(error instanceof Error){
                return res.status(400).json({ message: error.message })
            }
        }
    }
}*/