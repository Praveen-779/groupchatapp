async function postMessage(event) {
    try {
        event.preventDefault();
    const obj = {
        message : document.getElementById('message').value
    }
    const token = localStorage.getItem('token');
    const response = await axios.post('http://localhost:7000/message/postmessage',obj,{ headers: { 'Authorization': token }})
    alert(response.data.message);
    } catch(err) {
        console.log(err);
    }
    
}