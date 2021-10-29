const express = require('express');
const Members = require('./model');
const router = express.Router();


module.exports.createMember = async (req, res) => {
    const newMember = new Members(req.body);
    await newMember.save();
    res.json(newMember);
};