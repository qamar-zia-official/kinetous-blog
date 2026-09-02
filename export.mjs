import { readFile, mkdir } from "node:fs/promises";
import { IconSet, exportToDirectory } from "@iconify/tools";

async function exportAll() {
    const outDir = "./my-svg-collection";
    const collections = JSON.parse(
        await readFile("./node_modules/@iconify/json/collections.json", "utf8"),
    );

    for (const prefix in collections) {
        console.log(`Exporting: ${prefix}...`);
        const data = JSON.parse(
            await readFile(
                `./node_modules/@iconify/json/json/${prefix}.json`,
                "utf8",
            ),
        );
        const iconSet = new IconSet(data);

        await exportToDirectory(iconSet, {
            target: `${outDir}/${prefix}`,
        });
    }
    console.log("✅ Done! All icons are in /my-svg-collection");
}

exportAll();
