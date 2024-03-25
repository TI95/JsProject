import {AuthUtils} from "../../utils/auth-utils";
import {HttpUtils} from "../../utils/http-utils";

export class RedactExpenseCategory {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;


        if (!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey) || !AuthUtils.getAuthInfo(AuthUtils.refreshTokenKey)) {
            return this.openNewRoute('/login');
        }

        this.redactTitle = document.getElementById('expense-title');
        let redactExpenseCategoryButton = document.getElementById('save');
        redactExpenseCategoryButton.addEventListener('click', this.redactExpense.bind(this));
    }


    validation() {
        let isValid = true;
        if (this.redactTitle.value) {
            this.redactTitle.classList.remove('is-invalid');
        } else {
            this.redactTitle.classList.add('is-invalid');
            isValid = false;

        }

        return isValid
    }

    async redactExpense () {
        if (this.validation()){
            const urlParams = new URLSearchParams(window.location.search);

            const id = urlParams.get('id');
            let result  = await HttpUtils.request('/categories/expense/' + id, 'PUT', true, {
                title: this.redactTitle.value
            });
            if (result.response.error === true) {
                this.openNewRoute('/expenses/redact');
            } else {
                this.openNewRoute('/expenses');
            }
        }
    }
}