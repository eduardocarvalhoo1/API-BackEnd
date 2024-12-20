import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        version: "1.0.0",
        title: "API de Reservas",
        description: "Documentação da API de Reservas"
    },
    host: 'localhost:3000',
    basePath: '/',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            name: 'Autenticação',
            description: 'Rotas relativas à autenticação'
        },
        {
            name: 'Usuários',
            description: 'Rotas relativas aos usuários'
        },
        {
            name: 'Reservas',
            description: 'Rotas relativas às reservas'
        }
    ],
    components: {
        schemas: {
            User: {
                type: "object",
                properties: {
                    id: { type: "integer", description: "ID do usuário" },
                    username: { type: "string", description: "Nome de usuário" },
                    name: { type: "string", description: "Nome completo do usuário" },
                    password: { type: "string", description: "Senha do usuário" },
                    role: { type: "string", description: "Papel do usuário (admin ou user)" }
                }
            },
            Reserva: {
                type: "object",
                properties: {
                    id: { type: "integer", description: "ID da reserva" },
                    name: { type: "string", description: "Nome da reserva" },
                    type: { type: "string", description: "Tipo de reserva" },
                    date: { type: "string", format: "date", description: "Data da reserva" }
                }
            }
        },
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                description: 'Autenticação por token Bearer'
            }
        }
    }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./index.js'];

swaggerAutogen()(outputFile, endpointsFiles, doc).then(async () => {
    await import('./index.js'); // Inicia o servidor após a geração do arquivo Swagger
});
