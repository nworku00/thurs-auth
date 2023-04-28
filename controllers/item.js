const { Item } = require('../models');

module.exports = {
    list(req, res) {
        return Item
            .findAll()
            .then((item) => res.status(200).send(item))
            .catch((error) => res.status(400).send(error));
    },
    add(req, res) {
        return Item
            .create({
                name: req.body.name,
                price: req.body.price,
            })
            .then((item) => res.status(201).send(item))
            .catch((error) => res.status(400).send(error));
    },
    getById(req, res) {
        return Item
            .findByPk(req.params.id)
            .then((item) => {
                if (!item) {
                    return res.status(404).send({
                        message: "item not found",
                    });
                }
                return res.status(200).send(item);
            })
            .catch((error) => {
                console.log(error);
                res.status(400).send(error);
            });
    },
    delete(req, res) {
        return Item
            .findByPk(req.params.id)
            .then((item) => {
                if (!item) {
                    return res.status(404).send({
                        message: "reader not found",
                    });
                }
                return item
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
}