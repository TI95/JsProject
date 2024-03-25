import {AuthServices} from "../../services/auth-services";
import {AuthUtils} from "../../utils/auth-utils";

export class Signup {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        if (AuthUtils.getAuthInfo(AuthUtils.accessTokenKey)) {
            return this.openNewRoute('/')
        }

        this.fioElement = document.getElementById('fio');
        this.emailElement = document.getElementById('email');
        this.passwordElement = document.getElementById('password');
        this.repeatPasswordElement = document.getElementById('repeatPassword');

        document.getElementById('process-button').addEventListener('click', this.signUp.bind(this));
    }

    validation() {

            let isValid = true;
        if (this.fioElement.value  ) {
            this.fioElement.classList.remove('is-invalid');
        } else {
            this.fioElement.classList.add('is-invalid');
            isValid = false;
        }

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

            if (this.repeatPasswordElement.value && this.repeatPasswordElement.value === this.passwordElement.value) {
                this.repeatPasswordElement.classList.remove('is-invalid');
            } else {
                this.repeatPasswordElement.classList.add('is-invalid');
                isValid = false;
            }
            return isValid

        }

    async signUp() {

        if (this.validation()) {
            const signupResult =  await AuthServices.signUp({
                fio:this.fioElement.value,
                email: this.emailElement.value,
                password: this.passwordElement.value,
                passwordRepeat: this.repeatPasswordElement.value,

            });
            if (signupResult) {
                const getTokens = await AuthServices.logIn({
                    email: this.emailElement.value,
                    password: this.passwordElement.value,

                });
                if(getTokens){
                    AuthUtils.setAuthInfo(getTokens.tokens.accessToken, getTokens.tokens.refreshToken, {
                        name: signupResult.user.name,
                        lastName: signupResult.user.lastName,
                        email: signupResult.user.email,
                        id: signupResult.user.id
                    });
                    return this.openNewRoute('/');
                }
            }

        }
    }

}


