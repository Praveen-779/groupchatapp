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


async function displayMessages() {
    try {
        const response = await axios.get('http://localhost:7000/message/get-messages')
        const messages = response.data.messages;
        const displayDiv = document.getElementById("display");

        for (let i = 0; i < messages.length; i++) {
            const name = messages[i].name;
            const message = messages[i].message
            const div = document.createElement('div');
            div.innerHTML = `<p>${name} : ${message}</p>`
            displayDiv.appendChild(div);
        }
    } catch (err) {
        console.log(err);
    }
}


document.addEventListener('DOMContentLoaded', async () => {
    displayMessages();

});