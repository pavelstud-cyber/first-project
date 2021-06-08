const user = require("../models").user;
const post = require("../models").post;
const comment = require("../models").comment;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  signUp(req, res) {
    const { email, password, first_name, last_name } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const pass = bcrypt.hashSync(password, salt);

    return user
      .findOne({ where: { email: email } })
      .then((checkUser) => {
        if (checkUser) {
          return res.status(403).send({ message: "Email already use" });
        }
        return user;
      })
      .then((user) => {
        return user
          .create({
            email: email,
            password: pass,
            first_name: first_name,
            last_name: last_name,
          })
          .then((user) => {
            const token = jwt.sign(
              {
                email: user.email,
                user_id: user.id,
              },
              "niki",
              { expiresIn: "12h" }
            );
            res.status(200).setHeader('Authorization',`Bearer ${token}`)
          res.send({id:user.id,
          email:user.email,
          first_name:user.first_name,
          last_name:user.last_name
        
        })
          })

          .catch((error) => res.status(400).send(error));
      });
  },
  signIn(req, res) {
    const { email, password } = req.body;

    return user.findOne({ where: { email: email } }).then((condidate) => {
      if (!condidate) {
        return res.status(401).send({ message: "Email  does not exist" });
      } else {
        const passwordResult = bcrypt.compareSync(password, condidate.password);
        if (passwordResult) {
          const token = jwt.sign(
            {
              email: condidate.email,
              user_id: condidate.id,
            },
            "niki",
            { expiresIn: "12h" }
          );
          res.status(200).setHeader('Authorization',`Bearer ${token}`)
          res.send({id:condidate.id,
          email:condidate.email,
          first_name:condidate.first_name,
          last_name:condidate.last_name
        
        })
        } else {
          return res.status(401).send({ message: "Password  does not match" });
        }
      }
    });
  },
  getById(req, res) {
    
    return user
      .findByPk(req.user.id, {
        include: [
          {
            model: post,
            as: "posts",
          },
          {
            model: comment,
            as: "comments",
          },
        ],
      })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: "user Not Found",
          });
        }
        return res.status(200).send({id:user.id,
          email:user.email,
          first_name:user.first_name,
          last_name:user.last_name,
          posts:user.posts,
          comments:user.comments
        
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  },
};
