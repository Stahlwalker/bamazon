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



connection.query("select * from products", function(err, response) {
    if(err) {
      throw err;
    }
    console.log("____________");
    console.log(response);
    runSearch();
  });
  
    // connection.end();
  });
  
 

  function runSearch() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "Thank you for shopping at bamazon",
        choices: [
          "What is the ID of the product you would like to buy?",
          "How many units would you like to buy?"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
          case "Find id by product":
            idSearch();
            break;
  
          case "Find units availalbe":
            unitsSearch();
            break;
        }
      });
  }

function idSearch() {
    inquirer
    .prompt({
        name: "productID",
        type: "list",
        message: "What is the product ID?"
    })
    .then(function(answer) {
        var query = "SELECT id, FROM products WHERE ?";
        connection.query(query, { id: answer.id }, function(err, response) {
          for (var i = 0; i < response.length; i++) {
            console.log("ID: " + ressponse[i].id);
          }
          runSearch();
        });
      });
  }


function idSearch() {
    inquirer
    .prompt({
        name: "units",
        type: "list",
        message: "How many units would you like to buy?"
    })
    .then(function(answer) {
        var query = "SELECT stock_quantity, FROM products WHERE ?";
        connection.query(query, { stock_quantity: answer.stock_quantity }, function(err, response) {
          for (var i = 0; i < response.length; i++) {
            console.log("ID: " + ressponse[i].stock_quantity);
          }
          runSearch();
        });
      });
  }
