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
        name: "id",
        type: "input",
        message: "What is the product id you would like to buy?",
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
          for (var i = 0; i < response.length; i++) {
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
        // console.log("answer " + answer);
        var query = "SELECT stock_quantity FROM products WHERE ?";
        connection.query(query, { id:item }, function(err, response) {
          for (var i = 0; i < response.length; i++) {
              var qtyInput = response[i].stock_quantity;

              console.log(qtyInput);
                
            console.log("Quantity: " + qtyInput);
            // if ((answer) > item) {
            //   console.log("Insuffiecient quantity");
            // }
          //   if (answer.item === 0) {
          //     console.log("Please input a quantity greater than 0.  Retruning to store front...");
          //     start();  
          //   }
          //   else if (answer.stock_quantity < [item - 1].stock_quantity){
          //     console.log("This is answer.stock_quantity " + answer.stock_quantity);
          //     console.log("This is res[item - 1].stock_quantity " + response[item - 1].stock_quantity);
          //   }
          //   // var updatedStock = res[stock]
          //   var updatedStock = response[item - 1].stock_quantity - answer.stock_quantity;
          //   console.log("You're allowed to buy that many!"); 
    
          //   // Updates stocks for that item in MySQL
          //   connection.query("UPDATE products SET ? WHERE ?", 
          //     [{stock_quantity: updatedStock}, 
          //     {id: item}]);
          }
          // add if statement to 
       
          updateProduct(item, answer.stock_quantity, qtyInput);
        });
      });
  }

  function updateProduct(item, stock_quantity, subQty) {
    console.log("Updating all stock quantities...\n");
    console.log("this is the chosenId " + item + " this is the quantity you would like to remove " + stock_quantity);
    // var query = connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: answer.stock_quantity}, {id: answer.id}]);
    connection.query(
      "UPDATE products SET ? WHERE ?",
      [
      {
        stock_quantity: subQty-=stock_quantity
      },
      {
        id: item,
        
      }
    ],
      function(error, response) {
        // if (error) throw error;
        console.log("updated product successfully!");
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
      start();
    });
  }
