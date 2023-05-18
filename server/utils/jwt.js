import jwt from "jsonwebtoken"

export function signJwt(user, keyName, options) {
    const config = useRuntimeConfig()
    const signingKey = config[keyName]
    return jwt.sign({ userId: user.id }, signingKey, {
        ...(options && options)
    });
}

export function verifyJwt(token, keyName) {
    const config = useRuntimeConfig()
    const publicKey = config[keyName]


    try {
        const decoded = jwt.verify(token, publicKey);
        return {
            valid: true,
            expired: false,
            userId: decoded.userId
        };
    } catch (e) {
        console.error(e);
        return {
            valid: false,
            expired: e.message === "jwt expired",
            decoded: null,
        };
    }
}

export const generateTokens = (user) => {
    const accessToken = signJwt(user, "accessSecret", { expiresIn: '10m' })
    const refreshToken = signJwt(user, "refreshSecret", { expiresIn: '4h' })

    return {
        accessToken: accessToken,
        refreshToken: refreshToken
    }
}

export const sendRefreshToken = (event, token) => {
    setCookie(event, 'refresh_token', token, {
        httpOnly: true,
        sameSite: true
    })
}