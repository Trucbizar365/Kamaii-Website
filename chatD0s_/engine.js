var friends_list = document.querySelectorAll('.chat_elements .chat1');
var main = document.getElementById("main");
var appName = document.getElementById("appName");
var accountProfileLogo = document.getElementById("accountProfileLogo");
var ProfileLogoStyle = window.getComputedStyle(accountProfileLogo);
var searchBar = document.getElementById("searchBar");
var searchContainer = document.getElementById("searchBarContainer");

function GetFile(file, layer){
    fetch(`${file}`)
    .then(response => response.text())
    .then(data => {
        if(layer==false){
            main.innerHTML = data;
        }else{
            main.insertAdjacentHTML('beforeend', data);
        }

    })
}

function toggleText() {
    if (appName.textContent === "> ChatD0s") {
        appName.textContent = "> ChatD0s_";
    } else {
        appName.textContent = "> ChatD0s";
    }
}

setInterval(toggleText, 500);

function openChat(name) {
    var open_chat = document.createElement("div");
    open_chat.classList.add("chatDisc");
    open_chat.setAttribute('id',`chat${name}`);

        var chatContent = document.createElement("div");
        chatContent.classList.add("chatContent");
        chatContent.setAttribute('onclick',"displayBefore(this.parentNode)");
        open_chat.prepend(chatContent);
    
        var chatMenu = document.createElement("div");
        chatMenu.classList.add("chatMenu");
        chatMenu.setAttribute('id',`chatMenu${name}`);
        open_chat.prepend(chatMenu);

            var chatControls = document.createElement("div");
            chatControls.classList.add("chatControls");
            chatMenu.prepend(chatControls);

                var chatControlsMinusCase = document.createElement("div");
                chatControlsMinusCase.classList.add("chatControlsMinusCase");
                chatControls.prepend(chatControlsMinusCase);

                    var chatControlsMinus = document.createElement("img");
                    chatControlsMinus.src = "img/ui/minus.png"
                    chatControlsMinus.classList.add("chatControlsMinus");
                    chatControlsMinusCase.prepend(chatControlsMinus);

                var chatControlsFullCase = document.createElement("div");
                chatControlsFullCase.classList.add("chatControlsFullCase");
                chatControlsFullCase.setAttribute('onclick',`fullWindow()`);
                chatControls.prepend(chatControlsFullCase);

                    var chatControlsFull = document.createElement("img");
                    chatControlsFull.src = "img/ui/full.png"
                    chatControlsFull.classList.add("chatControlsFull");
                    chatControlsFullCase.prepend(chatControlsFull);

                var chatControlsCloseCase = document.createElement("div");
                chatControlsCloseCase.classList.add("chatControlsCloseCase");
                chatControlsCloseCase.setAttribute('onclick', "chatClose(this)");
                chatControls.prepend(chatControlsCloseCase);

                    var chatControlsClose = document.createElement("img");
                    chatControlsClose.src = "img/ui/cross.png"
                    chatControlsClose.classList.add("chatControlsClose");
                    chatControlsCloseCase.prepend(chatControlsClose);

            var dragBar = document.createElement("div");
            dragBar.classList.add("dragBar");
            dragBar.setAttribute('onmousedown',"startDrag(event, this)");
            chatMenu.prepend(dragBar);

                var chatName = document.createElement("span");
                chatName.textContent = name;
                chatName.classList.add("chatName");
                dragBar.prepend(chatName);

    main.prepend(open_chat);
    displayBefore(open_chat);
  }

function displayBefore(elemToDisplay) {
    var parentElement = elemToDisplay.parentNode;
    parentElement.appendChild(elemToDisplay);
}

function chatClose(element) {
    document.getElementById(element.parentNode.parentNode.parentNode.id).remove();
}

function singInPage() {
    GetFile('elements/signIn.php', true);
}

function logInPage(){
    GetFile('elements/logIn.php', true);
}


function closePopup(masque, event) {
    if (event.target === masque) {
        masque.remove();
    }
}

function signInGet() {
    var alerte = document.getElementById("alertForm");
    var email = document.getElementById("email").value;
    var nickname = document.getElementById("nickname").value;
    var cutename = document.getElementById("cutename").value;

    if (cutename.length > 10 && email.includes('@') && nickname.length > 6) {
        alerte.innerText = "successfull";

        var data = new FormData();
        data.append('email', email);
        data.append('nickname', nickname);
        data.append('cutename', cutename);

        fetch('accounts/register.php', {
            method: 'POST',
            body: data
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la requête.');
            }
	    alerte.innerText = "you can now log in";
            return response.text();
        })
        .then(data => {
            console.log(data); // Réponse du serveur
            alerte.innerText = data;
        })
        .catch(error => {
            console.error('Erreur :', error);
            alerte.innerText = "this e-mail address, password or nickname already exists";
        });
    } else {
        if (cutename.length <= 10) {
            alerte.innerText = "password must be at least 10 characters long";
        } else if (!email.includes('@')) {
            alerte.innerText = "e-mail must be valid";
        } else if (nickname.length <= 6) {
            alerte.innerText = "nickname must be at least 6 characters long";
        }
    }
}

function logInGet() {
var alerte = document.getElementById("alertForm");
var email = document.getElementById("email").value;
var cutename = document.getElementById("cutename").value;

if(email.includes('@')){
    if(cutename.length > 0){
        alerte.innerText = "Wait";

        var data = new FormData();
        data.append('email', email);
        data.append('cutename', cutename);

        fetch('accounts/login.php', {
            method: 'POST',
            body: data
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la requête.');
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
            alerte.innerText = "this e-mail address or password is invalid";
        });

    }else{
        alerte.innerText = "please enter a password";
    }
}else{
alerte.innerText = "please enter a valid e-mail address";
}
}

function ProfilePage(){
    GetFile('elements/profile.php', true);
}

function disconnect() {
    fetch('tools/disconnect.php')
    .then(response => response.text())
    .then(data => {
        main.innerHTML = data;
	location.reload();
    })
    .catch(error => console.error('Erreur lors de la récupération du contenu PHP :', error));
}

function resetPassword() {
    document.getElementById("masque").remove();
    GetFile('elements/resetPsswrd.php', true);

}

function ResetPassworsdGet(){
var alerte = document.getElementById("alertForm");
var email = document.getElementById("email").value;

    if(email.includes('@')){
        alerte.innerText = "wait";

            var data = new FormData();
            data.append('email', email);

            fetch('accounts/resetEmal.php', {
                method: 'POST',
                body: data
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la requête.');
                }
                return response.text();
            })
            .then(data => {
                console.log(data);
                alerte.innerText = data;
		if(alerte.innerText == "successful"){
                        document.getElementById("masque").remove();
                        fetch('elements/newPassword.php')
                        .then(response => response.text())
                        .then(data => {
                            main.innerHTML = data;
                        })
                        .catch(error => console.error('Erreur lors de la récupération du contenu PHP :', error));
		}
            })
            .catch(error => {
                console.error('Erreur :', error);
                alerte.innerText = "this e-mail address is invalid";
            });
    }else{
    alerte.innerText = "please enter a valid e-mail address";
    }
}


function newPasswordSet(){
    var alerte = document.getElementById("alertForm");
    var resetToken = document.getElementById("resetToken").value;
    var cutename = document.getElementById("cutename").value;
    var cutenameConfirm = document.getElementById("cutenameConfirm").value;

        if(cutename == cutenameConfirm && cutename != ""){
            alerte.innerText = "wait";

                var data = new FormData();
                data.append('resetToken', resetToken);
                data.append('cutename', cutename);

                fetch('accounts/newPassword.php', {
                    method: 'POST',
                    body: data
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erreur lors de la requête.');
                    }
                    return response.text();
                })
                .then(data => {
                    console.log(data);
                    alerte.innerText = data;

                })
                .catch(error => {
                    console.error('Erreur :', error);
                    alerte.innerText = "this e-mail address or password is invalid";
                });
        }else{
        alerte.innerText = "please enter the same password";
        }
    }

searchBar.addEventListener("input", updateValue);

function updateValue() {
if (searchBar.value !== "") {
    var data = new FormData();
    data.append('search', searchBar.value);

    fetch('accounts/users/userList.php', {
        method: 'POST',
        body: data
    })
	.then(response => response.text())
    .then(data => {
	if (document.getElementById("masque") !== null){
		document.getElementById("searchPopup").innerText = data;
	} else {
		fetch('accounts/users/searchPopup.php')
    	.then(response => response.text())
    	.then(data => {
        searchContainer.insertAdjacentHTML('afterbegin', data);
		})
    }

    })
        document.getElementById("searchPopup").innerText = data;
	}else{
  document.getElementById("masque").remove();
}
}