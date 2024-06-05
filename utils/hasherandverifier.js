const argon2 = require('argon2');


async function hashPassword(password){
    try{
        const hash = await argon2.hash(password);
        return hash;
    }catch(error){
        return null;
    }

}

async function verifyPassword(hash, password){
    try{
        console.log("LA RE PUT")
        console.log("el hach "+hash+ " y la pass " +password)
        console.log("PASS BD: $argon2id$v=19$m=65536,t=3,p=4$H6tb2MLHEt4/nR2y4qZ2wA$kOTzBSOufAoy1t+s6tAQaZNanpCV3AdarwyMY0OElRI")
        

        const validate = await argon2.verify(hash, "amo_a_mi_michi01")
        console.log("el validate "+validate)


        /*const hash = await argon2.hash("sexo");
        const validateTrucho = await argon2.verify(hash, "sexo")
        console.log("trucheao: "+validateTrucho)*/


        return validate;
    } catch(error){
        //return false;
        return error;
    }
}

module.exports = {hashPassword, verifyPassword};