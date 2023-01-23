// run node getVolumes.js to start

const schedule = require('node-schedule');
const fs = require('fs');
const jsonfile = require('jsonfile')
const express = require('express');
const archiver = require('archiver'); // npm package to archive files
const cors = require('cors');

const FolderAPI = express();
const FileAPI = express();



FolderAPI.get('/download/:id', (req, res) => {
    const id = req.params.id;
    const folderPath = `../novels/${id}`;
    var archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level.
    });
    archive.directory(folderPath, false);
    res.attachment(`${id}.zip`);
    archive.pipe(res);
    archive.finalize();
});

FolderAPI.listen(3002, () => {
    console.log('FolderAPI running on port 3002');
});



FileAPI.use(cors())
FileAPI.get("/download/:id/:filename", (req, res) => {    
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

FileAPI.listen( 3001, () => console.log("FileAPI listening to port " + 3001))




const directory = '../novels'
const FileJson = '../src/idVolume.json'


//gets subdirectorie which is the id for the light novels
function getSubDirectories(callback) {
    fs.readdir(directory, (err, files) => {
        if (err) {
            console.log(`An error occurred: ${err}`);
            return;
        }
        const subdirectories = files.filter(file => {
            const filePath = `${directory}/${file}`;
            return fs.lstatSync(filePath).isDirectory();
        });
        callback(subdirectories);
    });
}

function fileNames () {
    getSubDirectories((subdirectories) => {
        const readPromises = subdirectories.map(subdir => {
            return new Promise((resolve, reject) => {
                fs.readdir(`../novels/${subdir}`, (err, files) => {
                    if (err) {
                      reject(err);
                      return;
                    }
                    resolve({subdir, files});
                });
            });
        });
        Promise.all(readPromises).then(filesArrays => {
            const filesPerDirectory = filesArrays.map(({subdir, files}) => {
                return {
                    id: subdir,
                    volumes: files.length,
                    files: files
                }
            });
            jsonfile.writeFile(FileJson, filesPerDirectory, { spaces: 2 }, (err) => {
                if (err) console.error(err)
            });
        });
    });
}



const rule = new schedule.RecurrenceRule();
rule.hour = 4;
rule.minute = 0;

const job = schedule.scheduleJob(rule, fileNames);
