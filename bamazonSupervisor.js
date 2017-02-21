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
	console.log("connected as id: " + connection.threadId);
	beginBamazonSupervisor();
});


function beginBamazonSupervisor(){

	inquirer.prompt([
	  {
	    type: "list",
	    message: "What do you want to do?",
	    choices: ["View Product Sales by Department","Create New Department", "Prefer to Exit"],
	    name: "action"
	  },

	]).then(function(selection) {
		  if(selection.action === "View Product Sales by Department"){
		  	connection.query("SELECT department_id, department_name, over_head_costs, total_sales, (total_sales - over_head_costs) AS total_profit FROM departments", function(err, results) { 
                	if(err) throw err;
					if(results){
					console.log("___________________________");			
				  	for (var i = 0; i < results.length; i++) {
	   				 	console.log("#"+results[i].department_id + 
	   				 	"\tName : " + results[i].department_name + 
	   				 	"\tOver Head Costs : " + results[i].over_head_costs +
	   				 	"\tTotal Sales : " + results[i].total_sales +
	   				 	"\tTotal Profit : " + results[i].total_profit);    				 
					}
					console.log("___________________________");
				}       

                });			  	
		  }else if(selection.action === "Create New Department"){
			process.exit();
		  }else if(selection.action === "Prefer to Exit"){
			process.exit();
		  }
	});

}