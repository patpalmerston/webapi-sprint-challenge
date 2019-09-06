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
//   insert,
//   update,
//   remove,
//   getProjectActions,

module.exports = router;
