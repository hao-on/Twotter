import { getTweets } from '~/server/db/tweets'
import { tweetTransformer } from '~/server/transformer/tweet'

export default defineEventHandler(async (event) => {
    const { query } = getQuery(event)

    let prismaQuery = {
        include: {
            author: true,
            mediaFiles: true,
            replies: {
                include: {
                    author: true
                }
            },
            replyTo: {
                include: {
                    author: true
                }
            }
        },
        orderBy: [
            {
                createdAt: 'desc'
            }
        ]
    }
    if (!!query) {
        prismaQuery = {
            ...prismaQuery,
            where: {
                text: {
                    contains: query,
                    mode: 'insensitive'
                }
            }
        }
    }
    const tweets = await getTweets(prismaQuery)
    return {
        tweets: tweets.map(tweetTransformer)
    }
})