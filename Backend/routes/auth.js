const express = require('express');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const router = express.Router();

const hashedPasskey = process.env.HASHED_PASSKEY;

router.post('/verify-passkey', (req, res) => {
    const { passkey } = req.body;
    const isMatch = bcrypt.compareSync(passkey, hashedPasskey);
    if (isMatch) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

module.exports = router;
