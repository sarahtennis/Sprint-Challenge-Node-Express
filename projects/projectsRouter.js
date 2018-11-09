const express = require('express');
const projectModel = require('../data/helpers/projectModel.js');

const router = express.Router();

// GET project by project id
router.get('/:id', (req, res) => {
    projectModel.get(req.params.id)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'Error retrieving project.' })
        })
})

module.exports = router;