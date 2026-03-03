const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      // Replace @/app/components with @/components
      content = content.replace(/from\s+["']@\/app\/components(.*)["']/g, 'from "@/components$1"');
      
      // Replace relative component imports like ../components or ../../components etc with @/components
      content = content.replace(/from\s+["'](?:\.+[/\\])+components(.*)["']/g, 'from "@/components$1"');
      
      // Also catch dynamic imports
      content = content.replace(/import\s*\(\s*["']@\/app\/components(.*)["']\s*\)/g, 'import("@/components$1")');
      content = content.replace(/import\s*\(\s*["'](?:\.+[/\\])+components(.*)["']\s*\)/g, 'import("@/components$1")');

      // What about import components without "from"? like import "@/app/components/..."
      content = content.replace(/import\s+["']@\/app\/components(.*)["']/g, 'import "@/components$1"');
      content = content.replace(/import\s+["'](?:\.+[/\\])+components(.*)["']/g, 'import "@/components$1"');

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated imports in ${fullPath}`);
      }
    }
  }
}

// Ensure the src directory exists
const srcPath = path.join(__dirname, 'src');
if (fs.existsSync(srcPath)) {
  processDir(srcPath);
  console.log("Finished updating imports.");
} else {
  console.error("src directory not found");
}
