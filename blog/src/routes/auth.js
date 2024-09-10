import express from 'express';
const router = express.Router();

import {register, login, logout}  from '../app/controllers/authController.js';
import {authenticateToken} from '../middlewares/authMiddlewares.js';

//render ra view register
router.get('/register', (req,res)=> {
    res.render('register');
});
router.post('/register', register);
//render ra view login
router.get('/login', (req,res)=> {
    res.render('login');
});
router.post('/login', login);

router.get('/logout', logout);

router.get('/', authenticateToken, (req, res)=> {
    res.render('home', {user: req.user});
});

router.get('/home', (req, res)=> {
    if(!req.cookies.token) {
        res.redirect('/register');
    } else {
        res.redirect('/home');
    }
});

export default router;