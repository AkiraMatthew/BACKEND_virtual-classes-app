// src/models/index.ts

import { Category } from './Category';
import { Course } from './Course';
import { Episode } from './Episode';
import { User } from './User';

//sequelize as default to name the target association with its default version
Category.hasMany(Course, { as: 'courses' }) //on this query, rather than "{ as: 'courses' }", 
//sequelize would convert the target Model name to be identified "{ as: 'Courses' }", with the target name on plural

Course.belongsTo(Category)
Course.hasMany(Episode) //in this case the target Model name would be "{ as: 'Episodes' }"

Episode.belongsTo(Course)

export {
  Category,
  Course,
  Episode
}