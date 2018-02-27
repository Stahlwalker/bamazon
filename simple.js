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
    start();
  });

  function start () {
      inquirer
      .prompt({
        name: "id",
        type: "list",
        message: "What is the ID of the product you would like to buy?",
      })
      .then(function(answer){
          var chosenItem;
          for (var i = 0; i < response.length; i++) {
              if (response[i].item_name =answer.choice) {
                  chosenItem = results[i];
              }
          }
      })
    selectedUnit();
  }

  function selectedUnit() {
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
    .then(function(answer){
        connection.query("UPDATE products SET ? WHERE ?",
        [
         { 
            stock_quantity: answer.selectedUnited
        },
        {
            id: chosenItem.id
        }

        ],
        function(error) {
            if (error) throw err;
            console.log("Bid placed successfully!");
            start();
          }
        );
    });
};
  
