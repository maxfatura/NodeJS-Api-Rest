const AtividadeModel = require("../model/AtividadeModel");

const { isPast } = require('date-fns');
const { params } = require("../routes/AtividadeRoutes");

const AtividadeValidation = async(req, res, next) => {
    const { macaddress, type, title, description, when, url } = req.body;
    if(!macaddress) 
        return res.status(400).json({ error : 'macaddress é obrigatório!'});
    else if(!type) 
        return res.status(400).json({ error : 'type é obrigatório!'});
    else if(!title)
        return res.status(400).json({ error : 'Título é obrigatório!'});
    else if(!when)
        return res.status(400).json({ error : 'data e hora são obrigatórios!'});
    else {
        let exists;

        if(req.params.id)
            exists = await  AtividadeModel.findOne({'_id':{'$ne':req.params.id},
                                          'when': {'$eq' : new Date(when)},
                                          'macaddress' : {'$in' : macaddress}});
        else {
            exists = await  AtividadeModel.findOne({'when': {'$eq' : new Date(when)},
                                          'macaddress' : {'$in' : macaddress}});
        }
        if(exists) {
            return res.status(400).json({ error : 'Ja existe uma atividade neste dia!'});
        }
        next();
        }
}
module.exports = AtividadeValidation;