const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
var conn = mongoose.connection;

if(conn.readyState === 0){
    conn = mongoose.connect('mongodb://localhost/asset_manager', {useMongoClient: true});
}

conn.on('error', (err) => {
    console.error(err);
});

const removeDocuments = (modelName, db, done) => {
    if(!modelName)
        return;
    if(typeof db === 'function'){
        done = db;
        db = conn;
    }
    const model = db.model(modelName);
    model.deleteMany({}, function(err){
        if(err){
            return done(err);            
        }
        done(null, true);
    });
}

const loadDocuments = (db,  done) => {
    if(typeof db === 'function'){
        done = db;
        db = conn;
    }
    const dataFolder = path.join(__dirname, 'data');
    return fs.readdir(dataFolder, (err, files)=>{
        if(err)
            return done(err);
        files.forEach((file)=>{
            let filename = path.join(__dirname, file);

        });
        done(null, files);
    });
};

const insertDocuments = (modelName, db, done) => {
    if(!modelName)
        return;
    if(typeof db === 'function'){
        done = db;
        db = conn;
    }
};

const loadData = (db, done)=>{
    if(typeof db === 'function'){
        done = db;
        db = conn;
    }
    if(conn.readyState === 0)
        return done('db is not open');
    return loadDocuments(db, done);
}

module.exports = {
    loadData: loadData,
}