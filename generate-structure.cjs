const fs = require('fs');
const path = require('path');

function buildTree(dir, baseDir = '') {
  const tree = {};
  const items = fs.readdirSync(dir);

  for (const item of items) {
    // Skip node_modules, .git, dist, build, and other generated folders
    if (['node_modules', '.git', 'dist', 'build', '.vscode', '.idea'].includes(item)) {
      continue;
    }

    const fullPath = path.join(dir, item);
    const relativePath = path.join(baseDir, item);

    if (fs.statSync(fullPath).isDirectory()) {
      tree[item] = buildTree(fullPath, relativePath);
    } else {
      tree[item] = relativePath.replace(/\\/g, '/');
    }
  }

  return tree;
}

const projectRoot = '.';
const structure = buildTree(projectRoot);

fs.writeFileSync('project-structure.json', JSON.stringify(structure, null, 2));
console.log('Project structure saved to project-structure.json');
