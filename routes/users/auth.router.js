const router = require('express').Router();
const UserModel = require('../../src/models/userModel');
const bcrypt = require('bcrypt');
const passport = require('passport');

// Ruta para la página de registro
router.get("/signUp", (req, res) => {
    if (req.user) {
        res.redirect('/auth/profile');
    } else {
        res.render('auth/signUp', { user: req.user });
    }
});

// Ruta para manejar el registro
router.post("/signUp", async (req, res) => {
    try {
        let { name, email, password } = req.body;

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = await UserModel.create({
            name,
            email,
            password: hashedPassword,
        });

        if (user) {
            req.login(user, (err) => {
                if (err) {
                    res.status(500).send(err.message);
                } else {
                    res.render('auth/profile', { user });
                }
            });
        } else {
            res.json({ message: 'User not created' });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Ruta para el perfil del usuario
router.get('/profile', (req, res) => {
    if (!req.user) {
        res.redirect('/auth/signIn');
    } else {
        res.render('auth/profile', { user: req.user });
    }
});

// Ruta para la página de inicio de sesión
router.get('/signIn', (req, res) => {
    if (req.user) {
        res.redirect('/auth/profile');
    } else {
        res.render('auth/signIn', { user: req.user });
    }
});

// Ruta para manejar el inicio de sesión
router.post('/signIn', (req, res) => {
    passport.authenticate('local', {
        successReturnToOrRedirect: '/auth/profile',
        failureRedirect: '/auth/signIn',
        keepSessionInfo: true
    })(req, res);
});

// Ruta para cerrar sesión
router.get('/signOut', (req, res) => {
    req.logout(() => {
        res.redirect('/auth/signIn');
    });
});

module.exports = router;