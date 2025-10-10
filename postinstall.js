import path from "node:path";
import fs from "node:fs";

const pkgPath = path.join(targetDir, "package.json");
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
pkg.name = target;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
