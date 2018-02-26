var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("____________");
  console.log("connected as id " + connection.threadId);
//   runSearch();


connection.query("select * from products", function(err, response) {
    if(err) {
      throw err;
    }
    console.log("____________");
    console.log(response);
  });
  
    // connection.end();
  });
  
//   function runSearch() {
//     inquirer
//       .prompt({
//         name: "action",
//         type: "list",
//         message: "What would you like to buy?",
//         choices: [
//           "What is the ID of the product you would like to buy",
//           "Find all artists who appear more than once",
//           "Find data within a specific range",
//           "Search for a specific song"
//         ]
//       })
//       .then(function(answer) {
//         switch (answer.action) {
//           case "Find songs by artist":
//             artistSearch();
//             break;
  
//           case "Find all artists who appear more than once":
//             multiSearch();
//             break;
  
//           case "Find data within a specific range":
//             rangeSearch();
//             break;
  
//           case "Search for a specific song":
//             songSearch();
//             break;
//         }
//       });
//   }



// function start() {
//     inquirer
//     .prompt([
//         {
//         name: "productID",
//         type: "list",
//         message: "Would is the product ID?",
//     },
//     {
//         name: "units",
//         type: "list",
//         messag: "How many units would you like to buy?",
//         validate: function(value) {
//             if (isNaN(value) === false) {
//               return true;
//             }
//             return false;
//           }
//         }
//       ])
//     .then(function(answer){
//         if(answer.

//         }
//     })
// }
