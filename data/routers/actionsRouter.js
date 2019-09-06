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
//   update,
//   remove,
//   getProjectActions,

module.exports = router;
