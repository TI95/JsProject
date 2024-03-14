import {AuthUtils} from "../../utils/auth-utils";

export class DashboardCreate {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        if (!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey) || !AuthUtils.getAuthInfo(AuthUtils.refreshTokenKey)) {
            return this.openNewRoute('/login');
        }
     /*   this.openNewRoute = openNewRoute;
        this.type = document.getElementById('type');
        this.category = document.getElementById('category');
        this.sum = document.getElementById('sum');
        this.date = document.getElementById('date');

        document.getElementById('process-button').addEventListener('click', this.validation.bind(this));*/

    }

  /*  validation() {

        let isValid = true;
        if (this.type.value) {
            this.type.classList.remove('is-invalid');
            this.type.style.marginBottom = '20px';
        } else {
            this.type.classList.add('is-invalid');
            this.type.style.marginBottom = '0';
            document.getElementById('type-error').style.marginBottom = '20px';

            isValid = false;
        }
        if (this.category.value) {
            this.category.classList.remove('is-invalid');
            this.category.style.marginBottom = '20px';
        } else {

            this.category.classList.add('is-invalid');
            this.category.style.marginBottom = '0';
            document.getElementById('category-error').style.marginBottom = '20px';


            isValid = false;
        }
        if (this.sum.value) {
            this.sum.classList.remove('is-invalid');
            this.sum.style.marginBottom = '20px';
        } else {
            this.sum.classList.add('is-invalid');
            this.sum.style.marginBottom = '0';
            document.getElementById('sum-error').style.marginBottom = '20px';


            isValid = false;
        }

        if (this.date.value) {
            this.date.classList.remove('is-invalid');
            this.date.style.marginBottom = '20px';
        } else {
            this.date.classList.add('is-invalid');
            this.date.style.marginBottom = '0';
            document.getElementById('date-error').style.marginBottom = '20px';


            isValid = false;

        }
        return isValid

    }*/
}