const knex = require('knex');

const configuration = require('../../knexfile');

const connection = knex(process.env.NODE_ENV === 'test' ? configuration.test : configuration.development);

module.exports = connection;