const router = require("express").Router();
const authController = require("../controllers/auth");
const userController = require("../controllers/user");
const uploadController = require("../controllers/upload");
const multer = require("multer");
const upload = multer();

//auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

//users
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.delete("/:id", userController.deleteUser);

//upload
router.post("/upload", upload.single("file"), uploadController.uploadProfil);

module.exports = router;
