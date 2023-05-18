import { getUserByUsername, validatePassword } from '~/server/db/user'
import { generateTokens, sendRefreshToken } from '~/server/utils/jwt'
import { userTransformer } from '~/server/transformer/user'
import { createRefreshToken } from '~/server/db/refreshToken'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const { username, password } = body
    if (!username || !password) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Invalid params'
        }))
    }

    // Is the user registered
    const user = await getUserByUsername(username)
    if (!user) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Username or password is invalid'
        }))
    }

    // Compare passwords
    const isValid = await validatePassword(password, user.password)

    if (!isValid) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: 'Username or password is invalid'
        }))
    }


    // Generate Tokens
    const { accessToken, refreshToken } = generateTokens(user)

    // Save refreshToken inside db
    await createRefreshToken({
        token: refreshToken,
        userId: user.id
    })

    // Add HTTP only cookie
    sendRefreshToken(event, refreshToken)

    return {
        access_token: accessToken,
        user: userTransformer(user)
    }
})