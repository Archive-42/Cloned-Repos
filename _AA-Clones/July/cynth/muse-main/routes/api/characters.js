const express = require('express');
const asyncHandler = require('express-async-handler');
const { Op } = require('sequelize');

const { requireAuth } = require('../../auth');
const { shapeAllForRedux, normalize } = require('../../utilities');
const { Character, CharacterTrait, Trait, TraitType } = require('../../db/models');
const db = require('../../db/models/index')

const router = express.Router();

router.get(
  '/',
  requireAuth,
  asyncHandler(async (req, res) => {
    const characters = await Character.findAll({
      attributes: ['id', 'imageUrl', 'bio'],
      include: [
        {
          model: CharacterTrait,
          attributes: ['id'],
          include: [
            {
              model: Trait,
              attributes: ['id'],
              include: [
                {
                  model: TraitType,
                  attributes: ['type'],
                }
              ]
            }
          ]
        }
      ]
    });
    
    res.json({ payload: shapeAllForRedux(characters) });
  })
);

router.post(
  '/',
  requireAuth,
  asyncHandler(async (req, res) => {
    // console.log('***\n\nPOST CHARACTER\n\n***')
    const { 
      imageUrl, 
      bio, 
      firstName, 
      lastName, 
      physical, 
      strengths, 
      weaknesses,
      motivations,
      secrets,
    } = req.body;
    // console.log(`****\n\nImage URL: `, imageUrl);
    const character = await Character.create({
      imageUrl,
      bio,
    });
    // console.log(`****\n\nCharacter: ${character}\n\n${character.imageUrl}\n\n****`)
    const characterTraits = [
      { characterId: character.id, traitId: firstName.id },
      { characterId: character.id, traitId: lastName.id },
      { characterId: character.id, traitId: physical.id },
      { characterId: character.id, traitId: strengths.id },
      { characterId: character.id, traitId: weaknesses.id },
      { characterId: character.id, traitId: motivations.id },
      { characterId: character.id, traitId: secrets.id },
    ];

    await CharacterTrait.bulkCreate(characterTraits, {
      // ignoreDuplicates: true
    });

    const eagerCharacter = await Character.findOne({
      where: { id: character.id },
      attributes: ['id', 'imageUrl', 'bio'],
      include: [
        {
          model: CharacterTrait,
          attributes: ['id'],
          include: [
            {
              model: Trait,
              attributes: ['id'],
              include: [
                {
                  model: TraitType,
                  attributes: ['type'],
                }
              ]
            }
          ]
        }
      ]
    });
    // console.log(`****\n\nEagerCharacter: ${eagerCharacter}\n\n${eagerCharacter.imageUrl}\n\n****`)

    res.status(201).json({ 
      payload: normalize(eagerCharacter.shapeTraits()), 
      status: 'success' 
    });
  })
);


router.patch(
  '/:id',
  requireAuth,
  asyncHandler(async (req, res) => {
    const characterId = parseInt(req.params.id, 10);
    const { imageUrl, bio, oldTraits, newTraits } = req.body;
    
  
      // const updatedCharacter = 
      await db.sequelize.transaction(async (t) => {
        const character = await Character.findOne({
          where: { id: characterId },
          attributes: ['id', 'imageUrl', 'bio']
        });
        
        if (imageUrl) character.imageUrl = imageUrl;
        if (bio) character.bio = bio;
        
        const characterTraits = await CharacterTrait.findAll({
          where: {
            characterId,
            traitId: {
              [Op.or]: oldTraits
            },
          },
        });
        
        
        for (let i = 0; i < characterTraits.length; i++) {
          characterTraits[i].traitId = newTraits[i];
          characterTraits[i].save();
        }
        
        character.save()
        // return character;
      });
      
      const updatedCharacter = await Character.findOne({
        where: { id: characterId },
        attributes: ['id', 'imageUrl', 'bio'],
        include: [
          {
            model: CharacterTrait,
            attributes: ['id'],
            include: [
              {
                model: Trait,
                attributes: ['id'],
                include: [
                  {
                    model: TraitType,
                    attributes: ['type'],
                  }
                ]
              }
            ]
          }
        ]
      });
      
      res.json({ payload: normalize(updatedCharacter.shapeTraits()), status: 'updated' });
      
  })
)


router.delete(
  '/:id',
  requireAuth,
  asyncHandler(async (req, res) => {
    const characterId = parseInt(req.params.id, 10);
    
    await CharacterTrait.destroy({ where: { characterId }})
    
    const character = await Character.findByPk(characterId);
    await character.destroy()
    
    res.status(200).json({ payload: characterId, status: 'deleted' })
  })
)


module.exports = router;
