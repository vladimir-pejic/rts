import express from "express";

const router = express.Router();

router.get('/', (req, res) => {
    res.send('player profile');
})

export default router;