
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

before(async () => {
    
    await mongoose.connect(process.env.DB_URL,
        {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );
    await mongoose.connection;
});

after(async () => {
    await clearDB();
    await mongoose.disconnect();
});

const clearDB = () => {
    for (var i in mongoose.connection.collections) {
      mongoose.connection.collections[i].deleteMany(() => {});
    }
};

beforeEach(async () => {
    await clearDB();
});

// beforeEach((done) => {
    
//     const collections = mongoose.connection.db.collections();
//     for (const collection in collections) {

//         collection.deleteMany();
        
//     }

//     done();
// });