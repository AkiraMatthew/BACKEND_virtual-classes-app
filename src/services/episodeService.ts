import { Response } from "express";
import fs from "fs";
import path from "path";
import { WatchTimeAttributes } from "../models/WatchTime";
import { WatchTime } from '../models'

export const episodeService = {
    streamEpisodeToResponse: (res: Response, videoUrl: string, range: string | undefined) => {
        const filePath = path.join(__dirname, '../../uploads', videoUrl);
            const fileStat = fs.statSync(filePath);

            if (range){
                const parts = range.replace(/bytes=/, '').split('-');

                const start = parseInt(parts[0], 10); //1024
                const end = parts[1] ? parseInt(parts[1], 10) : fileStat.size - 1; //8196

                const chunkSize = (end - start) + 1; //the chunkSize start being counted from 1, so it never can be 0

                const file = fs.createReadStream(filePath, {start, end});

                const head = {
                    'Content-Range': `bytes ${start}-${end}/${fileStat.size}`,
                    'Accept-Ranges': 'bytes',
                    'Content-Length': chunkSize,
                    'Content-Type': 'video/mp4'
                };

                res.writeHead(206, head) //status 206 represents a partial content
                file.pipe(res) 
            } else { //when there isn't a set range, the response give the entire video 
                const head = {
                    'Content-Length': fileStat.size,
                    'Content-Type': 'video/mp4'
                };

                res.writeHead(200, head);
                fs.createReadStream(filePath).pipe(res)
            }
    },

    getWatchTime: async (userId: number, episodeId: number) => {
        const watchTime = WatchTime.findOne({
            attributes: [ 'seconds' ],
            where: {
                userId,
                episodeId
            }
        });
        
        return watchTime
    },

    //when we have many arguments, we can put then inside a object to aggregate then and make easier to organize. Insteado of using (userId, episodeId, second), we use ({userId, episodeId, second})
    setWatchTime: async ({ userId, episodeId, seconds }: WatchTimeAttributes) => {  
        const watchTime = WatchTime.create({
            userId,
            episodeId,
            seconds
            //or
            // userId: attributes.userId,
            // episodeId: attributes.episodeId,
            // seconds: attributes.seconds
        });
        
        return watchTime
    }
}