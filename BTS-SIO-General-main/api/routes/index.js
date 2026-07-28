const express = require('express')
const router = express.Router()

// Importation de tes contrôleurs
const registerController = require('../../../controllers/post.controllers.register')
const loginController = require('../../../controllers/post.controllers.login')
const postController = require('../../../controllers/post.controllers') 

// Routes d'authentification
router.post('/register', registerController)
router.post('/login', loginController)

// Routes pour les avis
router.get('/avis', postController.getAvis)
router.post('/add/avis', postController.addAvis)
router.delete('/avis/:id', postController.deleteAvis) // Route pour supprimer un avis

module.exports = router