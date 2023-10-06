const { Pool } = require("pg");

const DBConfig = {
  connectionString:"postgres://group_4:uo5oZDrdxycZtgTOVRNSCWn1e10U1rEY@dpg-ck9g7kf0vg2c738qm7ag-a.oregon-postgres.render.com/rymsn_7j8w",
  ssl:{
    rejectUnauthorized: false, 
  },
}; 

const pool = new Pool(DBConfig);

module.exports = pool;