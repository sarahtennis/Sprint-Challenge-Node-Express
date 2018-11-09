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
            res.status(500).json({ errorMessage: 'Error retrieving project' });
        });
});

// GET project actions by project id
// ** Todo: add functionality to test if id exists
router.get('/:id/actions', (req, res) => {
    projectModel.getProjectActions(req.params.id)
        .then(projectActions => {
            res.status(200).json(projectActions);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'Error retrieving project actions' });
        });
});

// POST insert new project
router.post('/', (req, res) => {
    if (req.body.name && req.body.description) {
        projectModel.insert(req.body)
            .then(newProject => {
                res.status(201).json(newProject);
            })
            .catch(err => {
                res.status(500).json({ errorMessage: 'Error creating project' })
            })
    } else {
        res.status(400).json({ errorMessage: 'Must provide non-empty name and description' })
    }
});

// DELETE remove post by post id
router.delete('/:id', (req, res) => {
    projectModel.remove(req.params.id)
        .then(recordsDeleted => {
            if (recordsDeleted) {
                res.status(200).json({ successMessage: 'Successfully deleted project' });
            } else {
                res.status(404).json({ errorMessage: 'Project at specified id does not exist' });
            }
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'Error deleting project.' });
        });
});

// PUT update post by post id
router.put('/:id', (req, res) => {
    if (req.body.name && req.body.description) {
        projectModel.update(req.params.id, req.body)
            .then(updatedProject => {
                if (updatedProject) {
                    res.status(200).json(updatedProject);
                } else {
                    res.status(404).json({ errorMessage: 'Project at specified id does not exist' });
                }
            })
            .catch(err => {
                res.status(500).json({ errorMessage: 'Error updating project' });
            });
    } else {
        res.status(400).json({ errorMessage: 'Must provide non-empty name and description' })
    }
});

module.exports = router;