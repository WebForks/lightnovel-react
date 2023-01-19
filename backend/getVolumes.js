const schedule = require('node-schedule');
const path = require('path');
const fs = require('fs');
const jsonfile = require('jsonfile')

const directory = './novels'
const FileJson = './src/idVolume.json'


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
                fs.readdir(`./novels/${subdir}`, (err, files) => {
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
