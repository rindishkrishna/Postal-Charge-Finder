require('dotenv').config();

module.exports=function () {
    if(!process.env.PORT){
        console.error('Port not found');
        process.exit(1);
    }

};
