const userService = require('../services/userService');

exports.getAllUsers = async (req, res) => {
    const users = await userService.getAllUsers();

    res.status(200).json(users);

    /* 
    #swagger.tags = ['Usuários']
    #swagger.summary = 'Retorna todos os usuários'
    #swagger.description = 'Essa rota retorna uma lista com todos os usuários cadastrados no sistema.'
    #swagger.responses[200] = {
        description: 'Usuários encontrados com sucesso',
        content: {
            "application/json": {
                schema: {
                    type: "array",
                    items: { $ref: '#/components/schemas/User' }
                }
            }
        }
    }
    */
};

exports.getUserById = async (req, res) => {
    const user = await userService.getUserById(parseInt(req.params.id, 10));

    if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.status(200).json(user);

    /* 
    #swagger.tags = ['Usuários']
    #swagger.summary = 'Busca um usuário pelo ID'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do usuário',
        required: true,
        schema: { type: 'integer' }
    }
    #swagger.responses[200] = {
        description: 'Usuário encontrado com sucesso',
        schema: { $ref: '#/components/schemas/User' }
    }
    #swagger.responses[404] = {
        description: 'Contato não encontrado.',
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Contato não encontrado.' }
                    }
                }
            }
        }
    }
    */
};

exports.createUser = async (req, res) => {
    const newUser = await userService.createUser(req.body);

    res.status(201).json(newUser);

    /* 
    #swagger.tags = ['Usuários']
    #swagger.summary = 'Cria um novo usuário'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['user'] = {
        in: 'body',
        description: 'Informações do usuário',
        required: true,
        schema: { $ref: '#/components/schemas/User' }
    }
    #swagger.responses[201] = {
        description: 'Usuário criado com sucesso',
        schema: { $ref: '#/components/schemas/User' }
    }
    #swagger.responses[400] = {
        description: 'Erro na requisição.',
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'ID de usuário enviado é inválido.' }
                    }
                }
            }
        }
    }
    #swagger.responses[401] = {
        description: 'Acesso negado. Token não fornecido ou inválido.',
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Acesso negado' }
                    }
                }
            }
        }
    }
    #swagger.responses[403] = {
        description: 'Acesso negado. Privilégios insuficientes.',
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Acesso negado: privilégios insuficientes' }
                    }
                }
            }
        }
    }
    */
};

exports.updateUser = async (req, res) => {
    const updatedUser = await userService.updateUser(parseInt(req.params.id, 10), req.body);

    if (!updatedUser) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.status(200).json(updatedUser);

    /* 
    #swagger.tags = ['Usuários']
    #swagger.summary = 'Atualiza um usuário pelo ID'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do usuário',
        required: true,
        schema: { type: 'integer' }
    }
    #swagger.parameters['user'] = {
        in: 'body',
        description: 'Novos dados do usuário',
        required: true,
        schema: { $ref: '#/components/schemas/User' }
    }
   #swagger.responses[200] = {
        description: 'Usuário atualizado com sucesso',
        schema: { $ref: '#/components/schemas/Contact' }
    }
    #swagger.responses[400] = {
        description: 'ID de Usuário inválido.',
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'ID de Usuário inválido.' }
                    }
                }
            }
        }
    }
    #swagger.responses[404] = {
        description: 'Usuário não encontrado.',
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Usuário não encontrado.' }
                    }
                }
            }
        }
    }
    #swagger.responses[401] = {
        description: 'Acesso negado. Token não fornecido ou inválido.',
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Acesso negado' }
                    }
                }
            }
        }
    }
    #swagger.responses[403] = {
        description: 'Acesso negado. Privilégios insuficientes.',
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Acesso negado: privilégios insuficientes' }
                    }
                }
            }
        }
    }
    */
};

exports.deleteUser = async (req, res) => {
    const deletedUser = await userService.deleteUser(parseInt(req.params.id, 10));

    if (!deletedUser) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.status(200).json({ message: 'Usuário deletado com sucesso.' });

    /* 
    #swagger.tags = ['Usuários']
    #swagger.summary = 'Deleta um usuário pelo ID'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do usuário',
        required: true,
        schema: { type: 'integer' }
    }
    #swagger.responses[200] = {
        description: 'Usuário deletado com sucesso',
        schema: {
            type: 'object',
            properties: {
                message: { type: 'string' }
            }
        }
    }
    #swagger.responses[400] = {
        description: 'ID de Usuário inválido.',
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'ID de Usuário inválido.' }
                    }
                }
            }
        }
    }
    #swagger.responses[404] = {
        description: 'Usuário não encontrado.',
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Usuário não encontrado.' }
                    }
                }
            }
        }
    }
    #swagger.responses[401] = {
        description: 'Acesso negado. Token não fornecido ou inválido.',
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Acesso negado' }
                    }
                }
            }
        }
    }
    #swagger.responses[403] = {
        description: 'Acesso negado. Privilégios insuficientes.',
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Acesso negado: privilégios insuficientes' }
                    }
                }
            }
        }
    }
    */
};