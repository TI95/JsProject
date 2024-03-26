import {AuthUtils} from "../../utils/auth-utils";
import {HttpUtils} from "../../utils/http-utils";
import {DashboardGeneral} from "./dashboard-general";

export class DashboardRedact extends DashboardGeneral {
    constructor(openNewRoute) {
        super(openNewRoute);

        if (!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey) || !AuthUtils.getAuthInfo(AuthUtils.refreshTokenKey)) {
            return this.openNewRoute('/login');
        }

        const url = window.location.href;
        const urlParams = new URLSearchParams(new URL(url).search);
        this.id = urlParams.get('id');
        const saveButton = document.getElementById('save');

        this.getDataForRedact(this.id);
        this.type.addEventListener('change', () => {
            this.category.innerHTML = '';
            this.getDataForRedact(this.id);

        });

        saveButton.addEventListener("click", async () =>
            await this.CreateUpdateOperation('PUT', this.id));


    }


    async getDataForRedact() {
        const getData = await HttpUtils.request('/operations/' + this.id);
        if (getData.response && this.type.value === 'type') {
            const optionElement = this.type.querySelector(`option[value="${getData.response.type}"]`);
            if (optionElement) {
                optionElement.selected = true;
            }
        }

        if (this.type.value.toLocaleLowerCase() === 'income') {
            const allIncomeCategories = await HttpUtils.request('/categories/income');
            allIncomeCategories.response.forEach(income => {
                const incomeTitle = income.title;
                const incomeId = income.id;
                const optionElement = document.createElement('option');
                optionElement.innerText = incomeTitle;
                optionElement.value = incomeId;
                this.category.appendChild(optionElement);
                if (income.title === getData.response.category) {
                    optionElement.selected = true;

                }
            })
        } else if (this.type.value.toLocaleLowerCase() === 'expense') {
            const allExpenseCategories = await HttpUtils.request('/categories/expense');
            allExpenseCategories.response.forEach(expense => {
                const expenseTitle = expense.title;
                const expenseID = expense.id;
                const optionElement = document.createElement('option');
                optionElement.innerText = expenseTitle;
                optionElement.value = expenseID;
                this.category.appendChild(optionElement);
                if (expense.title === getData.response.category) {
                    optionElement.selected = true;
                }
            });
        }
        this.amount.value = getData.response.amount;
        this.date.value = getData.response.date;
        this.comment.value = getData.response.comment;
    }
}