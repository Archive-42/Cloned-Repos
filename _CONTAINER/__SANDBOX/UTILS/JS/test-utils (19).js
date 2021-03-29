try {
  const { resolve } = require('path');
  const models = require('../models');

  exports.close = () => models.sequelize.close();

  exports.migrationsConfig = {
    storage: "sequelize",
    storageOptions: {
      sequelize: models.sequelize
    },
    migrations: {
      params: [
        models.sequelize.getQueryInterface(),
        models.sequelize.constructor
      ],
      path: resolve(__dirname, '..', 'migrations'),
      pattern: /\.js$/
    }
  };

  exports.seedsConfig = {
    storage: "sequelize",
    storageOptions: {
      sequelize: models.sequelize,
      modelName: 'SequelizeData'
    },
    migrations: {
      params: [
        models.sequelize.getQueryInterface(),
        models.sequelize.constructor
      ],
      path: resolve(__dirname, '..', 'seeders'),
      pattern: /\.js$/
    }
  }

} catch (e) {
  console.error(e);
  exports.moduleInitializationErrorMessage = `Error trying to load modules. See stack trace above. ${e.message}`;
}

exports.loadModel = names => {
  try {
    if (!Array.isArray(names)) names = [names];

    const loadableModels = require('../models');
    const modelMapping = names.map(name => loadableModels[name] || { missing: name });
    let missingNames = [];
    for (let model of modelMapping) {
      if (model.missing) {
        missingNames.push(model.missing);
      }
    }
    if (missingNames.length > 0) {
      return { error: `Could not load models ${missingNames.join(', ')}` };
    }
    const models = modelMapping.reduce((acc, value, i) => {
      acc[names[i]] = value;
      return acc;
    }, {});
    return { models };
  } catch (e) {
    return { error: e };
  }
};

exports.pause = seconds => {
  return new Promise(good => {
    setTimeout(good, seconds * 1000);
  });
};
