const host = '13.51.72.167';
async function postMessage(event) {
    try {
        event.preventDefault();
        const obj = {
            message: document.getElementById('message').value
        }
        const token = localStorage.getItem('token');
        const groupId = localStorage.getItem('groupid');
        const response = await axios.post(`http://${host}:7000/message/postmessage/${groupId}`, obj, { headers: { 'Authorization': token } })
        document.getElementById('message').value = '';
        enterGroup()
    } catch (err) {
        console.log(err);
    }
}


async function initializePage() {
    displayGroups();
    invite();
    enterGroup();
}
document.addEventListener('DOMContentLoaded', initializePage);

async function createGroup() {
    try {
        const obj = {
            groupname: document.getElementById('groupname').value
        }
        const token = localStorage.getItem('token');
        const response = await axios.post(`http://${host}:7000/group/creategroup`, obj, { headers: { 'Authorization': token } });
        document.getElementById('groupname').value = '';
        displayGroups()
    } catch (err) {
        console.log(err);
    }
}

async function displayGroups() {
    try {
        const token = localStorage.getItem('token');
        const displayGroupsDiv = document.getElementById('displaygroups');
        const response = await axios.get(`http://${host}:7000/group/getgroups`, { headers: { 'Authorization': token } });
        const groups = response.data.groups;
        displayGroupsDiv.innerHTML = '';

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
        if (groupId) {
            localStorage.setItem('groupid', groupId);
        } else {
            groupId = localStorage.getItem('groupid');
        }
        const response = await axios.get(`http://${host}:7000/message/get-messages/?groupid=${groupId}`);
        const messages = response.data.messages;
        const group = response.data.group;
        // alert(`you entered ${group.groupname}`)

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
        document.getElementById('makeadmin').innerHTML = '';
        invite()
    } catch (err) {
        console.log(err);
    }
}

async function invite() {
    try {
        const token = localStorage.getItem('token');
        const groupId = localStorage.getItem('groupid');
        const response = await axios.get(`http://${host}:7000/admin/isadmin/${groupId}`, { headers: { 'Authorization': token } })
        const isAdmin = response.data.isAdmin;
        const displayDiv = document.getElementById('inviteothers')
        displayDiv.innerHTML = '';
        document.getElementById('invite').innerHTML = '';
        document.getElementById('doAdmin').innerHTML = '';
        document.getElementById('deleteusers').innerHTML = '';
        if (isAdmin) {
            const button = document.createElement('button');
            button.textContent = 'invite others';
            button.addEventListener('click', () => {
                displayInvite();
            })
            const p = document.createElement('p');
            p.innerHTML = '<strong>You are an admin</strong>'
            displayDiv.appendChild(p);
            displayDiv.appendChild(button);
            makeAdmin()
            removeUserButton()
        }


    } catch (err) {
        console.log(err);
    }
}

function removeUserButton() {
    const deleteUsersDiv = document.getElementById('deleteusers');
    const button = document.createElement('button');
    button.innerText = 'Remove Users';
    deleteUsersDiv.appendChild(button);
    button.addEventListener('click', () => displayRemoveUsers())

}

async function displayRemoveUsers() {
    try {
        const token = localStorage.getItem('token');
        const groupId = localStorage.getItem('groupid');
        const response = await axios.get(`http://${host}:7000/group/get-users/${groupId}`, { headers: { 'Authorization': token } })
        if (response.data.message) {
            alert(response.data.message);
        } else {
            const users = response.data.users;
            const deleteUsersDiv = document.getElementById('removeuser');
            deleteUsersDiv.innerHTML = '';
            
            for (let i = 0; i < users.length; i++) {
                const name = users[i].name;
                const p = document.createElement('p');
                p.innerHTML = `${name} `
                const button = document.createElement('button');
                button.innerText = 'Remove'
                button.addEventListener('click',() => removeUserFromGroup(users[i].id))
                p.appendChild(button);
                deleteUsersDiv.appendChild(p);
            }
            initializePage()
        }
    } catch (err) {
        console.log(err);
    }
}

async function removeUserFromGroup(id) {
    try {
        const groupId = localStorage.getItem('groupid');
        const response = await axios.delete(`http://${host}:7000/group/removeUser/?groupId=${groupId}&id=${id}`)
        alert(response.data.message);
        document.getElementById('removeuser').innerHTML='';
    } catch(err) {
        console.log(err);
    }
}

async function makeAdmin() {
    try {
        const displayDivv = document.getElementById('makeadmin')
        displayDivv.innerHTML = '';
        const button = document.createElement('button');
        button.innerText = 'Make Admin';
        const doAdminDiv = document.getElementById('doAdmin');
        button.addEventListener('click', async () => {
            const token = localStorage.getItem('token');
            const groupId = localStorage.getItem('groupid');
            const response = await axios.get(`http://${host}:7000/group/get-users/${groupId}`, { headers: { 'Authorization': token } })
            const message = response.data.message
            if (message) {
                alert(message);
            } else {
                const users = response.data.users;
                doAdminDiv.innerHTML = ''
                for (let i = 0; i < users.length; i++) {
                    const p = document.createElement('p');
                    p.innerHTML = `${users[i].name}`

                    const button = document.createElement('button');
                    button.innerText = 'Make as Admin';
                    button.addEventListener('click', () => makeAsAdmin(users[i].id))
                    p.appendChild(button);
                    doAdminDiv.appendChild(p);
                }
            }

        })
        displayDivv.appendChild(button)
    } catch (err) {
        console.log(err);
    }
}

async function makeAsAdmin(id) {
    const groupId = localStorage.getItem('groupid');
    const response = await axios.get(`http://${host}:7000/admin/make-admin/?groupid=${groupId}&id=${id}`)
    alert(response.data.message)
}


async function displayInvite() {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://${host}:7000/user/get-users`, { headers: { 'Authorization': token } })
        const users = response.data.users;
        const inviteDiv = document.getElementById('invite');
        inviteDiv.innerHTML = '';

        for (let i = 0; i < users.length; i++) {
            const p = document.createElement('p');
            const button = document.createElement('button');
            button.innerText = 'Invite';
            button.addEventListener('click', () => {
                inviteToGroup(users[i].id)
            })
            p.innerHTML = `${users[i].name}`
            p.appendChild(button);
            inviteDiv.appendChild(p);
        }
    } catch (err) {

    }
}

async function inviteToGroup(id) {
    const token = localStorage.getItem('token');
    const groupid = localStorage.getItem('groupid');
    const response = await axios.post(`http://${host}:7000/invite/post-invite/?id=${id}&groupid=${groupid}`, {}, { headers: { 'Authorization': token } })
    console.log(response.data.message);
    alert(response.data.message);
    invite()

}