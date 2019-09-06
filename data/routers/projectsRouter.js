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

router.get('/:id', validateProjectId, (req, res) => {
	const { id } = req.params;
	ProjectDb.get(id)
		.then(project => {
			res.status(200).json(project);
		})
		.catch(err => {
			console.log(err);
			res.status().json({ error: 'unable to retrieve that project by id' });
		});
});

//   getProjectActions,
router.get('/:id/actions', validateProjectId, (req, res) => {
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
router.post('/', validateProject, (req, res) => {
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
router.delete('/:id', validateProjectId, (req, res) => {
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
router.put('/:id', validateProjectId, (req, res) => {
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

function validateProjectId(req, res, next) {
	let projectId = req.params.id;

	ProjectDb.get(projectId).then(project => {
		if (project === null || project.length === 0) {
			res.status(400).json({ message: 'invalid project id' });
		} else {
			req.project = project;
			next();
		}
	});
}

function validateProject(req, res, next) {
	if (!req.body) {
		res.status(400).json({ message: 'missing user data' });
	} else if (!req.body.name || !req.body.description) {
		res.status(400).json({ message: 'Please Add name and Description' });
	} else {
		next();
	}
}

module.exports = router;
