<div class="masque" id="masque" onclick="closePopup(this, event)">
    <div class="popup" id="popup">
        <h2>Create an account</h2>
        <div class="idElements">
            <div class="champ">
                <h3>Entrer your E-mail:</h3>
                <form method="get">
                <input type="email" placeholder="E-mail" class="idInput" id="email" name="email">
            </div>
            <div class="champ">
                <h3>Entrer your password:</h3>
                <input placeholder="password"  class="idInput" id="cutename" name="cutename">
            </div>
            <div class="champ">
                <h3>Enter your nickname:</h3>
                <input placeholder="nickname" class="idInput" id="nickname" name="nickname">
            </div>
        </div>
        <button type="submit" class="signInButton" onclick="signInGet()" name="formsend">Sign in</button>
        </form>
        <h3 id="alertForm" class="alertForm"></h3>
                
    </div>
</div>
