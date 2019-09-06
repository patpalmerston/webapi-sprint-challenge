const express = require('express');

const ActionsDb = require('../helpers/actionModel');

const router = express.Router();

//   get,
router.get('/', (req, res) => {
	ActionsDb.get()
		.then(project => {
			res.status(200).json(project);
		})
		.catch(err => {
			console.log(err);
			res.status().json({ error: 'unable to get actions info' });
		});
});

//   insert,
router.post('/', (req, res) => {
	
	const { project_id, notes, description } = req.body;
	ActionsDb.insert({ project_id, notes, description })
		.then(project => {
			res.status(201).json(project);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: 'unable to make insert new action' });
		});
});

//   remove, if I use the 204 it does not return a body for the preview in insomnia
// router.delete('/:id', (req, res) => {
// 	const { id } = req.params;
// 	ActionsDb.remove(id)
// 		.then(project => {
// 			if (project) {
// 				res.status(200).json({ Message: 'Project Deleted', id });
// 			}
// 		})
// 		.catch(err => {
// 			console.log(err);
// 			res.status(500).json({ error: 'unable to delete project' });
// 		});
// });

//   update,
// router.put('/:id', (req, res) => {
// 	const { id } = req.params;
// 	const { name, description } = req.body;
// 	ActionsDb.update(id, { name, description })
// 		.then(project => {
// 			res.status(200).json({ project });
// 		})
// 		.catch(err => {
// 			console.log(err);
// 			res.status(500).json({ error: 'unable to edit project' });
// 		});
// });

module.exports = router;
