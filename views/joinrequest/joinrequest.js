async function displayJoinRequest() {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://13.51.72.167:7000/invite/get-joinrequests`, { headers: { 'Authorization': token } })
        const invites = response.data.invites;
        console.log(invites);
        const joinRequestDiv = document.getElementById('joinrequest');
        joinRequestDiv.innerHTML = '';

        for (let i = 0; i < invites.length; i++) {
            const ul = document.createElement('ul');
            const invitedBy = invites[i].invitorname;
            const groupName = invites[i].groupname;
            const id= invites[i].id
            const buttonAccept = document.createElement('button');
            buttonAccept.innerText = 'Accept';
            buttonAccept.addEventListener('click',() => {
                accept(id);
            })

            const buttonDecline = document.createElement('button');
            buttonDecline.innerText = 'Decline';
            buttonDecline.addEventListener('click', () => {
                decline(id);
            });
            ul.innerHTML = `<li>you were invited by  ${invitedBy}  to group ${groupName}</li>`
            ul.appendChild(buttonAccept);
            ul.appendChild(buttonDecline);
            joinRequestDiv.appendChild(ul);

        }
    } catch (err) {
        console.log(err);
    }
}
document.addEventListener('DOMContentLoaded', async () => {
    displayJoinRequest()
});

async function accept(id) {
    const token = localStorage.getItem('token');
    const response = await axios.get(`http://13.51.72.167:7000/invite/accept-invite/${id}`, { headers: { 'Authorization': token } })
    alert(response.data.message);
    displayJoinRequest()
}

async function decline(id) {
    const token = localStorage.getItem('token');
    const response = await axios.get(`http://13.51.72.167:7000/invite/decline-invite/${id}`, { headers: { 'Authorization': token } })
    alert(response.data.message);
    displayJoinRequest()

}