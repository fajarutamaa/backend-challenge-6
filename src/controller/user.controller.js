const { ResponseTemplate, Pagination } = require('../helper/resp.helper')
const imagekit = require('../libs/imagekit')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient

async function ViewProfile(req, res) {

    const { username } = req.params

    try {
        const checkUser = await prisma.users.findUnique({
            where: {
                username: username,
            }
        })

        if (!checkUser) {
            res.status(404).json({
                message: 'username not found',
                status: 404
            })
            return
        }

        if (checkUser.deletedAt != null) {
            res.status(404).json({
                data: { deletedAt: checkUser.deletedAt },
                message: 'user has been deleted',
                status: 404,
            })
            return
        }

        if (!users) {
            res.status(404).json({
                message: 'username not found',
                status: 404
            })
            return
        }

        const users = await prisma.users.findUnique({
            select: {
                username: true,
                photo_profile: true,
                createdAt: true,
            },
            where: {
                username: username,
            }
        })
        let response = ResponseTemplate(users, 'success', null, 200)
        res.status(200).json(response)
        return
    } catch (error) {
        let response = ResponseTemplate(null, 'internal server error', error, 500)
        res.status(500).json(response)
        return
    }
}

async function ChangePhoto(req, res) {

    const fileString = req.file.buffer.toString('base64')
    const uploadImage = await imagekit.upload({
        fileName: req.file.originalname,
        file: fileString
    })

    try {
        const ChangePhoto = await prisma.users.update({
            where: { username: req.users.username },
            data: { photo_profile: uploadImage.url },
            select: {
                id: true,
                username: true,
                photo_profile: true,
                updatedAt: true,
            }
        })
        let response = ResponseTemplate(ChangePhoto, 'success', null, 200)
        return res.status(200).json(response)
    } catch (error) {
        let response = ResponseTemplate(null, 'internal server error', error, 500)
        return res.status(500).json(response)
    }
}

async function ListUser(req, res) {

    const { username, password, email, page, perPage } = req.query

    const payload = {}

    if (username) {
        payload.username = username
    }

    if (email) {
        payload.email = email
    }

    if (password) {
        payload.password = password
    }

    try {

        const currentPage = parseInt(page) || 1
        const itemsPerPage = parseInt(perPage) || 10

        const totalCount = await prisma.users.count({
            where: payload,
        })

        const users = await prisma.users.findMany({
            where: payload,
            select: {
                id: true,
                username: true,
                photo_profile: true,
                createdAt: true,
                updatedAt: true,
                deletedAt: true
            },
            orderBy: {
                createdAt: 'asc'
            },
            skip: (currentPage - 1) * itemsPerPage,
            take: itemsPerPage,
        })

        const totalPages = Math.ceil(totalCount / itemsPerPage)

        let pagination = Pagination(currentPage, totalCount, totalPages)
        let response = ResponseTemplate(users, 'success', null, 200)
        return res.status(200).json({ data: response, pagination })

    } catch (error) {
        let response = ResponseTemplate(null, 'internal server error', error, 500)
        return res.status(500).json(response)
    }
}

async function DeleteUser(req, res) {

    const { id } = req.params

    try {
        const checkUser = await prisma.users.findUnique({
            where: {
                id,
                deletedAt: null
            }
        })

        if (!checkUser) {
            res.status(404).json({
                message: 'user not found',
                status: 404
            })
            return
        } else {
            await prisma.users.update({
                where: {
                    id
                },
                data: {
                    deletedAt: new Date(),
                }
            })

            let response = ResponseTemplate(null, 'success', null, 200)
            return res.status(200).json(response)
        }
    } catch (error) {
        let response = ResponseTemplate(null, 'internal server error', error, 500)
        return res.status(500).json(response)
    }
}

module.exports = {
    ViewProfile,
    ChangePhoto,
    ListUser,
    DeleteUser
}