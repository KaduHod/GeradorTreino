const bcrypt = require('bcryptjs')

async function encriptografa(SenhaForm){
    const salt = bcrypt.genSaltSync(10)
    const passHash = await bcrypt.hash(SenhaForm, salt)
    SenhaForm = passHash
    return SenhaForm
}

module.exports = {
    encriptografa
}