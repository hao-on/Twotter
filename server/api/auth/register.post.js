import { sendError } from 'h3'
import { createUser } from '~/server/db/user'
import { userTransformer } from '~/server/transformer/user'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { username, email, password, passwordConfirmation, name } = body

    if (!username || !email || !password || !passwordConfirmation || !name) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid params' }))
    }

    if (password !== passwordConfirmation) {
        return sendError(event, createError({ statusCode: 400, statusMessage: 'Passwords do not match' }))
    }

    const userData = {
        username,
        email,
        password,
        name,
        profileImage: 'http://picsum/photos/200/200'
    }

    const user = await createUser(userData)

    return {
        body: userTransformer(user)
    }
})