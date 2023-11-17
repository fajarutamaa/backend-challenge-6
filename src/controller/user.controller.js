const { ResponseTemplate, Pagination } = require('../helper/resp.helper')
const imagekit = require('../libs/imagekit')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient

async function ViewProfile(req, res) {

    const  {username}  = req.params

    console.log(req.params)

    try {
        const checkUser = await prisma.users.findUnique({
            where: {
                username: username
            }
        })
        console.log(checkUser)
        if (!checkUser) {
            let response = ResponseTemplate(null, 'username user not found', null, 404)
            res.status(404).json(response)
            return
        } else {
            const users = await prisma.users.findUnique({
                select: {
                    id: true,
                    username: true,
                    photo_profile: true,
                    feeds: {
                        select: {
                            total_post:true
                        }
                    }
                },
                where: {
                    username:username
                }
            })
            let response = ResponseTemplate(users, 'fetch user detail success', null, 200)
            res.status(200).json(response)
            return
        }
    } catch (error) {
        console.log(error)
        let response = ResponseTemplate(null, 'internal server error', error, 500)
        res.status(500).json(response)
        return
    }
}

async function ChangePhoto(req, res) {

    const { username } = req.body

    const fileString = req.file.buffer.toString('base64')
    const uploadImage = await imagekit.upload({
            fileName: req.file.originalname,
            file: fileString
        })

    try {
        const ChangePhoto = await prisma.users.update({
            where: { username: username },
            data: { photo_profile: uploadImage.url }
        })
        let response = ResponseTemplate(ChangePhoto, 'update photo profile successfully', null, 200)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
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
            orderBy: {
                createdAt: 'asc'
            },
            skip: (currentPage - 1) * itemsPerPage,
            take: itemsPerPage,
        })

        const totalPages = Math.ceil(totalCount / itemsPerPage)

        let pagination = Pagination(currentPage, totalCount, totalPages)
        let response = ResponseTemplate(users, 'fetch all user success', null, 200)
        res.status(200).json({ data: response, pagination })
        return
    } catch (error) {
        let response = ResponseTemplate(null, 'internal server error', error, 500)
        res.status(500).json(response)
        return
    }
}

async function UpdateProfile(req, res){
    const {username, email, password}= req.body
    
}

async function DeleteUser(req, res) { }

module.exports = {
    ViewProfile,
    ChangePhoto,
    ListUser,
    DeleteUser,
    UpdateProfile
}
