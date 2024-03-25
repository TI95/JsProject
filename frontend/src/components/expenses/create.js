import {AuthUtils} from "../../utils/auth-utils";
import {HttpUtils} from "../../utils/http-utils";

export class CreateExpenseCategory {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        if (!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey) || !AuthUtils.getAuthInfo(AuthUtils.refreshTokenKey)) {
            return this.openNewRoute('/login');
        }

        this.expenseTitle = document.getElementById('expense-title');
        let addExpenseCategoryButton = document.getElementById('save');
        addExpenseCategoryButton.addEventListener('click', this.addExpense.bind(this));

    }

    validation() {
        let isValid = true;
        if (this.expenseTitle.value) {
            this.expenseTitle.classList.remove('is-invalid');
        } else {
            this.expenseTitle.classList.add('is-invalid');
            isValid = false;
        }
        return isValid
    }

    async addExpense(){
        if(this.validation()){
            const result  = await HttpUtils.request('/categories/expense','POST', true, {
                title: this.expenseTitle.value
            });
            if (result.response.error === true) {
                this.openNewRoute('/expenses/create');
            } else {
                this.openNewRoute('/expenses');
            }
        }
    }
}