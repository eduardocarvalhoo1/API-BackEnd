import { body, validationResult } from 'express-validator';

const validateHospede = [
    body('nome')
        .notEmpty().withMessage('O campo nome é obrigatório.')
        .isLength({ min: 3, max: 50 }).withMessage('O nome deve ter entre 3 e 50 caracteres.'),
    body('email')
        .notEmpty().withMessage('O campo de e-mail é obrigatório.')
        .isEmail().withMessage('O e-mail deve ser um endereço de e-mail válido.'),
    body('cpf')
        .notEmpty().withMessage('O campo cpf é obrigatório.')
        .isLength({ min: 11, max: 11 }).withMessage('O CPF deve ter 11 números.'),
    body('telefone')
        .notEmpty().withMessage('O campo telefone é obrigatório.')
        .isNumeric().withMessage('O telefone deve conter apenas números.')
        .isLength({ min: 10, max: 15 }).withMessage('O telefone deve ter entre 10 e 15 dígitos.'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
export { validateHospede };
