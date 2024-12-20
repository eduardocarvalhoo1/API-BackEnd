const authService = require('../services/authService');

exports.login = async (req, res) => {
    const { username, password } = req.body;

    // chama a função de login
    const token = await authService.login(username, password);
    
    // verifica se há um token
    if(token == null){
        return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    return res.status(200).json({ token });

    /* 
    #swagger.tags = ['Login']
    #swagger.summary = 'Realiza o login e retorna um token'
    #swagger.responses[200] = {
        schema: {'token':'Bearer string'}
    }
    #swagger.responses[401] = {
        description: "Acesso negado"
    }
    #swagger.responses[500] = {
        description: "Erro interno"
    }
    */
}