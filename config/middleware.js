const express = require('express');

const projectsRouter = require('../projects/projectsRouter.js');

module.exports = server => {
    server.use(express.json());

    server.use('/api/projects', projectsRouter);
};