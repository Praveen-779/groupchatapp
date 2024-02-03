async function login(event) {
    event.preventDefault();
    const obj = {
        email : document.getElementById('email').value,
        password : document.getElementById('password').value
    }
    try {
      const response =  await axios.post('http://localhost:7000/user/login',obj)
      console.log(response.data.token);
      alert('user login in success');
    } catch(err) {
        console.log(err);
        alert(err.response.data.message);
    }
    
}