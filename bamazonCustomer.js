var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazonDB"
});
connection.query("select * from products", function (err, response) {
  if (err) {
    throw err;
  }
  console.log("____________");
  console.table(response);
  start();
});


function start() {
  inquirer
    .prompt({
      name: "id",
      type: "input",
      message: "What is the product id you would like to buy?",
      validate: function (value) {
        if (isNaN(value) === false) {
          if (value > 0) {
            return true;
          }
        }
        return false;
      }
    })
    .then(function (answer) {
      var query = "SELECT id FROM products WHERE ?";
      connection.query(query, {
        id: answer.id
      }, function (err, response) {
        for (var i = 0; i < response.length; i++) {}
        unitsSearch(answer.id);
      });
    });
}

function unitsSearch(item) {
  console.log(item);
  inquirer
    .prompt([{
      name: "stock_quantity",
      type: "input",
      message: "How many units would you like to buy?",
      validate: function (answer) {
        if (isNaN(answer) === false) {
          return true;
        }
        return false;
      }
    }])
    .then(function (answer) {
      var query = "SELECT stock_quantity FROM products WHERE ?";
      connection.query(query, {
        id: item
      }, function (err, response) {
        // console.log(answer);
        // console.log(response);
        if (answer.stock_quantity > response[0].stock_quantity) {
          console.log("Insufficient Quantity");
          start();
        } else {
          updateProduct(item, answer.stock_quantity, response[0].stock_quantity);
        }

      });
    });
}

function updateProduct(item, stock_quantity, subQty) {
  console.log("Updating all stock quantities...\n");
  console.log("this is the chosenId " + item + " this is the quantity you would like to remove " + stock_quantity);
  connection.query(
    "UPDATE products SET ? WHERE ?", [{
        stock_quantity: subQty -= stock_quantity
      },
      {
        id: item,

      }
    ],
    function (error, response) {
      // if (error) throw error;
      console.log("updated product successfully!");
      readProducts();
    }
  );
}

function readProducts() {
  console.log("Loading all updated products...\n");
  connection.query("SELECT * FROM products", function (err, response) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(response);
    start();
  });
}
