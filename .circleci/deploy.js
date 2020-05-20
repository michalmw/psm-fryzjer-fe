var FtpDeploy = require('ftp-deploy');
var ftpDeploy = new FtpDeploy();

var config = {
    user: process.env.FTPUSER,
    password: process.env.FTPPASS,
    host: process.env.FTPHOST,
    port: 21,
    localRoot: __dirname + "/../build/",
    remoteRoot: "/public_html/",
    deleteRemote: true,
    include: ['.htaccess', '*'],
}

ftpDeploy.deploy(config, function(err) {
    if (err) console.log(err)
    else console.log('Pomyślnie wrzucono na serwer');
});