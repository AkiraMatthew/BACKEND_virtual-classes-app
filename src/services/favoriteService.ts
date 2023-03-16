import { Favorite } from "../models"

export const favoriteService = {
    findByUserId:async (userId: number) => {
        const favorites = Favorite.findAll({
            where: { userId: userId },
            include: {
                association: 'Course'
            }
        });

        return favorites
    },
    create:async (userId: number, courseId: number) => {
        const favorite = Favorite.create({
            userId,
            courseId
        });

        return favorite
    }
}