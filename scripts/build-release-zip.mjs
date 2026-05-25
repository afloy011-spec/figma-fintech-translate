/**
 * Build dist + pack a ready-to-import Figma plugin zip for colleagues.
 * Output: release/Maclear-Translate-Figma.zip
 */
import { copyFileSync, mkdirSync, readFileSync, writeFileSync, rmSync } from "fs";
import { execSync } from "child_process";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const staging = join(root, "release", "_zip-staging");
const outZip = join(root, "release", "Maclear-Translate-Figma.zip");
const readme = join(root, "release", "ПРОЧИТАЙ-МЕНЯ.txt");

console.log("→ npm run build");
execSync("npm run build", { cwd: root, stdio: "inherit" });

const manifest = JSON.parse(readFileSync(join(root, "manifest.json"), "utf8"));
manifest.main = "code.js";
manifest.ui = "ui.html";
delete manifest.capabilities;
delete manifest.enableProposedApi;

rmSync(staging, { recursive: true, force: true });
mkdirSync(staging, { recursive: true });

writeFileSync(join(staging, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
copyFileSync(join(root, "dist", "code.js"), join(staging, "code.js"));
copyFileSync(join(root, "dist", "ui.html"), join(staging, "ui.html"));
copyFileSync(join(root, "dist", "glossary-lookup.js"), join(staging, "glossary-lookup.js"));
copyFileSync(readme, join(staging, "ПРОЧИТАЙ-МЕНЯ.txt"));

const releaseDir = join(root, "release");
writeFileSync(join(releaseDir, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
for (const f of ["code.js", "ui.html", "glossary-lookup.js"]) {
  copyFileSync(join(staging, f), join(releaseDir, f));
}

console.log("→ zip:", outZip);
if (process.platform === "win32") {
  execSync(
    `powershell -NoProfile -Command "Compress-Archive -Path '${staging}\\*' -DestinationPath '${outZip}' -Force"`,
    { stdio: "inherit" },
  );
} else {
  execSync(`cd "${staging}" && zip -r "${outZip}" .`, { stdio: "inherit" });
}

rmSync(staging, { recursive: true, force: true });
console.log("✓", outZip);
