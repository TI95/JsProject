import {HttpUtils} from "../../utils/http-utils";

export class DashboardGeneral {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute
        this.type = document.getElementById('type');
        this.category = document.getElementById('category');
        this.amount = document.getElementById('sum');
        this.date = document.getElementById('date');
        this.comment = document.getElementById('comment');
        this.option = document.getElementsByTagName('option')

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


    async CreateUpdateOperation(method, id) {
        if (this.validation()) {
            const result = await HttpUtils.request('/operations/' + (id ?? ''), method, true, {
                type: this.type.value,
                amount: parseInt(this.amount.value),
                date: this.date.value,
                category_id: parseInt(this.category.value),
                comment: this.comment.value
            })
            if (result.error === false && result.response) {
                this.openNewRoute('/dashboard');
            }

        }
    }
}