var mongoose=require('mongoose')
var schema=mongoose.Schema;
var bcrypt=require('bcrypt')
var employeeSchema=new schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String
    },
    cname:{
        type:String,
        required:true
    }
    
},{timestamps:true},{collection:'employee'})

//Schema pre hooks --i.e. This will be executed before saving details to the certain document.
employeeSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err)
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err)
                }
                user.password = hash;
                next()
            })
        })
    }
    else {
        return next()
    }
})

//Schema methods ---bcrypt method
employeeSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if(err) {
            return cb(err)
        }
        cb(null, isMatch)
    })
}


module.exports = mongoose.model('Employee', employeeSchema)
