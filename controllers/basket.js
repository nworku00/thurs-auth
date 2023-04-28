const { Basket } = require('../models');

module.exports = {
    list(req, res) {
        return Basket
            .findAll()
            .then((basket) => res.status(200).send(basket))
            .catch((error) => res.status(400).send(error));
    },
    add(req, res) {
        return Basket
            .create({
                name: req.body.name,
                price: req.body.price,
            })
            .then((basket) => res.status(201).send(basket))
            .catch((error) => res.status(400).send(error));
    },
    getById(req, res) {
        return Basket
            .findByPk(req.params.id)
            .then((basket) => {
                if (!basket) {
                    return res.status(404).send({
                        message: "basket not found",
                    });
                }
                return res.status(200).send(basket);
            })
            .catch((error) => {
                console.log(error);
                res.status(400).send(error);
            });
    },
    delete(req, res) {
        return Basket
            .findByPk(req.params.id)
            .then((basket) => {
                if (!basket) {
                    return res.status(404).send({
                        message: "reader not found",
                    });
                }
                return basket
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
}