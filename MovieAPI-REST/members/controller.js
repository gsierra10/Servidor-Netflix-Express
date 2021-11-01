const express = require('express');
const Members = require('./model');
const jwt = require('jsonwebtoken')

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

module.exports.getMember = async(req, res) => res.json({
    member: await Members.findById(req.params.id)
});

module.exports.changeMember = async(req, res) => {
    let data = req.body;
    const member = await User.findByIdAndUpdate(req.params.id, data);
    res.json({
        member: await User.findById(req.params.id)
    });
};

module.exports.deleteMember = async(req, res) => {
    const member = await User.findByIdAndDelete(req.params.id)
    res.json({
        delete: member
    });
};
