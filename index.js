#!/usr/bin/env node
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import fs from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));

const target = process.argv[2];

if (!target) {
    console.error("❌  Merci de préciser un nom de projet : bun create aduxt <nom>");
    process.exit(1);
}

const targetDir = resolve(process.cwd(), target);
const templateDir = resolve(__dirname, "template");

console.log(`🚀 Création du projet ${target}...`);

fs.cpSync(templateDir, targetDir, { recursive: true });

console.log("🔧 Configuration des fichiers d'environnement...");

const envFiles = [
    { example: resolve(targetDir, "apps/api/.env.example"), target: resolve(targetDir, "apps/api/.env") },
    { example: resolve(targetDir, "apps/web/.env.example"), target: resolve(targetDir, "apps/web/.env") }
];

envFiles.forEach(({ example, target }) => {
    if (fs.existsSync(example)) {
        fs.copyFileSync(example, target);
        console.log(`   ✓ ${target.replace(targetDir + "/", "")} créé`);
    }
});

console.log("📦 Installation des dépendances...");
execSync("bun install", { cwd: targetDir, stdio: "inherit" });

console.log(`\n✅ Projet créé avec succès !`);
console.log(`👉 cd ${target}`);
console.log(`👉 bun dev`);
