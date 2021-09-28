import express from "express";

const router = express.Router();

router.get('/login', (req, res) => {
    res.send('login');
})

router.post('/login', (req, res) => {
    console.log('Sending login request');
})

export default router;