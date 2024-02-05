async function postMessage(event) {
    try {
        event.preventDefault();
        const obj = {
            message: document.getElementById('message').value
        }
        const token = localStorage.getItem('token');
        const groupId = localStorage.getItem('groupid');
        const response = await axios.post(`http://localhost:7000/message/postmessage/${groupId}`, obj, { headers: { 'Authorization': token } })
        alert(response.data.message);
    } catch (err) {
        console.log(err);
    }
}


document.addEventListener('DOMContentLoaded', async () => {
    //  setInterval(messagesInLs,1000);
    displayGroups()
    invite();

});

async function createGroup() {
    try {
        const obj = {
            groupname: document.getElementById('groupname').value
        }
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:7000/group/creategroup', obj, { headers: { 'Authorization': token } });

    } catch (err) {
        console.log(err);
    }
}

async function displayGroups() {
    try {
        const token = localStorage.getItem('token');
        const displayGroupsDiv = document.getElementById('displaygroups');
        const response = await axios.get('http://localhost:7000/group/getgroups', { headers: { 'Authorization': token } });
        const groups = response.data.groups;

        for (let i = 0; i < groups.length; i++) {
            const p = document.createElement('p');
            const groupName = groups[i].groupname;

            const button = document.createElement('button');
            button.textContent = 'Enter';
            button.addEventListener('click', () => enterGroup(groups[i].id));

            p.appendChild(document.createTextNode(`${groupName} `));
            p.appendChild(button);

            displayGroupsDiv.appendChild(p);
        }
    } catch (err) {
        console.log(err);
    }
}
async function enterGroup(groupId) {
    try {
        localStorage.setItem('groupid', groupId);
        console.log(groupId);
        const response = await axios.get(`http://localhost:7000/message/get-messages/?groupid=${groupId}`);
        const messages = response.data.messages;
        const group = response.data.group;
        alert(`you entered ${group.groupname}`)

        const h5 = document.createElement('h2');
        const displayDiv = document.getElementById('display');
        displayDiv.innerHTML = '';
        h5.innerText = `${group.groupname} Messages`
        displayDiv.appendChild(h5);

        for (let i = 0; i < messages.length; i++) {
            const name = messages[i].name;
            const message = messages[i].message;
            const div = document.createElement('div');
            div.innerHTML = `<p>${name}  :  ${message}</p>`
            displayDiv.appendChild(div);
        }
    } catch (err) {
        console.log(err);
    }
}

async function invite() {
    try {
        const displayDiv = document.getElementById('invite')
        const button = document.createElement('button');
        button.textContent='invite others';
        button.addEventListener('click',() => {
            displayInvite();
        })
        displayDiv.appendChild(button);

    } catch(err) {
        console.log(err);
    }
}


async function displayInvite() {
    try {
        const response = await axios.get('http://localhost:7000/user/get-users')
        const users = response.data.users;
        const inviteDiv = document.getElementById('invite');
        
        for( let i = 0; i < users.length; i++) {
            const p = document.createElement('p');
            const button = document.createElement('button');
            button.innerText = 'Invite';
            button.addEventListener('click',() => {
                inviteToGroup(users[i].id)
            })
            p.innerHTML = `${users[i].name}`
            p.appendChild(button);
            inviteDiv.appendChild(p);
        }
    } catch(err) {

    }
}

async function inviteToGroup(id) {
    const token = localStorage.getItem('token');
    const groupid = localStorage.getItem('groupid');
    const response = await axios.post(`http://localhost:7000/invite/post-invite/?id=${id}&groupid=${groupid}`,{},{ headers: { 'Authorization': token } })
    console.log(response.data.message);
    alert(response.data.message);

}