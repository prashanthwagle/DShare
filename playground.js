var crypto = require('crypto');
var name = 'Some Important Date';
var hash = crypto.createHash('md5').update(name).digest('hex');
console.log(hash);