const { v4: uuidv4 } = require('uuid');
const db = require('../config/db');

// GET /api/favorites
const getFavorites = (req, res, next) => {
  try {
    const favorites = db.get('favorites').filter({ userId: req.user.id }).value();
    return res.status(200).json({
      success: true,
      count: favorites.length,
      data: favorites
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/favorites
const addFavorite = (req, res, next) => {
  try {
    const { countryCode, countryName, flagUrl, region, population, capital, note } = req.body;

    if (!countryCode || !countryName) {
      return res.status(400).json({
        success: false,
        message: 'countryCode and countryName are required.'
      });
    }

    const existing = db.get('favorites')
      .find({ userId: req.user.id, countryCode })
      .value();

    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'This country is already in your favorites.'
      });
    }

    const newFavorite = {
      id: uuidv4(),
      userId: req.user.id,
      countryCode,
      countryName,
      flagUrl: flagUrl || '',
      region: region || '',
      population: population || 0,
      capital: capital || '',
      note: note || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    db.get('favorites').push(newFavorite).write();

    return res.status(201).json({
      success: true,
      message: 'Country added to favorites.',
      data: newFavorite
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/favorites/:id
const updateFavorite = (req, res, next) => {
  try {
    const { id } = req.params;
    const { note } = req.body;

    const favorite = db.get('favorites').find({ id, userId: req.user.id }).value();

    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: 'Favorite not found.'
      });
    }

    db.get('favorites')
      .find({ id, userId: req.user.id })
      .assign({ note: note !== undefined ? note : favorite.note, updatedAt: new Date().toISOString() })
      .write();

    const updated = db.get('favorites').find({ id }).value();

    return res.status(200).json({
      success: true,
      message: 'Favorite updated successfully.',
      data: updated
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/favorites/:id
const deleteFavorite = (req, res, next) => {
  try {
    const { id } = req.params;

    const favorite = db.get('favorites').find({ id, userId: req.user.id }).value();

    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: 'Favorite not found.'
      });
    }

    db.get('favorites').remove({ id, userId: req.user.id }).write();

    return res.status(200).json({
      success: true,
      message: 'Favorite removed successfully.'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getFavorites, addFavorite, updateFavorite, deleteFavorite };
