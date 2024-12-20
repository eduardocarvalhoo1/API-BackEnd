const contactService = require('../services/contactService');

exports.getAllContacts = async (req, res) => {
    const contacts = await contactService.getAllContacts();
    res.status(200).json(contacts);

    /* 
    #swagger.tags = ['Contatos']
    #swagger.summary = 'Retorna todos os contatos'
    #swagger.description = 'Essa rota retorna uma lista com todos os contatos cadastrados no sistema.'
    #swagger.responses[200] = {
        description: 'Contatos encontrados com sucesso',
        content: {
            "application/json": {
                schema: {
                    type: "array",
                    items: { $ref: '#/components/schemas/Contact' }
                }
            }
        }
    }
    */
};

exports.getContactById = async (req, res) => {
    const contact = await contactService.getContactById(parseInt(req.params.id, 10));

    if (!contact) {
        return res.status(404).json({ message: 'Contato não encontrado.' });
    }

    res.status(200).json(contact);

    /* 
    #swagger.tags = ['Contatos']
    #swagger.summary = 'Busca um contato pelo ID'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do contato',
        required: true,
        schema: { type: 'integer' }
    }
    #swagger.responses[200] = {
        description: 'Contato encontrado com sucesso',
        schema: { $ref: '#/components/schemas/Contact' }
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

exports.getContactByUserId = async (req, res) => {
    const contacts = await contactService.getContactsByUserId(parseInt(req.params.id, 10));

    if (!contacts) {
        return res.status(500).json({ message: 'Houve um erro, tente novamente.' });
    }

    res.status(200).json(contacts);

    /* 
    #swagger.tags = ['Usuários']
    #swagger.summary = 'Busca contatos pelo ID do usuário'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do usuário',
        required: true,
        schema: { type: 'integer' }
    }
    #swagger.responses[200] = {
        description: 'Contatos do usuário encontrados com sucesso',
        schema: {
            type: "array",
            items: { $ref: '#/components/schemas/Contact' }
        }
    }
    #swagger.responses[500] = {
        description: 'Erro interno no servidor.',
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Houve um erro, tente novamente.' }
                    }
                }
            }
        }
    }
    */
};

exports.createContact = async (req, res) => {
    const newContact = await contactService.createContact(req.body);

    if (!newContact) {
        return res.status(400).json({ message: 'ID de usuário enviado é inválido.' });
    }

    res.status(201).json(newContact);

    /* 
    #swagger.tags = ['Contatos']
    #swagger.summary = 'Cria um novo contato'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['contact'] = {
        in: 'body',
        description: 'Informações do contato',
        required: true,
        schema: { $ref: '#/components/schemas/Contact' }
    }
    #swagger.responses[201] = {
        description: 'Contato criado com sucesso',
        schema: { $ref: '#/components/schemas/Contact' }
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

exports.updateContact = async (req, res) => {
    const updatedContact = await contactService.updateContact(parseInt(req.params.id, 10), req.body);

    if (!updatedContact) {
        return res.status(400).json({ message: 'ID de contato inválido.' });
    }

    res.status(200).json(updatedContact);

    /* 
    #swagger.tags = ['Contatos']
    #swagger.summary = 'Atualiza um contato pelo ID'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do contato',
        required: true,
        schema: { type: 'integer' }
    }
    #swagger.parameters['contact'] = {
        in: 'body',
        description: 'Novos dados do contato',
        required: true,
        schema: { $ref: '#/components/schemas/Contact' }
    }
    #swagger.responses[200] = {
        description: 'Contato atualizado com sucesso',
        schema: { $ref: '#/components/schemas/Contact' }
    }
    #swagger.responses[400] = {
        description: 'ID de contato inválido.',
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'ID de contato inválido.' }
                    }
                }
            }
        }
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

exports.deleteContact = async (req, res) => {
    const deletedContact = await contactService.deleteContact(parseInt(req.params.id, 10));

    if (!deletedContact) {
        return res.status(400).json({ message: 'ID de contato inválido.' });
    }

    res.status(200).json({ message: 'Contato deletado com sucesso.' });

    /* 
    #swagger.tags = ['Contatos']
    #swagger.summary = 'Deleta um contato pelo ID'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do contato',
        required: true,
        schema: { type: 'integer' }
    }
    #swagger.responses[200] = {
        description: 'Contato deletado com sucesso',
        schema: {
            type: 'object',
            properties: {
                message: { type: 'string' }
            }
        }
    }
    #swagger.responses[400] = {
        description: 'ID de contato inválido.',
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'ID de contato inválido.' }
                    }
                }
            }
        }
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