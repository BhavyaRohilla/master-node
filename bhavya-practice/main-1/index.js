const fs = require("fs");
const { logBlue, logGreen, logRed } = require("./logging");

var dataAsync = "";
var dataSync = "";

function readFileSync(filePath) {
  const data = fs.readFileSync(filePath, { encoding: "utf-8", flag: "r" });
  logGreen(`[Internal] Data read sync completed ${data}`, __function, __line);
  return data;
}

function writeFileSync(filePath, data) {
  try {
    fs.writeFileSync(filePath, data, { encoding: "utf-8", flag: "w" });
    logGreen(`[Internal] Data write sync completed`, __function, __line);
  } catch (err) {
    logRed(`[Internal] Error in writing file`, __function, __line);
  }
}

function writeFileAsync(filePath, data) {
  fs.writeFile(
    filePath,
    data,
    { encoding: "utf-8", flag: "w" },
    (err, data) => {
      if (err) {
        logRed(`[Internal] Error in writing file`, __function, __line);
      } else {
        logGreen(`[Internal] Data write async completed`, __function, __line);
      }
    }
  );
}

function readSyncWriteAsync() {
  console.log("Starting read sync and write async");
  dataSync = readFileSync("./Data-source/input1.txt");
  writeFileAsync("./Data-source/output2.txt", dataSync);
  console.log("Ending read sync and write async");
}

function readWriteSync() {
  console.log("Starting read and write sync");
  dataSync = readFileSync("./Data-source/input1.txt");
  writeFileSync("./Data-source/output1.txt", dataSync);
  console.log("Ending read and write sync");
}

function readFileAsyncPromiseWrapped(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, { encoding: "utf-8", flag: "r" }, (err, data) => {
      if (err) {
        logRed(`[Internal] Error in reading file`, __function, __line);
        reject(err);
      } else {
        logGreen(`[Internal] Data read async completed`, __function, __line);
        resolve(data);
      }
    });
  });
}

function readWriteAsync() {
  console.log("Starting read and write async");
  readFileAsyncPromiseWrapped("./Data-source/input1.txt")
    .then((data) => {
      writeFileAsync("./Data-source/output3.txt");
    })
    .catch((err) => {
      console.log("Failed While reading async");
    });

  console.log("Finishing read and write async");
}

readWriteSync();
readSyncWriteAsync();
readWriteAsync();
