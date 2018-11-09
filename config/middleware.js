const express = require('express');

const projectsRouter = require('../projects/projectsRouter.js');
const actionsRouter = require('../actions/actionsRouter.js');

module.exports = server => {
    server.use(express.json());

    server.use('/api/projects', projectsRouter);
    server.use('/api/actions', actionsRouter);
};