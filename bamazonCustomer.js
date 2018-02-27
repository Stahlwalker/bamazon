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

// connection.connect(function(err) {
//   if (err) throw err;
//   console.log("____________");
//   console.log("connected as id " + connection.threadId);
// });

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
        //   "How many units would you like to buy?"
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
          updateProduct(item, answer.stock_quantity);
        });
      });
  }


  function updateProduct(item, stock_quantity) {
    console.log("Updating all stock quantities...\n");
    console.log("this is the chosenId " + item + " this is the quantity you would like to add " + stock_quantity);
    // var query = connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: answer.stock_quantity}, {id: answer.id}]);
    var query = connection.query(
      "UPDATE products SET ? WHERE ?",
      [item, stock_quantity],
      function(err, response) {
        // console.log(response.stock_quantity + " products updated!\n");
        // Call deleteProduct AFTER the UPDATE completes
        readProducts();
      }
    );
  }


  function readProducts() {
    console.log("Loading all updated products...\n");
    connection.query("SELECT * FROM products", function(err, response) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(response);
      // connection.end();
      runSearch();
    });
  }








//   var stockIndex = id;

//   if (answer.stock_quantity < response[stockIndex - 1].stock_quantity){
//       console.log("This is answer.stock " + answer.stock);
//       console.log("This is response[stockIndex - 1].stock_quntity " + response[stockIndex - 1].stock_quantity);

//       var updatedStock =  response[stockIndex - 1].stock_quantity  - answer.stock_quantity;
//       console.log("Success, we have it in stock");

//       connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: updatedStack}, {id: stockIndex}]);

//       console.log("Total cost: " + (response[stockIndex - 1].price) * answer.stock);
//   }

//   else {
//       console.log("Insufficient quantity!");
//   }
