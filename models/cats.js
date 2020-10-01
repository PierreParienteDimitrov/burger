const orm = require('../config/orm')

const cat = {
    all: function (cb) {
        orm.all('cats', function (res) {
            cb(res)
        })
    },
    create: function (cols, vals, cb) {
        orm.create('cats', cols, vals, function (res) {
            cb(res)
        })
    },
    udpate: function (objColVals, condition, cb) {
        orm.udpate('cats', objColVals, condition, function (res) {
            cb(res)
        })

    },
    delete: function (condition, cb) {
        orm.delete('cats', condition, function (res) {
            cb(res)
        })
    }
}

module.exports = cat