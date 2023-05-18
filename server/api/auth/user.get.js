import { userTransformer } from '~/server/transformer/user'

export default defineEventHandler(async (event) => {
    return {
        user: userTransformer(event.context.auth?.user)
    }
})