const user = require("../models").user;
const post = require("../models").post;
const comment = require("../models").comment;

module.exports = {
  add(req, res) {
    const { title, description, user_id } = req.body;
    const id=req.user.id
    
    return post
      .findOne({where:{title:title,
      description:description,
      user_id:id
      }}).then(checkPost=>{
        if(checkPost){
          return res.status(403).send({
            message:'This post already exist'
          })
        }
        return post
      }).then(post=>{return post .create({
        title: title,
        description: description,
        user_id: id,
      })
      .then((post) => res.status(201).send(post))
      .catch((error) => res.status(400).send(error));})
     
  },
  all(req,res){
    const postLimit=req.params.lim
    return post
    .findAll({include:[{model:comment,as:'comments'}],limit:postLimit,order:['createdAt']}).then(post=>{return res.status(200).send(post)} )
  },
  getById(req, res) {
    return post
      .findByPk(req.params.id, {
        include: [
          {
            model: comment,
            as: "comments",
          },
        ],
      })
      .then((post) => {
        if (!post) {
          return res.status(404).send({
            message: "post Not Found",
          });
        }
        return res.status(200).send(post);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  },
  delete(req, res) {
    const id=req.user.id
    return post
      .findByPk(req.params.id)
      .then((post) => {
        if (!post) {
          return res.status(400).send({
            message: "post Not Found",
          });
        }else if(post.user_id!==id){
          return res.status(400).send({message:'You are not the autor'})
        }
        return post
          .destroy(req.params.id, {
            include: [
              {
                model: comment,
                as: "comments",
              },
            ],
          })
          .then(() =>
            res.status(200).send({ message: `post ${req.params.id} deleted` })
          )
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  update(req, res) {
    const { title, description } = req.body;
    const id=req.user.id
    return post
      .findByPk(req.params.id)
      .then((post) => {
        if (!post) {
          return res.status(400).send({
            message: "post Not Found",
          });
        }else if(post.user_id!==id){
          return res.status(400).send({message:'You are not the autor'})
        }
        return post
          .update({ title: title, description: description })
          .then(() => res.status(200).send(post))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
