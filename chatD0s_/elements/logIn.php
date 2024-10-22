<div class="masque" id="masque" onclick="closePopup(this, event)">
    <div class="popup" id="popup">
        <h2>Log in</h2>
        <div class="idElements">
            <div class="champ">
                <h3>Entrer your E-mail:</h3>
                <input type="email" placeholder="E-mai" class="idInput" id="email" name="email">
            </div>
            <div class="champ">
                <h3>Entrer your password:</h3>
                <input type="password" placeholder="Password" class="idInput" id="cutename" name="password">
                <span class="forgetPassword" onclick="resetPassword()">Forgot your password?</span>
            </div>
        </div>
        <button type="submit" class="signInButton" onclick="logInGet()">Log in</button>
        <h3 id="alertForm" class="alertForm"></h3>
                
    </div>
</div>
