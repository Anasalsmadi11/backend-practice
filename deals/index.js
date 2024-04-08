'use strict';
require('dotenv').config();
const port = process.env.PORT;
const server = require('./src/server');
const { sequelize } = require('./src/models/index');

const app= require('./src/server')
sequelize.sync(
    // {force:true}
)
    .then((
        
    ) =>{ app.start(port|| 3001);}
    // => {
    //     server.listen(port, () => {
    //         console.log(`server up on port ${port}`)
    //     })
    // }

    )