// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================

const express = require("express");
// Tells node that we are creating an "express" server
const app = express ();
const fs = require ("fs");
const path = require ("path");
// const DirectoryPath = path.resolve(__dirname, "db");
// const outputPath = path.join(DirectoryPath, "db.json");
// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 4060


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static("public"));

// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================
module.exports = function(app) {
app.get("/api/notes", function(req, res) {
 fs.readFile("db/db.json", "utf8",(err, data)=>{
     if (err) throw err;
      console.log(data);
     return res.json(data);
 });
});
 app.post("/api/notes", function(req, res) {
    fs.readFile("db/db.json", "utf8",(err, data)=>{
        if (err) throw err;
        const dbJson = JSON.parse(data);
        let newID = 0
        if(dbJson !== [] || dbJson !==[{}]){
            newID = dbJson[dbJson.length-1].id + 1;
        }

        const newEntry = {id: newID, ...req.body};
        dbJson.push(newEntry);
        fs.writeFile("db/db.json",JSON.stringify(dbJson, null, 2, + ","), (err)=> {
            if (err) throw err;
            return res.json(newEntry);
        })
    });
});

};

//  app.delete("/api/notes/:id", async (req, res) => {
//     fs.readFile(outputPath, "utf8",(err, data)=>{
//         if (err) throw err;
//         const newID = JSON.findByIdAndDelete(req.params.id);
//              fs.writeFile(outputPath,JSON.stringify(newID), null, + ","), (err)=> {
//                  if (err) throw err;
//                  return res.json(newEntry);
//            };
//         });
//     }); 

// =============================================================================
// LISTENER
// "starts" our server
// =============================================================================

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
