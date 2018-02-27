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

connection.query("select * from products", function(err, response) {
    if(err) {
      throw err;
    }
    console.log("____________");
    console.table(response);
    start();
  });


function start() {
    inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "Press enter to begin",
      choices: [
        "What is the ID of the product you would like to buy?",
    //   "BID"
    ]
    })
    .then(function(answer) {
        switch (answer.action) {
          case "What is the ID of the product you would like to buy?":
            idSearch();
            break;
  
          case "How many units would you like to buy?":
            selectUnit();
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
            // console.log(answer);
          for (var i = 0; i < response.length; i++) {
            // console.log("ID: " + response[i].id);
          }
          selectUnit();
        });
      });
  }

  function selectUnit() {
    // prompt for info about the item being put up for auction
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
    inquirer
      .prompt([
        {
          name: "quantity",
          type: "input",
          message: "What is the quantity you would like to submit?",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        }
      ])
      .then(function(answer){
          var chosenItem;
          for (var i = 0; i < res.length; i++) {
              if(res[i].item_name === answer.choice) {
                  chosenItem = res[i];
              }
          }

        if (chosenItem.stock_quantity < parseInt(answer.quantity)) {

        connection.query(
          "UPDATE products SET ? WHERE ?", 
          [
              {
                stock_quantity: answer.quantity
              },
              {
                id: chosenItem.id,
              }
            ],
          function(err) {
            if (err) throw err;
            console.log("Your quantity has been updated");
           
            // readProducts();
          }
        );
        }
        else {
            // bid wasn't high enough, so apologize and start over
            console.log("You aren't updating anything WTF");
            start();
          }
        });
    });
  }
  
      function readProducts() {
        console.log("Selecting all products...\n");
        connection.query("SELECT * FROM products", function(err, res) {
          if (err) throw err;
          // Log all results of the SELECT statement
          console.table(res);
          start();
        });
    }
      
      
  
  