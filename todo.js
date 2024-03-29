// Create a command-line application using Node.js that allows users to manage a to-do list. The application should provide functionality for adding, listing, updating, and deleting tasks from the to-do list.

// Requirements:

// Users should be able to add tasks to the to-do list with a title and optional description.
// Users should be able to list all tasks in the to-do list, displaying their titles and descriptions.
// Users should be able to mark tasks as completed or pending.
// Users should be able to update the title or description of existing tasks.
// Users should be able to delete tasks from the to-do list.
// Users should be able to save the to-do list to a file and load it from a file to persist tasks across sessions.
// Hints:

// Use a JSON file to store the to-do list data.
// Use the fs module in Node.js to read from and write to the JSON file.
// Implement functions for each of the CRUD operations (Create, Read, Update, Delete) to manage the to-do list.
// Consider using command-line arguments or prompts to interact with users and perform actions on the to-do list.


//improvements possible
//clean() method which deletes all the done tasks

//modules
const readline = require('readline');
const fs = require('fs');


//data members
let tasks = [];


//save data
function save(tasks){
    fs.writeFile("data.json" , JSON.stringify(tasks), 'utf8' ,(err)=>{
        if(err){
            console.error("Error appending the file" , err);
            return ;
        }
    });
}


//load data
function load() {
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error("Error loading file", err);
        } else {
            try {
                tasks = JSON.parse(data);
                console.log("-----------------------");
                for (let i = 0; i < tasks.length; i++) {
                    console.log(`${tasks[i].status ? 'X' : ' '} ${i+1}.${tasks[i].title}`);
                }
                console.log("-----------------------"); 
            } catch (error) {
                console.error("Error parsing JSON data", error);
            }
        }
    });
}


//add item
function add(title){
    let task = { status : false , title };
    tasks.push(task);
    save(tasks);
}


//delete task
function remove(index){
    let num = (parseInt(index) - 1);
    tasks.splice(num, 1);
    save(tasks);
}

//update task
function done(index){
    let num = (parseInt(index) - 1);
    let title = tasks[num].title 
    tasks[num] = { status : true , title};
    save(tasks);

}


//startup 
console.log("Welcome to TO-DO LIST (Enter a command add {title}, list, done {index} , remove {index})");
load();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (input) =>{
    const [cmd , ...arg] = input.trim().split(' ');
    
    //switch case pending...
    switch(cmd){
        case 'add':
            add(arg[0]);
            
            break;
        case 'list':
            load();
            break;
        case 'done':
            done(arg[0]);
            break;
        case 'remove':
            remove(arg[0]);
            break;
        case 'exit':
            rl.close();
            break;
        default:
            console.log("invalid command...");
    }
});


