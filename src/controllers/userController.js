const prisma = require('../database/prisma')

// Padrão de resposta
function sendResponse(res, success, message, data = null) {
    return res.json({
        success,
        message,
        data
    })
}

// Criar usuário
async function createUser(req, res) {
    try {
        const { name, email } = req.body

        if (!name || !email) {
            return sendResponse(res, false, "Nome e Email são obrigatórios")
        }

        const user = await prisma.user.create({
            data: { name, email }
        })

        return sendResponse(res, true, "Usuário criado com sucesso", user)
    } catch (error) {
        return sendResponse(res, false, "Erro ao criar usuário")
    }
}

// Listar usuários
async function listUsers(req, res) {
    try {
        const users = await prisma.user.findMany()
        return sendResponse(res, true, "Usuários listados com sucesso", users)
    } catch (error) {
        return sendResponse(res, false, "Erro ao listar usuários")
    }
}

// Listar um usuário por ID
async function getUser(req, res) {
    try {
        const { id } = req.params

        const user = await prisma.user.findUnique({
            where: { id: Number(id) }
        })

        if (!user) {
            return sendResponse(res, false, "Usuário não encontrado")
        }

        return sendResponse(res, true, "Usuário encontrado", user)
    } catch (error) {
        return sendResponse(res, false, "Erro ao buscar usuário")
    }
}

// Atualizar usuário
async function updateUser(req, res) {
    try {
        const { id } = req.params
        const { name, email } = req.body

        const user = await prisma.user.update({
            where: { id: Number(id) },
            data: { name, email }
        })

        return sendResponse(res, true, "Usuário atualizado com sucesso", user)
    } catch (error) {
        return sendResponse(res, false, "Erro ao atualizar usuário")
    }
}

// Deletar usuário
async function deleteUser(req, res) {
    try {
        const { id } = req.params

        await prisma.user.delete({
            where: { id: Number(id) }
        })

        return sendResponse(res, true, "Usuário deletado com sucesso")
    } catch (error) {
        return sendResponse(res, false, "Erro ao deletar usuário")
    }
}

module.exports = {
    createUser,
    listUsers,
    getUser,
    updateUser,
    deleteUser
}

