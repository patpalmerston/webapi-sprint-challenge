const express = require('express');

const ActionsDb = require('../helpers/actionModel');

const router = express.Router();

//   get,
router.get('/', (req, res) => {
	ActionsDb.get()
		.then(action => {
			res.status(200).json(action);
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
		.then(action => {
			res.status(201).json(action);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: 'unable to make insert new action' });
		});
});


router.delete('/:id', (req, res) => {
	const { id } = req.params;
	ActionsDb.remove(id)
		.then(action => {
			if (action) {
				res.status(200).json({ Message: 'Project Deleted', id });
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: 'unable to delete project' });
		});
});

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
