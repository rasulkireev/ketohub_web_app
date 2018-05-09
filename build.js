/* this script is used to 

* copy dist folder into dist-server folder
* delete dist/index.html

*/
const helpers = require('./build.helpers.js');

helpers.copyFolderRecursiveSync('./dist', './functions')
helpers.removeFile('./dist/index.html');

