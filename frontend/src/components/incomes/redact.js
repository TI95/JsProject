import {AuthUtils} from "../../utils/auth-utils";
import {HttpUtils} from "../../utils/http-utils";

export class RedactIncomeCategory {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        if (!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey) || !AuthUtils.getAuthInfo(AuthUtils.refreshTokenKey)) {
            return this.openNewRoute('/login');
        }

        this.incomeTitle = document.getElementById('income-title');
        let redactIncomeCategoryButton = document.getElementById('save');
        redactIncomeCategoryButton.addEventListener('click', this.redactIncome.bind(this));
    }


    validation() {
        let isValid = true;
        if (this.incomeTitle.value) {
            this.incomeTitle.classList.remove('is-invalid');
        } else {
            this.incomeTitle.classList.add('is-invalid');
            isValid = false;

        }

        return isValid
    }

    async redactIncome () {
        if (this.validation()){
            const urlParams = new URLSearchParams(window.location.search);

            const id = urlParams.get('id');
            let result  = await HttpUtils.request('/categories/income/' + id, 'PUT', true, {
                title: this.incomeTitle.value
            });
            if (result.response.error === true) {
                alert(result.response.message)
                this.openNewRoute('/incomes/redact');
            } else {
                this.openNewRoute('/incomes');
            }
        }
    }
}
