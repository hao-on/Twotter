import { prisma } from '.'
import bcrypt from 'bcrypt'

export const createUser = async (userData) => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hashSync(userData.password, salt)

    return prisma.user.create({
        data: {
            ...userData,
            password: hash
        }
    })
}

export const getUserByUsername = (username) => {
    return prisma.user.findUnique({
        where: {
            username
        }
    })
}

export const getUserById = (userId) => {
    return prisma.user.findUnique({
        where: {
            id: userId
        }
    })
}
export const validatePassword = (password, userPassword) => {
    return bcrypt.compare(password, userPassword)
}