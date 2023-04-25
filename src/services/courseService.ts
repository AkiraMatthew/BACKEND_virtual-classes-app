import { Op } from 'sequelize';
import { Course } from '../models';

export const courseService = {
    findByIdWithEpisodes: async (id: string) => {
        const courseWithEpisodes = await Course.findByPk(id, {
            attributes: [
                'id',
                'name',
                'synopsis',
                ['thumbnail_url', 'thumbnailUrl'],
            ],
            include: {
                association: 'episodes',
                attributes: [
                    'id',
                    'name',
                    'synopsis',
                    'order',
                    ['video_url', 'videoUrl'],
                    ['seconds_long', 'secondsLong'],
                ],
                order: [['order', 'ASC']],
                separate: true,
            },
        });

        return courseWithEpisodes;
    },

    getRandomFeaturedCourses: async () => {
        const featuredCourses = await Course.findAll({
            attributes: [
                'id',
                'name',
                'synopsis',
                ['thumbnail_url', 'thumbnailUrl'],
            ],
            where: {
                featured: true,
            },
        });

        const randomFeaturedCourses = featuredCourses.sort(
            () => 0.5 - Math.random()
        );

        return randomFeaturedCourses.slice(0, 3);
    },

    getTopTenNewest: async () => {
        const courses = await Course.findAll({
            limit: 10,
            order: [['created_at', 'ASC']],
        });

        return courses;
    },

    getTopTenByLikes: async () => {
        const results = await Course.sequelize?.query(
            `SELECT
                courses.id,
                courses.name,
                courses.synopsis,
                courses.thumbnail_url as thumbnailUrl,
                COUNT(users.id) AS likes
            FROM courses
                LEFT OUTER JOIN likes
                    ON courses.id = likes.course_id
                    INNER JOIN users
                        ON users.id = likes.user_id
            GROUP BY courses.id
            ORDER BY likes DESC
            LIMIT 10;`
        );

        if (results) {
            const [topTen, metadata] = results;
            return topTen;
        } else {
            return null;
        }
    },

    findByName: async (name: string, page: number, perPage: number) => {
        const offset = (page - 1) * perPage;

        const { count, rows } = await Course.findAndCountAll({
            attributes: [
                'id',
                'name',
                'synopsis',
                ['thumbnail_url', 'thumbnailUrl'],
            ],
            where: {
                name: {
                    //we use the following method to make a search that enables to the search reckognize any key-word for the research
                    [Op.iLike]: `%${name}%`, //the percentage means that we want to search the word/letter in any position in the string
                },
            },
            limit: perPage,
            offset,
        });

        return {
            course: rows,
            page,
            perPage,
            total: count,
        };
    },
};
