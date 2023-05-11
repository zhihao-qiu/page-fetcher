const argv = process.argv.splice(2);

const fromFile = argv[0];
const toFile = argv[1];
const request = require('request');
const fs = require('fs');

const rl = require("readline");

const rlInstance = rl.createInterface({
  input: process.stdin,
  output: process.stdout
});

request(fromFile, (error, response, body) => {
  if (error) console.log('error:', error); // Print the error if one occurred

  if (fs.existsSync(toFile)) {
    //file exists
    rlInstance.question("The file is existed, are you going to overwrite it? Press Y to confirm...", function(answer) {
      if (answer === 'Y') {
        fs.writeFile(toFile, body, function(err) {
          if (err) throw err;
              console.log(`Downloaded and saved ${body.length} bytes to ${toFile}!`);
        });
      } else {
        console.log(`Nothing was downloaded!`);
      }
      rlInstance.close();
    });
  }

});




