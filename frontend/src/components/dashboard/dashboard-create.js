import {AuthUtils} from "../../utils/auth-utils";
import {HttpUtils} from "../../utils/http-utils";

export class DashboardCreate {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        if (!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey) || !AuthUtils.getAuthInfo(AuthUtils.refreshTokenKey)) {
            return this.openNewRoute('/login');
        }


        this.type = document.getElementById('type');
        this.category = document.getElementById('category');
        this.sum = document.getElementById('sum');
        this.date = document.getElementById('date');
        this.comment = document.getElementById('comment');
        const saveButton = document.getElementById('save');


        this.getAllCategories()
        saveButton.addEventListener("click", this.createOperation.bind(this));



    }


  async getAllCategories () {
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

        if (this.sum.value) {
            this.sum.classList.remove('is-invalid');
        } else {
            this.sum.classList.add('is-invalid');
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

    async createOperation() {
        if (this.validation()) {
            const result = await HttpUtils.request('/operations',  'POST', true, {
                type:  this.type.value,
                amount: parseInt(this.sum.value),
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