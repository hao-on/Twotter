import UrlPattern from 'url-pattern'
import { getUserById } from '../db/user'
import { verifyJwt } from '../utils/jwt'

export default defineEventHandler(async (event) => {
    const endpoints = [
        '/api/auth/user',
        '/api/user/tweets',
        '/api/tweets',
        '/api/tweets/:id',
    ]

    const isHandled = endpoints.some(endpoint => {
        const pattern = new UrlPattern(endpoint)
        return pattern.match(event.node.req.url)
    })
    if (!isHandled) return

    const token = event.node.req.headers['authorization']?.split(' ')[1]
    const decoded = verifyJwt(token, "accessSecret")
    if (!decoded.valid) {
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: 'Unathorized'
        }))
    }

    try {
        const userId = decoded.userId
        const user = await getUserById(userId)
        event.context.auth = { user }
    } catch (error) {
        return
    }
})