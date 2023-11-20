const fs = require("fs").promises;
const fastglob = require("fast-glob");

async function getBatch() {
    let verticals = await fastglob("./_data/sites/*.js", {
        caseSensitiveMatch: false,
    });

    // Assuming BATCH_SIZE is the desired number of sites to test in parallel
    const BATCH_SIZE = 10; // Adjust this as needed

    let batches = [];
    for (let i = 0; i < verticals.length; i += BATCH_SIZE) {
        let batch = verticals.slice(i, i + BATCH_SIZE);
        batches.push(batch);
    }

    // Output batches as JSON
    await fs.writeFile("./_data/batches.json", JSON.stringify(batches, null, 2));
}

getBatch();
