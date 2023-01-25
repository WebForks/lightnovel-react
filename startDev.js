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
