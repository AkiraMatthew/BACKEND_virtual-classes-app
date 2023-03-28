import { User } from '../models'
import { EpisodeInstance } from '../models/Episode';
import { UserCreationAttributes } from '../models/User'

function filterLastEpisodeByCourse (episodes: EpisodeInstance[]){
    const coursesOnList: number[] = [];

    const lastEpisodes = episodes.reduce((currentList, episode) => {
        if(!coursesOnList.includes(episode.courseId)){
            //if we still not seen any episode of the course, that means we are current sitting at the first course episode
            coursesOnList.push(episode.courseId)
            currentList.push(episode)
            return currentList;
        };

        const episodeFromSameCourse = currentList.find(ep => ep.courseId === episode.courseId);

        if (episodeFromSameCourse!.order > episode.order) {// if the episode that is already on the list have a big order, it means that it's already the most recent episode
            return currentList
        };

        //In this one we do the opposite fron the last method, we catch all the other episodes that are from different courses
        const listWithoutEpisodeFromSameCourse = currentList.filter(ep => ep.courseId !== episode.courseId);
        listWithoutEpisodeFromSameCourse.push(episode)

        return listWithoutEpisodeFromSameCourse
    }, [] as EpisodeInstance[])
    return lastEpisodes
}

export const userService = {
    findByEmail:async (email: string) => {
        const user = await User.findOne({
            where: {
                email: email
            }
        });

        return user
    },

    create:async (attributes: UserCreationAttributes) => {
        const user = await User.create(attributes);

        return user
    },

    getKeepWatchingList: async (id: number) => {
        const userWithWatchingEpisodes = await User.findByPk(id, {
            include: {
                association: 'Episode',
                include: [{
                    association: 'Course'
                }],
                through: {
                    as: 'watchTime'
                }
            }
        })

        if(!userWithWatchingEpisodes) throw new Error('User not found')
    }
}