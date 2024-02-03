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
    } catch (err) {
        console.log(err.response.data.message)
        document.getElementById('displayerror').innerHTML = `<div style= " color:red;"> ${err.response.data.message}</div>`;
    }

}