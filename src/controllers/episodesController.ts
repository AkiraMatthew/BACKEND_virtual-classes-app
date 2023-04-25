import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth';
import { episodeService } from '../services/episodeService';

export const episodesController = {
    //GET /episodes/stream?videoUrl=
    stream: async (req: Request, res: Response) => {
        const { videoUrl } = req.query;
        console.log({ videoUrl });

        try {
            if (typeof videoUrl !== 'string')
                throw new Error("videoUrl param must be of type 'string'");

            // video range
            const range = req.headers.range; // bytes=0-1024

            //service implementation
            episodeService.streamEpisodeToResponse(res, videoUrl, range);
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    },

    //GET /episodes/:id/WatchTime
    getWatchTime: async (req: AuthenticatedRequest, res: Response) => {
        const userId = await req.user!.id;
        const episodeId = req.params.id;

        try {
            const watchTime = await episodeService.getWatchTime(
                userId,
                Number(episodeId)
            );

            return res.json(watchTime);
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    },

    //POST /episodes/:id/WatchTime
    setWatchTime: async (req: AuthenticatedRequest, res: Response) => {
        const userId = await req.user!.id;
        const episodeId = Number(req.params.id);
        const { seconds } = req.body;

        try {
            const watchTime = await episodeService.setWatchTime({
                userId,
                episodeId,
                seconds,
            });

            return res.json(watchTime);
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    },
};
