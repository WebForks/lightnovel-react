// run node index.js to start
//http://example.com:3000 - website
//http://example.com:3002/download/{id}  - downloads id in a zipped folder - FolderAPI
//http://example.com:3001/files/{id}/{filename} - download individaul files and url for files to be read by react-reader - FileAPI
//filenames() - scans novels folder and creates json file that contains {id, volumes, and files}

const schedule = require('node-schedule');
const fs = require('fs');
const jsonfile = require('jsonfile')
const express = require('express');
const archiver = require('archiver'); // npm package to archive files
const cors = require('cors');
const path = require('path');


const FolderAPI = express();
const FileAPI = express();

// use { origin: 'URL OF THE WEBSITE' } to specify which url to allow to accept
// https://www.section.io/engineering-education/how-to-use-cors-in-nodejs-with-express/
FolderAPI.use(cors())
FileAPI.use(cors())

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


FileAPI.get("/files/:id/:filename", (req, res) => {
    const fileName = req.params.filename;
    const id = req.params.id;
    const filePath = `../novels/${id}/${fileName}`;
    res.download(
        filePath,
        (err) => {
            if (err) {
                res.send({
                    error: err,
                    msg: "Problem downloading the file"
                })
            }
        });
});

FileAPI.listen(3001, () => console.log("FileAPI listening to port " + 3001))

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

function fileNames() {
    getSubDirectories((subdirectories) => {
        const readPromises = subdirectories.map(subdir => {
            return new Promise((resolve, reject) => {
                fs.readdir(`../novels/${subdir}`, (err, files) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve({ subdir, files });
                });
            });
        });
        Promise.all(readPromises).then(filesArrays => {
            const filesPerDirectory = filesArrays.map(({ subdir, files }) => {
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


/*
// Function to delete a file
const deleteFile = (file) => {
  fs.unlink(file, (err) => {
    if (err) throw err;
    console.log(`Deleted ${file}`);
  });
};

// Recursively search a directory for files
const searchDirectory = (dir) => {
  fs.readdir(dir, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      const filePath = path.join(dir, file);
      fs.stat(filePath, (err, stats) => {
        if (err) throw err;

        // If the file is a regular file (not a directory)
        if (stats.isFile()) {
          // If it's not an .epub file, delete it
          if (!filePath.endsWith('.epub')) {
            deleteFile(filePath);
          }
        } else if (stats.isDirectory()) {
          // If it's a directory, search it recursively
          searchDirectory(filePath);
        }
      });
    });
  });
};

// Call the search function, passing the directory path as an argument
searchDirectory('/path/to/directory');
*/