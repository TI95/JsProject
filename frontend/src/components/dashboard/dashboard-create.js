import {AuthUtils} from "../../utils/auth-utils";
import {HttpUtils} from "../../utils/http-utils";
import {DashboardGeneral} from "./dashboard-general";

export class DashboardCreate extends DashboardGeneral {
    constructor(openNewRoute) {
        super(openNewRoute);


        if (!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey) || !AuthUtils.getAuthInfo(AuthUtils.refreshTokenKey)) {
            return this.openNewRoute('/login');
        }


        const saveButton = document.getElementById('save');

        this.getAllCategories()
        saveButton.addEventListener("click", async () => await this.CreateUpdateOperation('POST'));


    }


    async getAllCategories() {
        this.type.addEventListener('change', async () => {
            const selectedType = this.type.value;
            this.category.innerHTML = '';

            if (selectedType === 'income') {
                const allIncomeCategories = await HttpUtils.request('/categories/income');
                allIncomeCategories.response.forEach(income => {
                    const incomeTitle = income.title;
                    const incomeId = income.id;
                    const optionElement = document.createElement('option');
                    optionElement.innerText = incomeTitle;
                    optionElement.value = incomeId;
                    this.category.appendChild(optionElement);
                });
            } else if (selectedType === 'expense') {
                const allExpenseCategories = await HttpUtils.request('/categories/expense');
                allExpenseCategories.response.forEach(expense => {
                    const expenseTitle = expense.title;
                    const expenseID = expense.id;
                    const optionElement = document.createElement('option');
                    optionElement.innerText = expenseTitle;
                    optionElement.value = expenseID;
                    this.category.appendChild(optionElement);
                });
            }
        });
    }

}