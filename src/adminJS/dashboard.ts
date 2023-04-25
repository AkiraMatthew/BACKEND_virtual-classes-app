import AdminJS, { PageHandler } from 'adminjs';
import { Category, Course, Episode } from '../models';
import { User } from '../models/User';

export const dashboardOptions: {
    handler?: PageHandler;
    component?: string;
} = {
    component: AdminJS.bundle('./components/Dashboard'),
    handler: async (req, res, context) => {
        const courses = await Course.count();
        const episodes = await Episode.count();
        const categories = await Category.count();
        const standartUsers = await User.count({ where: { role: 'user' } });

        res.json({
            Courses: courses,
            Episodes: episodes,
            Categories: categories,
            Users: standartUsers,
        });
    },
};
