const bcrypt = require('bcrypt');
const saltRounds = 12;
function hash(password){
    const salt =  bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

function compare(password, hash){
    return bcrypt.compareSync(password, hash);
}

module.exports = {
    hash,
    compare
}