const comment = require("../models").comment;

module.exports = {
  add(req, res) {
    const { title, post_id} = req.body;
    const id=req.user.id
    return comment
      .create({
        title: title,
        post_id: post_id,
        user_id: id,
      })
      .then((comment) => res.status(201).send(comment))
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    const id=req.user.id
    return comment
      .findByPk(req.params.id)
      .then((comment) => {
        if (!comment) {
          return res.status(400).send({
            message: "comment Not Found",
          });
        }else if(comment.user_id!==id){
          return res.status(400).send({message:'You are not the autor'})
        }
        return comment
          .destroy()
          .then(() =>
            res
              .status(200)
              .send({ message: `comment ${req.params.id} deleted` })
          )
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  update(req, res) {
    const { title } = req.body;
    const id=req.user.id
    return comment
      .findByPk(req.params.id)
      .then((comment) => {
        if (!comment) {
          return res.status(400).send({
            message: "comment Not Found",
          });
        }else if(comment.user_id!==id){
          return res.status(400).send({message:'You are not the autor'})
        }
        return comment
          .update({ title: title })
          .then(() => res.status(200).send(comment))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
