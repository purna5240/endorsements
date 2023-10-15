import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js'
import { getDatabase, ref,push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js"
const appSettings={
    databaseURL:"https://endrosements-f64ae-default-rtdb.firebaseio.com/"
}
const app=initializeApp(appSettings)
const database=getDatabase(app)

const messagesInDb=ref(database,"endrosements/messages")
const messagesfromInDb=ref(database,"endrosements/messages/from")
const messagestoInDb=ref(database,"endrosements/messages/to")

const btnEl=document.getElementById("publish-button")
let inputEl=document.getElementById("message")
const fromMessage=document.getElementById("from")
const toMessage=document.getElementById("to")
const divEl=document.getElementById("message-text")
const newDiv=document.getElementById("messages-display")

btnEl.addEventListener("click",function()
{
    let inputMessage={
        message:inputEl.value,
        fromm:fromMessage.value,
        to:toMessage.value
    }
    push(messagesInDb,inputMessage)
    inputEl.value=""
    fromMessage.value=""
    toMessage.value=""
})

onValue(messagesInDb,function(snapshot){
    if(snapshot.exists())
    { 
    let messageArray=Object.entries(snapshot.val())
    console.log(messageArray)
    for(let i=0;i< messageArray.length;i++)
    {
        divEl.innerHTML=``
        appendToDiv(messageArray,i)
         
    }
    }
    else{
      divEl.innerHTML=`<h4>-  No Endorsments. -</h4>` 
    }
 })
function appendToDiv(message,i)
{
    let messageText=message[i][1].message
    let toMessage=message[i][1].to
    let fromMessage=message[i][1].fromm
    let messageId=message[i][0]
    let newEl= document.createElement("div")
    newEl.id="messages-display"
    newEl.innerHTML+=`<h3>To: ${toMessage}</h3>
                        <p>${messageText}</p>
                        <h3>From: ${fromMessage}</h3>`
    
    divEl.append(newEl)
    newEl.addEventListener("click",function()
        {
            let exactLocationOfMessage=ref(database,`endrosements/messages/${messageId}`)
            console.log(exactLocationOfMessage)
            remove(exactLocationOfMessage)
            
        })
}

