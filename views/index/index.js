async function postMessage(event) {
    try {
        event.preventDefault();
        const obj = {
            message: document.getElementById('message').value
        }
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:7000/message/postmessage', obj, { headers: { 'Authorization': token } })
        alert(response.data.message);
    } catch (err) {
        console.log(err);
    }
}


async function RetrieveNewMessages(id) {
    try {
        console.log(id)
        const response = await axios.get(`http://localhost:7000/message/get-messages/?newmessageid=${id}`)
        const messages = response.data.messages;
        console.log(messages);
        if(!localStorage.getItem('messages')) {
            localStorage.setItem('messages', JSON.stringify(messages));
        } else {
            const oldMessages = JSON.parse(localStorage.getItem('messages'));
            const combinedMessages = [...oldMessages,...messages];
            localStorage.setItem('messages', JSON.stringify(combinedMessages));

        }
        

    } catch (err) {
        console.log(err);
    }
}

function messagesInLs() {
    const messagesString = localStorage.getItem('messages');
    const displayDiv = document.getElementById("display");
    displayDiv.innerHTML = '';

    if (messagesString) {
        const messages = JSON.parse(messagesString);
        for (let i = 0; i < messages.length; i++) {
            const name = messages[i].name;
            const message = messages[i].message
            const div = document.createElement('div');
            div.innerHTML = `<p>${name} : ${message}</p>`
            displayDiv.appendChild(div);
        }
        RetrieveNewMessages(messages[messages.length-1].id);
        if(messages.length > 10) {
            deleteOldChats(messages);
        }
    }


}

function deleteOldChats(messages) {
    const maxMessage = 10;
    const newMessages = messages.slice(messages.length - maxMessage)
    localStorage.setItem('messages', JSON.stringify(newMessages));
}


document.addEventListener('DOMContentLoaded', async () => {
     setInterval(messagesInLs,1000);
});