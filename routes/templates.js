const express = require('express');
const jsonschema = require('jsonschema');
const templateGetFilterSchema = require('../schemas/templateGetFilterSchema.json');
const templateCreateSchema = require('../schemas/templateCreateSchema.json');
const templateUpdateSchema = require('../schemas/templateUpdateSchema.json');
const {
  checkLoggedIn,
  checkTemplateOwnerOrAdmin,
} = require('../middleware/auth');
const Template = require('../models/Template');

const {
  BadRequestError,
} = require('../ExpressError');

const router = express.Router();

router.post('/', checkLoggedIn, async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, templateCreateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((err) => err.stack);
      throw new BadRequestError(errs);
    }
    const template = await Template.create({ ...req.body, userId: res.locals.user.username });
    return res.status(201).json({ template });
  } catch (err) {
    return next(err);
  }
});

router.get('/', async (req, res, next) => {
  const q = req.query;
  try {
    const validator = jsonschema.validate(q, templateGetFilterSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }
    const templates = await Template.getAllOrFilterTemplates(q);
    return res.json({ templates });
  } catch (err) {
    return next(err);
  }
});

router.get('/:templateId', checkLoggedIn, async (req, res, next) => {
  try {
    const template = await Template.getTemplate(req.params.templateId);
    return res.json({ template });
  } catch (err) {
    return next(err);
  }
});

router.patch('/:templateId', checkLoggedIn, checkTemplateOwnerOrAdmin, async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, templateUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((err) => err.stack);
      throw new BadRequestError(errs);
    }
    const template = await Template.update(
      req.params.templateId,
      { ...req.body, userId: res.locals.user.username },
    );
    return res.json({ template });
  } catch (err) {
    return next(err);
  }
});

router.delete('/:templateId', checkLoggedIn, checkTemplateOwnerOrAdmin, async (req, res, next) => {
  try {
    await Template.deleteTemplate(req.params.templateId);
    return res.json({ deleted: Number(req.params.templateId) });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
