const express = require('express');

const ProjectDb = require('../helpers/projectModel');

const router = express.Router();

//   get,
router.get('/', (req, res) => {
	ProjectDb.get()
		.then(project => {
			res.status(200).json(project);
		})
		.catch(err => {
			console.log(err);
			res.status().json({ error: 'unable to get project info' });
		});
});

//   getProjectActions,
router.get('/:id/actions', (req, res) => {
	const { id } = req.params;
	ProjectDb.getProjectActions(id)
		.then(actions => {
			res.status(200).json(actions);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: 'unable to retrieve action info' });
		});
});

//   insert,
router.post('/', (req, res) => {
	const { name, description } = req.body;
	ProjectDb.insert({ name, description })
		.then(project => {
			res.status(201).json(project);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: 'unable to make new project' });
		});
});

//   remove, if I use the 204 it does not return a body for the preview in insomnia
router.delete('/:id', (req, res) => {
	const { id } = req.params;
	ProjectDb.remove(id)
		.then(project => {
			if (project) {
				res.status(200).json({ Message: 'Project Deleted', id });
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: 'unable to delete project' });
		});
});

//   update,
router.put('/:id', (req, res) => {
	const { id } = req.params;
	const { name, description } = req.body;
	ProjectDb.update(id, { name, description })
		.then(project => {
			res.status(200).json({ project });
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: 'unable to edit project' });
		});
});

module.exports = router;
