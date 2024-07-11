const express = require('express');
const router = express.Router();
const { index, store, show, update, deleteReceta } = require('../../src/controllers/receta');

router.use((req, res, next) => {
    if (req.user) {
        next();
    } else {
        req.session.returnTo = req.originalUrl;
        res.redirect('/auth/signIn');
    }
});

// Index
router.get("/", index);

// Store
router.post("/", store);

// Show
router.get("/:id", show);

// Update
router.post('/:id', update);

// Delete
router.delete("/:id", deleteReceta);

module.exports = router;