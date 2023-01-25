const { exec } = require('child_process');

exec('npm run build', (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Create React App built successfully');
  exec('npm install -g serve', (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Create React App started in production mode');
    exec('serve -s build', (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Server running pon port 3000');
    });
  });
});

exec('cd backend && node index.js', (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("started backend");
});
