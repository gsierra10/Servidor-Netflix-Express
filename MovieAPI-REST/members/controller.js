const bcrypt = require('bcryptjs');
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
            members: await Members.find()
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
    const member = await Members.findByIdAndUpdate(req.params.id, data);
    res.json({
        member: await Members.findById(req.params.id)
    });
};

module.exports.loginMembers = async(req, res) => {
    if (!req.body.email || !req.body.password) {
        res.json({
            message: "invalid member or password"
        }, 400);
    } else {
        const member = await Members.findOne({ email: req.body.email });
        if (!member) {
            res.json({
                message: "invalid member or password"
            }, 400);
        } else {
            try {
                const validated = bcrypt.compareSync(req.body.password, member.password);
                if (validated) {
                    const token = jwt.sign({
                        _id: member._id,
                        role: member.role
                    }, process.env.PRIVATE_KEY, {
                        expiresIn: '5h'
                    });
                    res.json(token);
                } else {
                    res.json({
                        message: "invalid member or password"
                    }, 400);
                }
            } catch (error) {
                console.error(error);
                res.json({
                    message: error.message
                }, 500);
            }
        }
    }
}

module.exports.deleteMember = async(req, res) => {
    const member = await Members.findByIdAndDelete(req.params.id)
    res.json({
        delete: member
    });
};
