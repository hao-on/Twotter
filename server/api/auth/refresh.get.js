import { getRefreshTokenByToken, } from '~/server/db/refreshToken'
import { getUserById } from '~/server/db/user'
import { verifyJwt, generateTokens } from '~/server/utils/jwt'
export default defineEventHandler(async (event) => {
    const token = getCookie(event, 'refresh_token')

    if (!token) {
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: 'Refresh token is invalid'
        }))
    }

    const refreshToken = await getRefreshTokenByToken(token)
    if (!refreshToken) {
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: 'Refresh token is invalid'
        }))
    }

    const validToken = verifyJwt(token, "refreshSecret")
    try {
        const user = await getUserById(validToken.userId)
        const { accessToken } = generateTokens(user)
        return { accessToken: accessToken }

    } catch (error) {
        return sendError(event, createError({
            statusCode: 500,
            statusMessage: 'Something went wrong'
        }))
    }
})