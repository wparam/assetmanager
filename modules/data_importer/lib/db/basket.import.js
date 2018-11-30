const Importer = require('../importer');
const http = require('http');
const logger = require('logger');
const _  = require('lodash');

module.exports = class BasketImporter extends Importer{
    constructor(models, forceMode){
        super(models, forceMode);
        this._modelName = 'basket';
        this.model = this.models[this._modelName];
    }
    static importerType(){
        return 'basket';
    }

    import() {
        return this.beforeImport().then((d)=>{
            return new Promise((resolve, reject) => {
                if(d.clean)
                    logger.info(`Clean up finished before import:${this._modelName}`);
                this.model.find({"name": "NASDAQ-100"}, function(err, docs){
                    if(err)
                        return reject(err);
                    if(docs.length === 0)
                        return resolve([{
                            "name": "NASDAQ-100",
                            "componentUrl" : "https://www.nasdaq.com/quotes/nasdaq-100-stocks.aspx?render=download",
                            "componentType" : "csv"
                        }]);
                    resolve([]);
                })
            });
        })
        .then(this.insertData.bind(this))
        .catch((err)=>{
            console.log(err.stack);
        }).then(this.afterImport.bind(this));
    }
    
    insertData(data){       
        // data sample: { apple: {chart: []}, fb: {chart: []}, tsla: {chart: []}}
        return new Promise((resolve, reject)=>{
            if(!data || data.length === 0){
                logger.info('Basket importer: Done in insertData, no document need to be inserted');
                return resolve(0);
            }
            this.model.insertMany(data, function(err, docs){
                if(err)
                    return reject(err);
                resolve(docs.length);
            });
        });
    }
}