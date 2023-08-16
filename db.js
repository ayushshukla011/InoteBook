const mongoose = require('mongoose');

// main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://localhost:27017');

// }
// main();

const uri="mongodb://127.0.0.1:27017/inotebook";
const connectToMongo=()=>{
    mongoose.connect(uri)
}
module.exports=connectToMongo;