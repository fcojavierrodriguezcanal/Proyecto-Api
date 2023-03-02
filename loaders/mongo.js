import mongoose from 'mongoose';
mongoose.set('strictQuery', true);

mongoose.Promise = global.Promise;

/*
mongoose.connect('mongodb+srv://javierro222:adaits@cluster0.ky8z94l.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {

        console.log(" Conected DB: Mongodb");

    })
    .catch(err => console.log(err));
*/

const mongoDB = "mongodb+srv://javierro222:adaits@cluster0.ky8z94l.mongodb.net/?retryWrites=true&w=majority";

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(mongoDB);
}

export { mongoose };