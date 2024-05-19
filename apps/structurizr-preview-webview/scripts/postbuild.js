const fs = require('fs-extra');
const path = require('path');

// Define the source and destination folders relative to the script's location
const source = path.resolve(__dirname, '../build');
const destination = path.resolve(__dirname, '../../structurizr-preview-extension/dist/webview');

async function copyAndRename(sourceDir, destinationDir) {
    try {
        // Copy the directory
        await fs.copy(sourceDir, destinationDir);
        console.log(`Copied ${sourceDir} to ${destinationDir}`);
        
        // Function to recursively traverse directories and rename files
        async function traverseAndRename(currentDir) {
            const items = await fs.readdir(currentDir);

            for (const item of items) {
                const itemPath = path.join(currentDir, item);
                const stat = await fs.stat(itemPath);
                
                if (stat.isDirectory()) {
                    await traverseAndRename(itemPath);
                } else if (stat.isFile()) {
                    const jsPattern = /^main\.[a-f0-9]{8}\.js$/;
                    const jsMapPattern = /^main\.[a-f0-9]{8}\.js.map$/;
                    const cssPattern = /^main\.[a-f0-9]{8}\.css$/;
                    const cssMapPattern = /^main\.[a-f0-9]{8}\.css.map$/;
                
                    if (jsPattern.test(item)) {
                        const newPath = path.join(currentDir, 'main.js');
                        await fs.rename(itemPath, newPath);
                        console.log(`Renamed ${itemPath} to ${newPath}`);
                    } else if (cssPattern.test(item)) {
                        const newPath = path.join(currentDir, 'main.css');
                        await fs.rename(itemPath, newPath);
                        console.log(`Renamed ${itemPath} to ${newPath}`);
                    } else if (jsMapPattern.test(item)) {
                        const newPath = path.join(currentDir, 'main.js.map');
                        await fs.rename(itemPath, newPath);
                        console.log(`Renamed ${itemPath} to ${newPath}`);
                    } else if (cssMapPattern.test(item)) {
                        const newPath = path.join(currentDir, 'main.css.map');
                        await fs.rename(itemPath, newPath);
                        console.log(`Renamed ${itemPath} to ${newPath}`);
                    }
                }
            }
        }

        // Start the traversal from the destination directory
        await traverseAndRename(destinationDir);
    } catch (err) {
        console.error(err);
    }
}
  
// Start the copy and rename process
copyAndRename(source, destination);