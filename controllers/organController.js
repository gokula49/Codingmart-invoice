const boom = require('boom');
const organs = require('../models/organisation');

exports.postOrgan=async(req,reply)=>{

   const organ = new organs({
    user_id:req.body.user_id,
    org_name:req.body.org_name,
    business_location:req.body.business_location,
    state:req.body.state,
    currency:req.body.currency,
    language:req.body.language,
    time_Zone:req.body.time_Zone,
    invoice_status:req.body.invoice_status

   })


    try{
    
    const savedData = await organ.save();
    return reply.send(savedData)
    }
    catch(err){
        throw boom.boomify(err);
    }
}

exports.getOrgbyId = async(req,reply)=>{
    try{
        const organ = await organs.findById({_id:req.params.id})
        return reply.send(organ);
    }
    catch(err) {
        throw boom.boomify(err);
    }
}


