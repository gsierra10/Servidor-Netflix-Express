const express = require('express');
const Members = require('./model');

module.exports.getMembers = async(req, res) => {
    if (req.query.name) {
        const members = await Members.find({ name: { $regex: new RegExp(req.query.name, 'i') } });
        res.json({
            Members: members
        });
    } else {
        res.json({
            members: await User.find()
        });
    }
};

module.exports.createMember = async (req, res) => {
    const newMember = new Members(req.body);
    await newMember.save();
    res.json(newMember);
};