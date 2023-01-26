//start development of website frontend and backend. "node startDev.js"
//node index.js runs port 3001 and 3002
//react site runs port 3000

const { exec } = require('child_process');

exec('npm start', (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('started React App');
});

exec('cd backend && node index.js', (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("started backend");
});
