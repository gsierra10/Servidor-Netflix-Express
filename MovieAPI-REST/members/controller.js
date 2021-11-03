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
    let body = req.body;

    Members.findOne({ email: body.email }, (erro, usuarioDB) => {
        if(erro){
            return res.status(500).json({
                ok: false,
                err: erro
            });
        };

        if(!usuarioDB){
            return res.status(400).json({
                ok: false,
                err: {
                    msg: "Usuario o contraseña incorrecta"
                }
            })
        }

        if (! bcrypt.compareSync(body.password, usuarioDB.password)){
            return res.status(400).json({
               ok: false,
               err: {
                 message: "Usuario o contraseña incorrectos"
               }
            });
         }

         let token = jwt.sign({
            usuario: usuarioDB,
         }, process.env.SEED_AUTENTICACION, {
         expiresIn: process.env.CADUCIDAD_TOKEN
     })
         res.json({
         ok: true,
         usuario: usuarioDB,
         token,
     })
    });
}

module.exports.deleteMember = async(req, res) => {
    const member = await Members.findByIdAndDelete(req.params.id)
    res.json({
        delete: member
    });
};
