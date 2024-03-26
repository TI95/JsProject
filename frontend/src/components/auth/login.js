import {AuthServices} from "../../services/auth-services";
import {AuthUtils} from "../../utils/auth-utils";

export class Login {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        if (AuthUtils.getAuthInfo(AuthUtils.accessTokenKey)) {
            return this.openNewRoute('/')
        }
        this.findElements();

        document.getElementById('process-button').addEventListener('click', this.login.bind(this));

    }

    validation() {

        let isValid = true;
        if (this.emailElement.value && this.emailElement.value.match(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)) {
            this.emailElement.classList.remove('is-invalid');
        } else {
            this.emailElement.classList.add('is-invalid');
            isValid = false;

        }
        if (this.passwordElement.value && this.passwordElement.value.match(/^(?=.*[A-Z])(?=.*\d).{8,}$/)) {
            this.passwordElement.classList.remove('is-invalid');
        } else {
            this.passwordElement.classList.add('is-invalid');
            isValid = false;
        }
        return isValid

    }

    findElements() {
        this.emailElement = document.getElementById('email');
        this.passwordElement = document.getElementById('password');
        this.rememberMeElement = document.getElementById('remember');
    }

    async login (){
        if (this.validation()){
            const loginResult = await AuthServices.logIn({
                email: this.emailElement.value,
                password: this.passwordElement.value,
                rememberMe: this.rememberMeElement.checked,
            });
            if (loginResult){
                AuthUtils.setAuthInfo(loginResult.tokens.accessToken, loginResult.tokens.refreshToken, {
                    id:loginResult.user.id,
                    name:loginResult.user.name,
                    lastName:loginResult.user.lastName,

                });
                return this.openNewRoute('/');
            }
        }
    }
}