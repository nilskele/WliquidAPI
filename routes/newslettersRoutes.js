const express = require('express');
const router = express.Router();
const newslettersController = require('../controllers/newslettersController');

// Route to get all newsletters (with pagination)
router.get('/getPaged', newslettersController.getPagedNewsletters);

// Route to get a newsletter by ID
router.get('/get/:id', newslettersController.getNewsletterById);

// Route to create a new newsletter
router.post('/create', newslettersController.createNewsletter);

// Route to update a newsletter by ID
router.put('/update/:id', newslettersController.updateNewsletterById);

// Route to delete a newsletter by ID
router.delete('/delete/:id', newslettersController.deleteNewsletterById);

router.get('/searchByCategory', newslettersController.searchByCategory);

module.exports = router;
