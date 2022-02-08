import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ESM specific features
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const getRandomFileName = () => {
  return uuidv4() + ".txt";
};

export const writeToGenerated = (data, filename) => {
  const storeAtPath = path.resolve(
    __dirname,
    "../../src/generated/",
    filename || getRandomFileName()
  );

  const content =
    typeof data === "string" ? data : JSON.stringify(data, null, 2);

  fs.writeFile(storeAtPath, content, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    //file written successfully
  });
};
