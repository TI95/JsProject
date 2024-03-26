import {AuthUtils} from "./auth-utils";
import {HttpUtils} from "./http-utils";

export class CreateCategory {
    constructor(openNewRoute, categoryUrl, inputId) {
        this.openNewRoute = openNewRoute;
        this.input = document.getElementById(inputId);

        if (!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey) || !AuthUtils.getAuthInfo(AuthUtils.refreshTokenKey)) {
            return this.openNewRoute('/login');
        }

        const addButton = document.getElementById('save');
        addButton.addEventListener('click', this.addCategory.bind(this));

        this.categoryUrl = categoryUrl;
    }

    validation() {
        let isValid = true;
        if (this.input.value) {
            this.input.classList.remove('is-invalid');
        } else {
            this.input.classList.add('is-invalid');
            isValid = false;
        }
        return isValid;
    }

    async addCategory() {
        if (this.validation()) {
            const result = await HttpUtils.request(`/categories/${this.categoryUrl}`, 'POST', true, {
                title: this.input.value
            });
            if (result.response.error === true) {
                this.openNewRoute(`/${this.categoryUrl}/create`);
            } else {
                this.openNewRoute(`/${this.categoryUrl}`);
            }
        }
    }
}