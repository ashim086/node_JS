// Event handling is just part of backend program when the event
// created by user request is done the event should be handled which is called event_handling...AbortController.apply.



const EventEmitter = require("events");
const event = new EventEmitter();


//event.on("event handling function nam",(all_back function after the event has occured))
event.on("sayname",(id,user) =>{
    console.log(`the user is ${user} and user-id ${id}`);
});



event.emit("sayname", "084","ashim");  //(event.emit("give event handling function name"),"then parameter to be passed to message")