async function signUp(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phonenumber = document.getElementById('phonenumber').value;
    const password = document.getElementById('password').value;
    const obj = {
        name: name,
        email: email,
        phonenumber: phonenumber,
        password : password
    }
    try {
        await axios.post('http://localhost:7000/user/signup', obj);
        alert('sign up successfull,now please login');
        document.getElementById('signupform').reset(); 
    } catch (err) {
        console.log(err.response.data.message)
        alert(err.response.data.message);
    }

}