import {AuthUtils} from "../../utils/auth-utils";
import {HttpUtils} from "../../utils/http-utils";

export class CreateIncomeCategory {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.incomeTitle = document.getElementById('income-title');


        if (!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey) || !AuthUtils.getAuthInfo(AuthUtils.refreshTokenKey)) {
            return this.openNewRoute('/login');
        }


        let addIncomeCategoryButton = document.getElementById('save');
        addIncomeCategoryButton.addEventListener('click', this.addIncome.bind(this));
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

    async addIncome() {
        if (this.validation()) {
            const result = await HttpUtils.request('/categories/income', 'POST', true, {
                title: this.incomeTitle.value
            });
            if (result.response.error === true) {
                this.openNewRoute('/incomes/create');
            } else {
                this.openNewRoute('/incomes');
            }
        }


    }

}