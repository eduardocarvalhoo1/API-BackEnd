import { body, validationResult } from 'express-validator';

const validateReserva = [
    body('name')
        .notEmpty().withMessage('O campo nome é obrigatório.')
        .isLength({ min: 3, max: 50 }).withMessage('O nome deve ter entre 3 e 50 caracteres.'),
    body('type')
        .notEmpty().withMessage('O tipo de reserva é obrigatorio'),
    body('date')
        .notEmpty().withMessage('O campo data é obrigatório.')
        .isLength({ min: 10, max: 10 }).withMessage('Informe a data no modelo aaaa-mm-dd.'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
export { validateReserva };