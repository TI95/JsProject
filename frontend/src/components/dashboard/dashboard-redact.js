import {AuthUtils} from "../../utils/auth-utils";
import {HttpUtils} from "../../utils/http-utils";

export class DashboardRedact {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        const url = window.location.href;
        const urlParams = new URLSearchParams(new URL(url).search);
        this.id = urlParams.get('id');
        this.type = document.getElementById('type');

        this.category = document.getElementById('category');
        this.amount = document.getElementById('sum');
        this.date = document.getElementById('date');
        this.comment = document.getElementById('comment');
        this.option = document.getElementsByTagName('option')
        const saveButton = document.getElementById('save');

         if (!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey) || !AuthUtils.getAuthInfo(AuthUtils.refreshTokenKey)) {
            return this.openNewRoute('/login');
        }

        this.getDataForRedact(this.id);
        this.type.addEventListener('change', () => {
            this.category.innerHTML = '';
            this.getDataForRedact(this.id);

        });

        saveButton.addEventListener("click", this.updateOperation.bind(this));


    }


    async getDataForRedact () {
        const getData = await HttpUtils.request('/operations/' + this.id);
        if (getData.response && this.type.value === 'type' ){
            const optionElement = this.type.querySelector(`option[value="${getData.response.type}"]`);
            if (optionElement) {
                optionElement.selected = true;
            }
        }

        if (this.type.value.toLocaleLowerCase() === 'income'){
            const allIncomeCategories = await HttpUtils.request('/categories/income');
            allIncomeCategories.response.forEach(income => {
                const incomeTitle = income.title;
                const incomeId = income.id;
                const optionElement = document.createElement('option');
                optionElement.innerText = incomeTitle;
                optionElement.value = incomeId;
                this.category.appendChild(optionElement);
                if(income.title === getData.response.category){
                    optionElement.selected = true;

                }
        })
        }
        else if (this.type.value.toLocaleLowerCase() === 'expense') {
                const allExpenseCategories = await HttpUtils.request('/categories/expense');
                allExpenseCategories.response.forEach(expense => {
                    const expenseTitle = expense.title;
                    const expenseID = expense.id;
                    const optionElement = document.createElement('option');
                    optionElement.innerText = expenseTitle;
                    optionElement.value = expenseID;
                    this.category.appendChild(optionElement);
                    if(expense.title === getData.response.category){
                        optionElement.selected = true;
                    }
                });
            }
        this.amount.value = getData.response.amount;
        this.date.value = getData.response.date;
        this.comment.value = getData.response.comment;
    }


    validation() {

        let isValid = true;
        if (this.type.value === 'type') {
            this.type.classList.add('is-invalid');
            isValid = false;
        } else {
            this.type.classList.remove('is-invalid');
        }

        if (this.category.value === 'category') {
            this.category.classList.add('is-invalid');
            isValid = false;
        } else {
            this.category.classList.remove('is-invalid');
        }

        if (this.amount.value) {
            this.amount.classList.remove('is-invalid');
        } else {
            this.amount.classList.add('is-invalid');
            isValid = false;

        }

        if (this.date.value) {
            this.date.classList.remove('is-invalid');
        } else {
            this.date.classList.add('is-invalid');
            isValid = false;

        }

        if (this.date.value) {
            this.date.classList.remove('is-invalid');
        } else {
            this.date.classList.add('is-invalid');
            isValid = false;

        }

        if (this.comment.value) {
            this.comment.classList.remove('is-invalid');
        } else {
            this.comment.classList.add('is-invalid');
            isValid = false;

        }

        return isValid
    }

    async updateOperation () {
        if(this.validation){
            const result = await HttpUtils.request('/operations/' + this.id, 'PUT', true, {
                type:  this.type.value,
                amount: this.amount.value,
                date: this.date.value,
                category_id: parseInt(this.category.value) ,
                comment: this.comment.value
            })
            if (result.error === false && result.response) {
                this.openNewRoute('/dashboard');
            }
        }
    }
}