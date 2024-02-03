async function login(event) {
    event.preventDefault();
    const obj = {
        email : document.getElementById('email').value,
        password : document.getElementById('password').value
    }
    console.log(obj);
}