const { validationResult } = require("express-validator");
const character = require("./db/models/character");


const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map((error) => error.msg);

    const err = Error('Bad request.');
    err.status = 400;
    err.title = 'Bad request.';
    err.errors = errors;
    return next(err);
  }
  next();
};


const normalize = query => {
  const normalized = {};
  
  if (!Array.isArray(query)) return normalized[query.id] = query;
  
  query.forEach(obj => normalized[obj.id] = obj);
  
  return normalized
}

const normalizeTrait = query => {
  const normalized = {}
  
  if (!Array.isArray(query)) {
    
    normalized[query.id] = { id: query.id, name: query.name, type: query.TraitType.type };
    return normalized
  }
  
  query.forEach(obj => normalized[obj.id] = { 
    id: query.id, 
    name: query.name,
    type: query.TraitType.type
  })
  
  return normalized
}


const sortTraits = traits => {
  const sortedTraits = {}
  
  traits.forEach(trait => {
    if (!sortedTraits[trait.TraitType.type]) sortedTraits[trait.TraitType.type] = {};
    sortedTraits[trait.TraitType.type][trait.id] = { 
      id: trait.id,
      name: trait.name,
      type: trait.TraitType.type,
    }
  })
  
  return sortedTraits
}

const shapeAllForRedux = characters => {
  const normalized = {};
  
  characters.forEach(character => normalized[character.id] = character.shapeTraits());
  
  return normalized;
}

const isEmpty = obj => {
  if (!obj) return false;
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}


module.exports = { 
  handleValidationErrors,
  normalize,
  normalizeTrait,
  sortTraits,
  shapeAllForRedux,
  isEmpty,
};