/***
 * @author - Yash Khanduja, 000826385
 * @date - 02/10/2022
 * "StAuth10222: Yash Khanduja, 000826385 certify that this material is my original work. No other person's work has been used without due acknowledgement. 
 *  I have not made my work available to anyone else."
 * 
 */
 const sqlite3 = require("sqlite3").verbose();
 const sqlite = require("sqlite");
 const bodyParser = require('body-parser');
 const express = require('express');
 const app = express();
 app.use(express.json());
 app.use(bodyParser.urlencoded({extended:false}));
 let db;
 app.use(express.urlencoded());

//
// API Endpoints - REST API should be accessible at http://localhost:3000/api/.
// 
/**
 * --REST API--
 * HTTP METHODS FOR COLLECTION - 
 * 
*/

/**
 * GET Request - Collection (Movie)
 */

 app.get("/api", async function(req,res,next)
 {
    try{
        const data = 
        await db.all("SELECT rowid as id, title, release_year, time_viewed FROM Movies");
      console.log(JSON.stringify(data));
      res.json(data); // Call next(); for the next middleware or Send a Response
    }catch(error)
    {
        console.error(error);
    }
  
 });

 /**
  * POST Request - Collection (Movie)
  */

  app.post("/api", (req, res, next) => {
    // JSON object in the request body representing a new item. New item should be added to the current collection.
    db.all(
      `INSERT INTO Movies (title, release_year, time_viewed) VALUES("${req.body.title}", "${req.body.release_year}","${req.body.time_viewed}");`,
     
    ).then(()=>res.send("success")).catch((err)=>{
      res.send("failure")
      console.error(err)
    })
  });

/**
  * PUT Request - Collection (Movie) 
  * 1. Replace the Entire Collection with a New One.
  */
 app.put("/api", (req, res, next) => {
    db.run("DELETE FROM Movies");
    console.log(req.body);
    console.log(JSON.stringify(req.query));
    const {query} = req
   
      db.all(
        `INSERT INTO Movies ( title, release_year, time_viewed) VALUES("${query.title}", "${query.release_year}","${query.time_viewed}");`
       
      ).then(()=>res.send("Success")).catch(()=>res.send("Failed"));
     
   
});

/**
  * DELETE Request - Collection (Movie) 
  */
 app.delete("/api", (req,res,next) => {
    db.all("DELETE FROM Movies", (err, row) => {
      if (err) {
        return res.send(err.message);
      }
      return res.send("DELETE COLLECTION SUCCESSFUL"); //Return Response or Call Next();
    });
  });

/**
 * --REST API--
 * HTTP METHODS FOR ITEM - 
 * 
 */

/**
 * GET REQUEST - ITEM IN MOVIES TABLE 
 */
 app.get("/api/:id", async function(req,res,next)
 {
   const data = 
     await db.run("SELECT rowid as id, title, release_year, time_viewed FROM Movies WHERE rowid = ?", [req.params.id]);
   console.log(data);
   console.log(JSON.stringify(data));
  return res.send(data); // Call next or Send a Request
 });

 /**
 * PUT REQUEST - ITEM IN MOVIES TABLE 
 */
  app.put("/api/:id", async function(req,res,next)
  {
        let title = req.body.title;
        let release_year = req.body.release_year;
        let time_viewed = req.body.time_viewed;
        let rowID = req.params.id;
        console.log(rowID);
        db.all(
            "Update  Movies set  title=?,  release_year=?, time_viewed=?  WHERE rowid = ?", title,release_year,time_viewed, rowID
         
        ).then(()=>{
          res.send("success")
        }).catch((err)=>{
          console.error(err)
          res.send("Failed")
        })
  });

/**
 * DELETE REQUEST - ITEM IN MOVIES TABLE 
 */
 app.delete("/api/:id", (req,res,next) => {
    let movieId = req.params.id;
    console.log(movieId);
    db.all("DELETE FROM Movies WHERE rowid = " + movieId, (err, row) => {
      if (err) {
        return res.send(err.message);
      }
      return res.send("DELETE ITEM SUCCESSFUL");
    });
  });



/**
 * 1. SERVER 
 * 2. SQLite Db
 */
async function startup()
{
  db = await sqlite.open({
    filename: 'api.db',
    driver: sqlite3.Database
  });
  //Database is Initially Empty...
  await db.run("DROP TABLE IF EXISTS Movies");
  await db.run("CREATE TABLE Movies (rowid INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT  NOT NULL, release_year TEXT  NOT NULL, time_viewed TEXT  NOT NULL)");
  
  
  const server = app.listen(3000, function(){
    console.log("Movies REST-API listening on port 3000!")
  });
}

startup();
