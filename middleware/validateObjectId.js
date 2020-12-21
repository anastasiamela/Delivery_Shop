const Joi = require('joi');

module.exports = function (req, res, next) {

    const schema = Joi.object({
        id: Joi.objectId().required()
    });

    const { error } = schema.validate({ id: req.params.id });
    if (error) return res.status(400).send(error.details[0].message);

    console.log('djehdbej');

    next();

}