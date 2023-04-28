const { User } = require('../models');

module.exports = {
    list(req, res) {
        return User
            .findAll()
            .then((user) => res.status(200).send(user))
            .catch((error) => res.status(400).send(error));
    },
    add(req, res) {
        return User
            .create({
                title: req.body.title,
                author: req.body.author,
                reader_id: parseInt(req.body.reader_id),
            })
            .then((user) => res.status(201).send(user))
            .catch((error) => res.status(400).send(error));
    },
    getById(req, res) {
        return User
            .findByPk(req.params.id)
            .then((user) => {
                if (!user) {
                    return res.status(404).send({
                        message: "user not found",
                    });
                }
                return res.status(200).send(user);
            })
            .catch((error) => {
                console.log(error);
                res.status(400).send(error);
            });
    },
    delete(req, res) {
        return User
            .findByPk(req.params.id)
            .then((user) => {
                if (!user) {
                    return res.status(404).send({
                        message: "reader not found",
                    });
                }
                return user
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
}