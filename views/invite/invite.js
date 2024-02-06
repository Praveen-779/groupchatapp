async function displayInviteHistory() {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://51.20.255.35t:7000/invite/get-invitedhistory`,{ headers: { 'Authorization': token } })
        const inviteHistory = response.data.inviteHistory;
        
        const inviteHistoryDiv = document.getElementById('inviteHistory');
        inviteHistoryDiv.innerHTML = '';

        for(let i = 0; i < inviteHistory.length; i++) {
            const ul = document.createElement('ul');
            const invitedToName = inviteHistory[i].inviteename;
            const status = inviteHistory[i].status;
            const groupName = inviteHistory[i].groupname;
            ul.innerHTML = `<li>you invited ${invitedToName} to ${groupName} group, status : ${status}</li>`
            inviteHistoryDiv.appendChild(ul);    
            
        }
    } catch(err) {
        console.log(err);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
displayInviteHistory()
});