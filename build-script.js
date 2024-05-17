const fs = require('fs-extra');
const path = require('path');
const AdmZip = require('adm-zip');

// Read package.json to get the version
const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = require(packageJsonPath);
const version = packageJson.version || '1.0.0';

// Define source and build paths
const sourceDir = path.resolve(__dirname);
const buildDir = path.resolve(__dirname, 'build');
const tmpDir = path.join(buildDir, 'tmp');
const zipFilePath = path.join(buildDir, `f3-${version}.zip`);

// Clear the temporary and output directories before copying files
fs.emptyDirSync(tmpDir);

// Copy PHP files and other directories except React app files
fs.copySync(path.join(sourceDir, 'Plugin.php'), path.join(tmpDir, 'Plugin.php'));
fs.copySync(path.join(sourceDir, 'css'), path.join(tmpDir, 'css'));
fs.copySync(path.join(sourceDir, 'data'), path.join(tmpDir, 'data'));
fs.copySync(path.join(sourceDir, 'php'), path.join(tmpDir, 'php'));
fs.copySync(path.join(sourceDir, 'schemas'), path.join(tmpDir, 'schemas'));

// Copy only the build directory from the React app to temporary directory
fs.copySync(path.join(sourceDir, 'apps', 'fields', 'build'), path.join(tmpDir, 'apps', 'fields', 'build'));

// Zip the temporary directory into f2-[version].zip with progress indicator
const zip = new AdmZip();
zip.addLocalFolder(tmpDir, '');
zip.writeZip(zipFilePath, (err) => {
  if (err) {
    console.error('Error zipping the files:', err);
  } else {
    console.log(`Distribution package (f3-${version}.zip) created successfully.`);
  }

  // Remove the temporary directory after zipping
  fs.removeSync(tmpDir);
});

console.log('Zipping files...'); // Progress indicator
