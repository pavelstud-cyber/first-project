var express = require("express");
var router = express.Router();
const userController = require("../controllers").user;
const postController = require("../controllers").post;
const commentController = require("../controllers").comment;
const passport = require('passport');

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
// запросы для пользователей
router.post("/auth/sign_up", userController.signUp);
router.post("/auth/sign_in", userController.signIn);
router.get("/user/profile",passport.authenticate('jwt',{session:false}), userController.getById);
// запросы для постов
router.get("/posts/all",passport.authenticate('jwt',{session:false}), postController.all);
router.get("/posts/all/:lim",passport.authenticate('jwt',{session:false}), postController.all);
router.post("/posts/add",passport.authenticate('jwt',{session:false}), postController.add);
router.get("/posts/post/:id",passport.authenticate('jwt',{session:false}), postController.getById);
router.delete("/posts/post/:id",passport.authenticate('jwt',{session:false}), postController.delete);
router.put("/posts/post/:id",passport.authenticate('jwt',{session:false}), postController.update);
// запросы для коментариев
router.post("/comments/add",passport.authenticate('jwt',{session:false}), commentController.add);
router.delete("/comments/comment/:id",passport.authenticate('jwt',{session:false}), commentController.delete);
router.put("/comments/comment/:id",passport.authenticate('jwt',{session:false}), commentController.update);

module.exports = router;
