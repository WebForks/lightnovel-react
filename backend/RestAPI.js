// run node RestAPI.js to start

const express = require("express")
const app = express();
const cors = require('cors');

const PORT = 3001;

app.use(cors())
app.get("/download/:id/:filename", (req, res) => {    
    const fileName = req.params.filename;
    const id = req.params.id;
    const filePath = `../novels/${id}/${fileName}`;
    res.download(
        filePath, 
        (err) => {           
            if (err) {
                res.send({
                    error : err,
                    msg   : "Problem downloading the file"
                })
            }    
        });
});

app.listen( PORT, () => console.log("Server listening to port " + PORT))