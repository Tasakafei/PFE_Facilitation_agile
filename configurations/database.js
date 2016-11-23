/************************************************
 * AUTHOR:         Alexandre Cazala             *
 * CREATION_DATE:  23/11/16                      *
 * EMAIL:          alexandre.cazala@gmail.com   *
 * LICENSE:        Apache 2.0                   *
 ***********************************************/

module.exports = {
    port: process.env.PORT || 3000,
    db: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/test'
}