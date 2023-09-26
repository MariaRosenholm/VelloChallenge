import fs from "fs";
import { parse } from "csv-parse";

let dataToJSON = []; // from this array the json is populated
let data = []; // to this array the created document objects are stored
let arrays = [[], [], [], [], []]; // to this array the rows from CSV are stored
let labelNames;
let length = 0; // the row amount of the csv file

const clean = (data, id) => {
  let values = [];
  for (let i = 0; i < data.length; i++) {
    let cleanedData = data[i].replace(/[\[\]']+/g, ""); //cleaning the strings extracted from CSV
    cleanedData = cleanedData.replace(/[^a-zA-zÄÖÜäöüß0-9 ]/g, "").trim(); //cleaning the strings extracted from CSV
    values.push(cleanedData);
  }
  arrays[id].push(values);
};

const readData = function () {
  return new Promise((resolve) => {
    fs.createReadStream("./data-sources/person.csv")
      .pipe(parse())
      .on("data", (row) => {
        let r = JSON.stringify(row, null, 2).split(";"); // changing the row from csv to string
        length = length + 1; // counting the rows of csv

        // below here dividing the rows from csv to separate arrays based on the row account of the csv
        if (length <= 7000) clean(r, 0);
        if (length <= 14000 && length > 7000) clean(r, 1);
        if (length <= 21000 && length > 14000) clean(r, 2);
        if (length <= 28000 && length > 21000) clean(r, 3);
        if (length > 28000) clean(r, 4);

        labelNames = arrays[0][0].slice(0, 5); // extracting column names

        let obj = {};

        // below here creating document object one by one with the arrays array and the label names array
        for (let i = 0; i < arrays.length; i++) {
          arrays[i].forEach((value) => {
            obj[labelNames[0]] = parseInt(value[0]);
            obj[labelNames[1]] = value[1];
            obj[labelNames[2]] = value[2];
            obj[labelNames[3]] = value[3];
            obj[labelNames[4]] = value[4];
          });
        }
        data.push(obj); // pushin created object to data array
      });
    // very important to have this setTimeout so that all of the objects are pushed to data array before using the data array in another function
    setTimeout(function () {
      resolve("Data fetched!");
    }, 25000);
  });
};

const transferData = function () {
  return new Promise((resolve) => {
    dataToJSON = data.slice(1, data.length); // extracting only documents from the array (before this there is still the column names as a first object)

    for (let i = 0; i < dataToJSON.length; i++) {
      // writing one object of a time the documents to the json
      fs.writeFileSync(
        "./data/person.json",
        JSON.stringify(dataToJSON[i], null, 2),
        {
          flag: "a+",
        }
      );
      //adding , after each object
      if (i < dataToJSON.length - 1)
        fs.writeFileSync("./data/person.json", ",", {
          flag: "a+",
        });
    }
    // very important to have this setTimeout so that all of the objects are written to the json before closing the array
    setTimeout(function () {
      resolve("Data fetched!");
    }, 5000);
  });
};

const writeJSONfile = async () => {
  //opening array in json
  fs.writeFileSync("./data/person.json", "[");
  await readData(); // reading data from csv
  await transferData(); // adding data to json
  // closing array in json
  fs.writeFileSync("./data/person.json", "]", {
    flag: "a+",
  });
  console.log("Data successfully imported!");
};

writeJSONfile();
/*


/*
 * TODO
 *
 * Import the data from ./data-sources/person.csv to ./data/person.json
 * It's up to you to choose how you would like to do that.
 */
