import { Request, Response } from "express";
import { episodeService } from "../services/episodeService";

export const episodesController = {
    //GET /episodes/stream?videoUrl=
    stream: async (req: Request, res: Response) => {
        const { videoUrl } = req.query;
        console.log({ videoUrl })

        try {
            if (typeof videoUrl !== 'string') throw new Error("videoUrl param must be of type 'string'");
            
             // video range
             const range = req.headers.range; // bytes=0-1024

             //service implementation
             episodeService.streamEpisodeToResponse(res, videoUrl, range)
            
        } catch (error) {
            if(error instanceof Error){
                return res.status(400).json({ message: error.message })
            }
        }
    }
}