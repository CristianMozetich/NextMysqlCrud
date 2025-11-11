import mysql from 'serverless-mysql';

export const conn = mysql({
    config: {
        host: 'localhost',
        database: 'nextmysqlcrud',
        user: 'root',
        password: 'Osito1991$',
        port: 3306
    },
});