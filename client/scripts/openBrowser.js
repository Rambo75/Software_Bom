import open from "open";

// Change this URL to match your application's main page
const url = "http://localhost:5173/";

// Open the default web browser with the specified URL
open(url, { wait: false })
  .then(() => {
    console.log(`Opened the default browser at: ${url}`);
  })
  .catch((error) => {
    console.error(`Error opening the browser: ${error.message}`);
  });
