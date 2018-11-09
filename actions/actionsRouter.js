const express = require('express');
const actionModel = require('../data/helpers/actionModel.js');

const router = express.Router();

// GET action by action id
router.get('/:id', (req, res) => {
    actionModel.get(req.params.id)
        .then(action => {
            res.status(200).json(action);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'Error retrieving action' });
        });
});

// POST new action
// ** Todo: verify project id exists
// ** Todo: description limit 128 characters
router.post('/', (req, res) => {
    if (req.body.project_id && req.body.description && req.body.notes) {
        actionModel.insert(req.body)
            .then(newAction => {
                res.status(201).json(newAction);
            })
            .catch(err => {
                res.status(500).json({ errorMessage: 'Error creating action' })
            })
    } else {
        res.status(400).json({ errorMessage: 'Must provide non-empty name and description and a valid project id' })
    }
})

// DELETE post by post id
router.delete('/:id', (req, res) => {
    actionModel.remove(req.params.id)
        .then(recordsDeleted => {
            if (recordsDeleted) {
                res.status(200).json({ successMessage: 'Successfully deleted action' });
            } else {
                res.status(404).json({ errorMessage: 'Action at specified id does not exist' });
            }
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'Error deleting action' });
        });
});

// PUT update post
// ** Todo: verify project id exists
// ** Todo: description limit 128
router.put('/:id', (req, res) => {
    if (req.body.description) {
        actionModel.update(req.params.id, req.body)
            .then(updatedAction => {
                res.status(200).json(updatedAction);
            })
            .catch(err => {
                res.status(500).json({ errorMessage: 'Error updating action' })
            })
    } else {
        res.status(400).json({ errorMessage: 'Must provide non-empty description'})
    }
})

module.exports = router;