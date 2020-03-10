const crypto = require('crypto')
const myKey = localStorage.getItem('secret')


 const companySecret = '@_.;$=!23leo*^.}[@,mfr*95#$5)-?/0%433[^7bgtre:>(<);}' 

 const cryptorize = (string) => {
    console.log(crypto.createHash(companySecret,string))
    
}
module.exports = {key: [companySecret, myKey, cryptorize]}