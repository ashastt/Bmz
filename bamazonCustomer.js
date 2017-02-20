var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host : "localhost",
	port  : 3306,
	user: "root",
	password: "",
	database : "Bamazon"

});

connection.connect(function(err){
	if(err) throw err;
	// console.log("connected as id: " + connection.threadId);
	beginBamazon();
});

function beginBamazon(){
	inquirer.prompt(
        {
            name: "name",
            type: "input",
            message: "Who are you?"
        }
    ).then(function(response) {
        console.log('Welcome '+response.name);
        listProducts();
    })
}

function listProducts(){
	inquirer.prompt([
	  {
	    type: "list",
	    message: "What do you want to do?",
	    choices: ["Display Products Available","Prefer to Exit"],
	    name: "action"
	  },

	]).then(function(selection) {

		if(selection.action === "Display Products Available"){
			var query = "SELECT item_id, product_name, price from products";
			console.log("\nProducts Available" + "\n___________________");
			connection.query(query, function(err, results, fields){
				if(err) throw err;
				if(results){			
				  	for (var i = 0; i < results.length; i++) {
	   				 	console.log("#"+results[i].item_id + 
	   				 	"\tProduct: " + results[i].product_name + 
	   				 	"\tPrice: $ " + results[i].price);   				 
					}
					console.log("___________________________");
				} 

				selectNext();				
			});
		}else if(selection.action === "Prefer to Exit"){
			process.exit();
		}
	});
}

function purchaseProducts(){

	inquirer.prompt([
        {
            type: "input",
            name: "item",
            message: "Enter the ID of the product you wish to purchase",
        },
        {
            type: "input",
            name: "quantity",
            message: "How many do you wish to purchase? ",
        }
    ]).then(function(response) {
        connection.query("SELECT * FROM products WHERE item_id = ?", [response.item], function(err, result) {
            var totalCost = (result[0].price * response.quantity).toFixed(2);
            if (response.quantity > result[0].stock_quantity) {
                console.log("Insufficient quantity!! Please try again later!\n");
                selectNext();
            } 
            else {
                connection.query("UPDATE Products SET stock_quantity = stock_quantity - ? WHERE item_id = ?", [response.quantity, response.item], function(err, result) {                    
                    console.log("Your Total cost is : $" + totalCost + "\n_______________________");
                    selectNext();
                });
            }
        });
    });

}

function selectNext(){
	inquirer.prompt([
	  {
	    type: "list",
	    message: "What do you want to do?",
	    choices: ["Purchase Products","Prefer to Exit"],
	    name: "action"
	  },

	]).then(function(selection) {
		  if(selection.action === "Purchase Products"){
		  	purchaseProducts();				  	
		  }else if(selection.action === "Prefer to Exit"){
			process.exit();
		  }
	});
}