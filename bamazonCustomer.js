var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

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
});

  connection.query("select * from products", function(err, response) {
    if(err) {
      throw err;
    }
    console.log("____________");
    console.table(response);
    runSearch();
  });
  
    // connection.end();
 
  function runSearch() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "Please select from the following",
        choices: [
          "What is the ID of the product you would like to buy?",
          "How many units would you like to buy?"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
          case "What is the ID of the product you would like to buy?":
            idSearch();
            break;
  
          case "How many units would you like to buy?":
            unitsSearch(answer);
            break;
        }
      });
  }

function idSearch() {
    inquirer
    .prompt({
        name: "id",
        type: "input",
        message: "What is the product id?",
        validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
    })
    .then(function(answer) {
        var query = "SELECT id FROM products WHERE ?";
        connection.query(query, { id: answer.id }, function(err, response) {
            console.log(answer);
          for (var i = 0; i < response.length; i++) {
            console.log("ID: " + response[i].id);
          }
          unitsSearch(answer.id);
        });
      });
  }

function unitsSearch(item) {
    console.log(item);
    inquirer
    .prompt([
        {
        name: "stock_quantity",
        type: "input",
        message: "How many units would you like to buy?",
        validate: function(answer) {
            if (isNaN(answer) === false) {
                return true;
            }
            return false;
        }
    }
    ])
    .then(function(answer) {
        console.log("answer " + answer);
        var query = "SELECT stock_quantity FROM products WHERE ?";
        connection.query(query, { stock_quantity: answer.stock_quantity }, function(err, response) {
          for (var i = 0; i < response.length; i++) {
            console.log("ID: " + response[i].stock_quantity);
          }
          updateProduct(answer.quantity, item);
        });
      });
  }


  function updateProduct(chosenID, quantity) {
    console.log("Updating all stock quantities...\n");
    console.log("this is the chosenId" + chosenID + " this is the quantity " + quantity);
    var query = connection.query(
      "UPDATE products SET ? WHERE ?",
      [chosenID, quantity],
      function(err, response) {
        // console.log(response.stock_quantity + " products updated!\n");
        // Call deleteProduct AFTER the UPDATE completes
        readProducts();
      }
    );
  
    // logs the actual query being run
    console.log(query.sql);
  }


  function readProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function(err, response) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(response);
      connection.end();
    });
  }









//   function runSearch() {
//     inquirer
//       .prompt({
//         name: "action",
//         type: "list",
//         message: "Thank you for shopping at bamazon",
//         choices: [
//           "What is the ID of the product you would like to buy?",
//           "How many units would you like to buy?"
//         ]
//       })
//       .then(function(answer) {
//         switch (answer.action) {
//           case "Find id by product":
//             idSearch();
//             break;
  
//           case "Find units availalbe":
//             unitsSearch();
//             break;
//         }
//       });
//   }

// function idSearch() {
//     inquirer
//     .prompt({
//         name: "productID",
//         type: "input",
//         message: "What is the product ID?"
//     })
//     .then(function(answer) {
//         var query = "SELECT id, FROM products WHERE ?";
//         connection.query(query, { id: answer.id }, function(err, response) {
//           for (var i = 0; i < response.length; i++) {
//             console.log("ID: " + ressponse[i].id);
//           }
//           runSearch();
//         });
//       });
//   }


// function unitSearch() {
//     inquirer
//     .prompt({
//         name: "units",
//         type: "input",
//         message: "How many units would you like to buy?"
//     })
//     .then(function(answer) {
//         var query = "SELECT stock_quantity, FROM products WHERE ?";
//         connection.query(query, { stock_quantity: answer.stock_quantity }, function(err, response) {
//           for (var i = 0; i < response.length; i++) {
//             console.log("ID: " + ressponse[i].stock_quantity);
//           }
//           runSearch();
//         });
//       });
//   }
























// function itemAmazon() {
//     connection.query("Select * FROM products", function(err, repsonse) {
//         if (err) throw err;
//         inquirer
//         .prompt([
//             {
//                 name: "choice",
//                 type: "list",
//                 choices: function() {
//                     var choiceArray = [];
//                     for (var i = 0; i < response.length; i++) {
//                         choiceArray.push(response[i].id);
//                     }
//                     return choiceArray;
//                 },
//                 {
//                     name: "buy",
//                     type: "input",
//                     message: "What product item id would you like to buy?"
//                 }
//             ])
//             .then(function(answer){
//                 var chosenItem;
//                 for (var i = 0; i < response.length; i++) {
//                     if (repsonse[i].id === answer.choice) {
//                         chosenItem = response[i];
//                     }
//                 };
//             });
//         }

        










  
 
