const Joi = require("joi");

const createBlueprintSchema = Joi.object({
  name: Joi.string().required(),
  souls: Joi.number(),
  cost: Joi.number(),
});

const searchBlueprintSchema = Joi.object({
  name: Joi.string(),
  souls: Joi.object({
    gte: Joi.number(),
    lte: Joi.number(),
  }),
  cost: Joi.object({
    gte: Joi.number(),
    lte: Joi.number(),
  }),
  authorId: Joi.string(),
});

const blueprintSchemaOutput = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  souls: Joi.number(),
  cost: Joi.number(),
  authorId: Joi.string().allow(null),
});

module.exports = {
  createBlueprintSchema,
  searchBlueprintSchema,
  blueprintSchemaOutput,
};
