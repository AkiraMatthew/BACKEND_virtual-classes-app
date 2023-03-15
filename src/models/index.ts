// src/models/index.ts

import { Category } from './Category';
import { Course } from './Course';
import { Episode } from './Episode';
import { Favorite } from './Favorite';
import { User } from './User';

//sequelize as default to name the target association with its default version
Category.hasMany(Course, { as: 'courses' }) //on this query, rather than "{ as: 'courses' }", 
//sequelize would convert the target Model name to be identified "{ as: 'Courses' }", with the target name on plural

Course.belongsTo(Category);
Course.belongsToMany(User, { through: Favorite });
//Course.hasMany(Episode) //in this case the target Model name would be "{ as: 'Episodes' }"
Course.hasMany(Episode, { as: 'episodes' });//however, writing with lowcase letters is the pattern for the name, so we need to use the 'as' property
Course.hasMany(Favorite, { as: 'favoritesUsers', foreignKey: 'course_id' });

Episode.belongsTo(Course);

Favorite.belongsTo(Course);
Favorite.belongsTo(User);

User.belongsToMany(Course, { through: Favorite });
User.hasMany(Favorite, { as: 'favoritesCourses', foreignKey: 'user_id' });


export {
  Category,
  Course,
  Episode,
  Favorite,
  User
}