// src/models/index.ts

import { Category } from './Category';
import { Course } from './Course';
import { Episode } from './Episode';
import { Favorite } from './Favorite';
import { Like } from './like';
import { User } from './User';
import { WatchTime } from './WatchTime';

//sequelize as default to name the target association with its default version
Category.hasMany(Course, { as: 'courses' }); //on this query, rather than "{ as: 'courses' }",
//sequelize would convert the target Model name to be identified "{ as: 'Courses' }", with the target name on plural

//Course.hasMany(Episode) //in this case the target Model name would be "{ as: 'Episodes' }"
Course.belongsTo(Category);
Course.belongsToMany(User, { through: Favorite });
Course.belongsToMany(User, { through: Like });
Course.hasMany(Episode, { as: 'episodes' }); //however, writing with lowcase letters is the pattern for the name, so we need to use the 'as' property
Course.hasMany(Favorite, { as: 'favoritesUsers', foreignKey: 'course_id' });

Episode.belongsTo(Course);
Episode.belongsToMany(User, { through: WatchTime });

Favorite.belongsTo(Course);
Favorite.belongsTo(User);

User.belongsToMany(Course, { through: Favorite });
User.belongsToMany(Course, { through: Like });
User.belongsToMany(Episode, { through: WatchTime });
User.hasMany(Favorite, { as: 'favoritesCourses', foreignKey: 'user_id' });

export { Category, Course, Episode, Favorite, Like, User, WatchTime };
