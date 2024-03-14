import {AuthUtils} from "../../utils/auth-utils";

export class RedactIncomeCategory {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        if (!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey) || !AuthUtils.getAuthInfo(AuthUtils.refreshTokenKey)) {
            return this.openNewRoute('/login');
        }

        this.nameOfIncome = document.getElementById('nameOfIncomeExpense');

        /* document.getElementById('process-button').addEventListener('click', this.validation.bind(this));*/

    }

    /* validation() {

         let isValid = true;
         if (this.nameOfIncome.value) {
             this.nameOfIncome.classList.remove('is-invalid');
             this.nameOfIncome.style.marginBottom = '20px';
         } else {
             this.nameOfIncome.classList.add('is-invalid');
             this.nameOfIncome.style.marginBottom = '0';
             document.getElementById('error').style.marginBottom = '20px';
             isValid = false;


             return isValid
         }
     }*/
}