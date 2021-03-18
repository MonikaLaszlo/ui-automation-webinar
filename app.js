const MongoClient = require('mongodb').MongoClient;

let db;

const url = 'mongodb://localhost:27017';
const dbName = 'myproject';
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

const connect = () => new Promise((resolve, reject) => {
    client.connect(err => {
        if (err) return reject(err);
        db = client.db(dbName);
        resolve();
    });
});

const close = () => new Promise((resolve, reject) => {
    client.close(err => {
        if (err) return reject(err);
        resolve();
    })
});


const insertDocuments = () => new Promise((resolve, reject) => {
    const objects = [
        {
            "Country": "Hungary",
            "City": "Debrecen",
            "Skill": "Software Test Engineering",
            "Position": "Test Automation Engineer"
        },
        {
            "Country": "Netherlands",
            "City": "Hoofddorp",
            "Skill": "Software Architecture",
            "Position": "Storage Solution Architect"
        }];

    db.collection('positions').insertMany(objects, (err, result) => {
        if (err) return reject(err);
        resolve(result);
    });
});

const findDocuments = () => new Promise((resolve, reject) => {
    db.collection('positions').find().toArray((err, result) => {
        if (err) return reject(err);
        resolve(result);
    });
});

const getTestData = async () => {
    let data;
    await connect();
    try {
        data = await findDocuments();
        if (!data || data.length === 0) {
            await insertDocuments();
            data = await findDocuments();
        }
    } finally {
        await close();
        return data;
    }

};

module.exports = { getTestData };