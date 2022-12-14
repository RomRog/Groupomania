const router = require('express').Router();
const authController = require('../controllers/auth');
const userController = require('../controllers/user');
const rateLimit = require('express-rate-limit'); // package de prévention des forces brutes
const multer = require('../middleware/multer');
const { requireAuth } = require('../middleware/auth');

const passLimiter = rateLimit({
    windowMs: 2 * 60 * 1000, // Temps défini (en minutes) pour tester l'application
    max: 3 // essais max par adresse ip
});

//auth
router.post("/register", authController.signUp);//s'inscrire
router.post('/login', passLimiter, authController.signIn);//se connecter
router.get('/logout', requireAuth, authController.logout);//se déconnecter

//user display: 'block'
router.get('/', requireAuth, multer, userController.getAllUsers);//voir liste des utilisateurs
router.get('/:id', requireAuth, multer, userController.userInfo);// voir infos d'un utilisateur(profil)
router.put('/:id', requireAuth, multer, userController.updateUser);//modifier un utilisateur
router.delete('/:id', requireAuth, userController.deleteUser);//supprimer un utilisateur
router.patch('/follow/:id', requireAuth, userController.follow);//suivre un utilisateur
router.patch('/unfollow/:id', requireAuth, userController.unfollow);//ne plus suivre un utilisateur


module.exports = router;