import {AuthUtils} from "./auth-utils";
import {HttpUtils} from "./http-utils";


export class RedactCategory {
    constructor(openNewRoute, categoryUrl, inputId) {
        this.openNewRoute = openNewRoute;
        this.title = document.getElementById(inputId);

        if (!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey) || !AuthUtils.getAuthInfo(AuthUtils.refreshTokenKey)) {
            return this.openNewRoute('/login');
        }

        const redactButton = document.getElementById('save');
        redactButton.addEventListener('click', this.redact.bind(this));

        this.categoryUrl = categoryUrl;
    }

    validation() {
        let isValid = true;
        if (this.title.value) {
            this.title.classList.remove('is-invalid');
        } else {
            this.title.classList.add('is-invalid');
            isValid = false;
        }
        return isValid;
    }

    async redact() {
        if (this.validation()) {
            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get('id');
            const result = await HttpUtils.request(`/categories/${this.categoryUrl}/${id}`, 'PUT', true, {
                title: this.title.value
            });
            if (result.response.error === true) {
                this.openNewRoute(`/${this.categoryUrl}/redact`);
            } else {
                this.openNewRoute(`/${this.categoryUrl}`);
            }
        }
    }
}


