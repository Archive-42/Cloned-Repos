const express = require('express');
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../auth');
const { Trait, TraitType } = require('../../db/models');
const { sortTraits, normalize } = require('../../utilities');

const router = express.Router();

// Get all Character Traits and Trait Types
router.get(
  '/',
  requireAuth,
  asyncHandler(async (req, res) => {
    const traits = await Trait.findAll({
      attributes: ['id', 'name', 'typeId'],
      include: [
        {
          model: TraitType,
          attributes: ['type'],
        },
      ],
    });

    const sortedTraits = sortTraits(traits);

    res.json({ payload: sortedTraits });
  })
);

// Post a new character Trait
router.post(
  '/',
  requireAuth,
  asyncHandler(async (req, res) => {
    const data = req.body;
    const traitType = await TraitType.findOne({ where: { type: data.type } });
    const trait = await Trait.create({ name: data.name, typeId: traitType.id });
    
    // Not normalized so that Redux can sort by Trait Type and normalize it there
    res.status(201).json({ payload: trait.shapedForRedux(data.type) });
  })
);

module.exports = router;
