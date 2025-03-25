const readline = require("readline");
const {
  addRecord,
  getRecordById,
  getAllRecords,
  updateRecord,
  deleteRecord,
} = require("./index");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const menu = `
Choose an option:
1. Add a Record
2. View All Records
3. View Record by ID
4. Update Record by ID
5. Delete Record by ID
6. Exit
`;

const runCLI = () => {
  console.log(menu);
  rl.question("Enter your choice: ", (choice) => {
    switch (choice) {
      case "1":
        rl.question("Enter Name: ", (name) => {
          rl.question("Enter Age: ", (age) => {
            rl.question("Enter Email: ", (email) => {
              addRecord({ name, age: parseInt(age), email });
              runCLI();
            });
          });
        });
        break;
      case "2":
        console.log(getAllRecords());
        runCLI();
        break;
      case "3":
        rl.question("Enter Record ID: ", (id) => {
          console.log(getRecordById(Number(id)));
          runCLI();
        });
        break;
      case "4":
        rl.question("Enter Record ID: ", (id) => {
          const record = getRecordById(Number(id));

          if (!record) {
            console.log("Record not found.");
            runCLI();
            return;
          }

          rl.question(`Enter Name (${record.name}): `, (name) => {
            rl.question(`Enter Age (${record.age}): `, (age) => {
              rl.question(`Enter Email (${record.email}): `, (email) => {
                const updatedData = {};

                if (name.trim()) updatedData.name = name; // Keep original if skipped
                if (age.trim()) updatedData.age = parseInt(age);
                if (email.trim()) updatedData.email = email;

                updateRecord(Number(id), updatedData);
                console.log("Record updated successfully!");
                runCLI();
              });
            });
          });
        });

      case "5":
        rl.question("Enter Record ID: ", (id) => {
          deleteRecord(Number(id));
          runCLI();
        });
        break;
      case "6":
        rl.close();
        break;
      default:
        console.log("Invalid Choice");
        runCLI();
    }
  });
};

runCLI();
