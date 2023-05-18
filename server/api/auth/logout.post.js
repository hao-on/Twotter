import { removeRefreshToken } from "~~/server/db/refreshToken"
import { sendRefreshToken } from "~~/server/utils/jwt"

export default defineEventHandler(async (event) => {
    try {
        const refreshToken = getCookie(event, 'refresh_token')
        await removeRefreshToken(refreshToken)
    } catch (error) {
        console.log(error)
    }

    sendRefreshToken(event, null)

    return { message: 'Done' }
})