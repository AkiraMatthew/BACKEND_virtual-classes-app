import { Category } from "../models";

export const categoryService = {
    findAllPaginated: async (page: number,perPage: number) => {
        const offset = (page - 1) * perPage
        
        const { count, rows } = await Category.findAndCountAll({ //You can use the findAll propertiers to specify the behavior of the query response received in the frontend
            attributes: ['id', 'name', 'position'],
            order: [['position', 'ASC']],
            limit: perPage,
            offset
        });

        return ({ 
            categories: rows,
            page: page,
            perPage: perPage,
            total: count
         })
    },
    
}