const fs = require('fs');
const path = require('path');

function copyFileSync( source, target ) {

    var targetFile = target;

    //if target is a directory a new file with the same name will be created
    if ( fs.existsSync( target ) ) {
        if ( fs.lstatSync( target ).isDirectory() ) {
            targetFile = path.join( target, path.basename( source ) );
        }
    }

    fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync( source, target ) {
    var files = [];

    //check if folder needs to be created or updated
    var targetFolder = path.join(target, path.basename( source ) );
    if ( !fs.existsSync( targetFolder ) ) {
        fs.mkdirSync( targetFolder );
    }
    //copy all files & folders in directory recursively
    if ( fs.lstatSync( source ).isDirectory() ) {
        files = fs.readdirSync( source );
        files.forEach( function ( file ) {
            var curSource = path.join( source, file );
            if ( fs.lstatSync( curSource ).isDirectory() ) {
                copyFolderRecursiveSync( curSource, targetFolder );
            } else {
                copyFileSync( curSource, targetFolder );
            }
        } );
    }
}

function removeFile(target) {
    //remove file IF it exists
   const checkFileExists = s => new Promise(r=>fs.access(s, fs.F_OK, e => r(!e)))
   checkFileExists(target)
    .then(bool => bool && fs.unlinkSync(target))
}

exports.copyFolderRecursiveSync = copyFolderRecursiveSync;
exports.removeFile = removeFile;