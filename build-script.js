const fs = require('fs-extra');
const path = require('path');
const AdmZip = require('adm-zip');

// Define source and distribution paths
const sourceDir = path.resolve(__dirname);
const distDir = path.resolve(__dirname, 'dist');
const zipFilePath = path.resolve(__dirname, 'dist.zip');

// Clear the 'dist' directory before copying files
fs.emptyDirSync(distDir);

// Copy PHP files and other directories except React app files
fs.copySync(path.join(sourceDir, 'Plugin.php'), path.join(distDir, 'Plugin.php'));
fs.copySync(path.join(sourceDir, 'css'), path.join(distDir, 'css'));
fs.copySync(path.join(sourceDir, 'data'), path.join(distDir, 'data'));
fs.copySync(path.join(sourceDir, 'php'), path.join(distDir, 'php'));
fs.copySync(path.join(sourceDir, 'schemas'), path.join(distDir, 'schemas'));
fs.copySync(path.join(sourceDir, 'apps', 'fields', 'build'), path.join(distDir, 'apps', 'fields', 'build'));
// Add more directories as needed

// Exclude React app files (assuming React app is in the 'apps' directory)
const reactAppDir = path.join(sourceDir, 'apps');
const itemsToExclude = ['node_modules', 'package-lock.json']; // Exclude node_modules and package-lock.json
const excludeFilter = item => !itemsToExclude.includes(item);
fs.copySync(reactAppDir, distDir, { filter: excludeFilter });

// Zip the 'dist' directory into 'dist.zip' with progress indicator
const zip = new AdmZip();
zip.addLocalFolder(distDir, 'dist');
zip.writeZip(zipFilePath, (err) => {
  if (err) {
    console.error('Error zipping the files:', err);
  } else {
    console.log('Distribution package (dist.zip) created successfully.');
  }
});

console.log('Zipping files...'); // Progress indicator
