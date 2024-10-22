//setup
var nicknameList = [];
var commentList = [];
var commentTypeList = [];


function GetFile(file, containerId, insertAtEnd = false) {
    fetch(file)
    .then(response => response.text())
    .then(data => {
        const container = document.getElementById(containerId);
        if (insertAtEnd) {
            container.insertAdjacentHTML('beforeend', data);
        } else {
            container.insertAdjacentHTML('afterbegin', data);
        }
        })
        .catch(error => console.error('Error:', error));
}

//functions

function closePopup(masque, event) {
    if (event.target === masque) {
        masque.remove();
    }
}

function adminAccesButton() {
    GetFile('fragments/connexionAdmin.php', 'main');
}

function newCommentButton() {
    GetFile('fragments/NewCommentPopup.php', 'main');
}

function sendGetValues(){
    var alerte = document.getElementById("alert");

    var nickname = document.getElementById('nicknameCase').value;
    var comment = document.getElementById('comment').value;
    var commentType = document.getElementById('commentType').value;

    console.log("Nickname:", nickname);
    console.log("Comment:", comment);
    console.log("Comment Type:", commentType);

    if(nickname != "" && comment != ""){
        alerte.innerText = "chargement . . .";
        var data = new FormData();
        data.append('nickname', nickname);
        data.append('comment', comment);
        data.append('commentType', commentType);

        fetch('php/sendComment.php', {
            method: 'POST',
            body: data
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la requ�te.');
            }
            return response.text();
        })
        .then(data => {
            console.log(data);
            alerte.innerText = data;
        location.reload();
        })
        .catch(error => {
            console.error('Erreur :', error);
            alerte.innerText = "veuillez r��sayer";
        });
    }else{
        document.getElementById("alert").innerText = "Il faut remplir tout les champs";
    }
}

function loadComments() {
    fetch('php/loadComment.php')
    .then(response => response.text())
    .then(data => {
        document.getElementById('commentContainer').innerHTML = data;
    })
}

function adminConnexion(){
    var alerte = document.getElementById("alert");

    var user = document.getElementById('user').value;
    var cutename = document.getElementById('cutename').value;

    if(user != "" && cutename != ""){
        alerte.innerText = "chargement . . .";
        var data = new FormData();
        data.append('user', user);
        data.append('cutename', cutename);

        fetch('php/loginAdmin.php', {
            method: 'POST',
            body: data
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la requ�te.');
            }
            return response.text();
        })
        .then(data => {
            console.log(data);
            alerte.innerText = data;
            setInterval(location.reload(), 500);
            
        })
        .catch(error => {
            console.error('Erreur :', error);
            alerte.innerText = "veuillez r��sayer";
        });
    }else{
        document.getElementById("alert").innerText = "Il faut remplir tout les champs";
    }
}

function deleteButton(target) {
    if (!target.querySelector('.trashContainer') && admin == true) {
        var trashContainer = document.createElement("div");
        trashContainer.setAttribute('id',"trashContainer");
        trashContainer.classList.add("trashContainer");
        trashContainer.setAttribute('onclick',"deleteComments(this)");
        
        var trashImg = document.createElement("img");
        trashImg.src = "tools/img/trashIco.png";
        trashImg.classList.add("trashImg");
        trashContainer.appendChild(trashImg);

        target.appendChild(trashContainer);
        document.getElementById("trashContainer").style.left = (document.getElementById("trashContainer").parentNode.offsetWidth - document.getElementById("trashContainer").offsetWidth)/2 + 40 + 'px';
        document.getElementById("trashContainer").style.bottom = (document.getElementById("trashContainer").offsetTop - document.getElementById("trashContainer").parentNode.offsetTop) + 40 + 'px';


    }
}

function closeDeleteButton(target) {
    if (target.querySelector('.trashContainer')) {
        target.querySelector('.trashContainer').remove();
    }
}

function deleteComments(target) {
    var data = new FormData();
    var parentComment = target.closest('.comment');
    var commentText = parentComment.querySelector('.commentText');
    data.append('targetComment', commentText.textContent);

        fetch('php/deleteComment.php', {
            method: 'POST',
            body: data
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la requ�te.');
            }
            return response.text();
        })
        .then(data => {
            console.log(data);
            location.reload();
        })
        .catch(error => {
            console.error('Erreur :', error);
            alerte.innerText = "veuillez r��sayer";
        });
}

function adminLogOut() {
    fetch('php/closeSession.php', {
        method: 'POST' 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text(); 
    })
    .then(data => {
        console.log(data); 
        location.reload(); 
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

setInterval(loadComments, 3000);
