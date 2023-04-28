const { Order } = require('../models');

module.exports = {
    list(req, res) {
        return Order
            .findAll()
            .then((order) => res.status(200).send(order))
            .catch((error) => res.status(400).send(error));
    },
    add(req, res) {
        return Order
            .create({
                user_id: req.body.user_id,
                ordered_date: req.body.ordered_date,
            })
            .then((order) => res.status(201).send(order))
            .catch((error) => res.status(400).send(error));
    },
    getById(req, res) {
        return Order
            .findByPk(req.params.id)
            .then((order) => {
                if (!order) {
                    return res.status(404).send({
                        message: "order not found",
                    });
                }
                return res.status(200).send(order);
            })
            .catch((error) => {
                console.log(error);
                res.status(400).send(error);
            });
    },
    delete(req, res) {
        return Order
            .findByPk(req.params.id)
            .then((order) => {
                if (!order) {
                    return res.status(404).send({
                        message: "reader not found",
                    });
                }
                return order
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
}