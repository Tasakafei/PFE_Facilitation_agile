var express = require('express');
var router = express.Router();
var catalogueController = require("../controllers/catalogue");
/** GET workshops listing. **/
router.get('/', catalogueController.getAllWorkshops);

/** POST Create new workshop **/
router.post('/', catalogueController.createNewWorkshop);

/** GET a specific workshop **/
router.get('/:id', catalogueController.getWorkshop);

/** DELETE a specific workshop **/
router.delete('/:id', catalogueController.removeWorkshop);


module.exports = router;