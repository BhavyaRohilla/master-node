const fs = require("fs");
const { logBlue, logGreen, logRed } = require("../main-1/logging");
const path = require("path");

const dbFile = path.join(__dirname, "DataBase/database.json");

// Ensure that the file exists
fs.mkdirSync(path.dirname(dbFile), { recursive: true });
if (!fs.existsSync(dbFile)) {
  fs.writeFileSync(dbFile, JSON.stringify([]));
}

function getRecordById(id) {
  const records = readDatabase();
  const record = records.find((record) => record.id === id);

  if (!record) {
    logRed(`[Internal] Record with id ${id} not found`, __function, __line);
  }
  return record;
}

const readDatabase = () => {
  const data = fs.readFileSync(dbFile, { encoding: "utf-8", flag: "r" });
  return JSON.parse(data).map((record) => ({
    ...record,
    id: Number(record.id),
  }));
};

const getAllRecords = () => {
  return readDatabase();
};

const addRecord = (newRecord) => {
  // Read Existing Data
  const data = JSON.parse(
    fs.readFileSync(dbFile, { encoding: "utf-8", flag: "r" })
  );

  // Assign a unique ID
  newRecord.id = Date.now();

  // Append new data
  data.push(newRecord);

  fs.writeFileSync(dbFile, JSON.stringify(data, null, 2));
  console.log("Record Added Successfully");
};

const writeDatabase = (data) => {
  fs.writeFileSync(dbFile, JSON.stringify(data, null, 2));
};

const updateRecord = (id, newData) => {
  const records = readDatabase();
  const index = records.findIndex((record) => record.id === id);
  if (index === -1) {
    logRed(`[Internal] Record with id ${id} not found`, __function, __line);
    return;
  }
  records[index] = { ...records[index], ...newData };
  writeDatabase(records);
  console.log("Record Updated Successfully");
};

const deleteRecord = (id) => {
  let records = readDatabase();
  const filterRecords = records.filter((r) => r.id !== id);
  if (records.length === filterRecords.length) {
    logRed(`[Internal] Record with id ${id} not found`, __function, __line);
    return;
  }

  writeDatabase(filterRecords);
  console.log("Record Deleted Successfully");
};

module.exports = {
  getRecordById,
  getAllRecords,
  addRecord,
  updateRecord,
  deleteRecord,
};
