import {AuthUtils} from "./auth-utils";
import {HttpUtils} from "./http-utils";


export class CategoryHandler {
    constructor(openNewRoute, categoryUrl) {
        this.openNewRoute = openNewRoute;
        this.categoryUrl = categoryUrl;

        if (!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey) || !AuthUtils.getAuthInfo(AuthUtils.refreshTokenKey)) {
            return this.openNewRoute('/login');
        }

        this.receiveUserData();

        document.getElementById(`delete-${this.categoryUrl}`).addEventListener("click", this.deleteCategory.bind(this));
    }

    async receiveUserData() {
        const result = await HttpUtils.request(`/categories/${this.categoryUrl}`, 'GET', true);
        if (result) {
            const container = document.getElementById('container');

            result.response.forEach(item => {
                const id = item.id;
                const title = item.title;

                const divCard = document.createElement('div');
                divCard.classList.add('card', 'my-card-class');
                divCard.setAttribute('data-card-id', id);

                const divCardBodyDiv = document.createElement('div');
                divCardBodyDiv.classList.add('card-body');

                const h3 = document.createElement("h3");
                h3.classList.add('mb-3');
                h3.innerText = title;

                const divForButtons = document.createElement('div');
                divForButtons.classList.add('d-flex', 'flex-sm-row', 'flex-column');

                const redactButton = document.createElement('a');
                redactButton.classList.add('btn', 'btn-primary', 'me-sm-2', 'me-0', 'my-font-size', 'mb-sm-0', 'mb-2', 'justify-content-center');
                redactButton.innerText = 'Редактировать';
                redactButton.setAttribute('href', `/${this.categoryUrl}/redact?id=${id}`);

                const deleteButton = document.createElement('button');
                deleteButton.classList.add('btn', 'btn-danger', 'my-font-size');
                deleteButton.setAttribute('type', 'button');
                deleteButton.setAttribute('data-bs-toggle', 'modal');
                deleteButton.setAttribute('data-bs-target', '#exampleModal');
                deleteButton.setAttribute('data-id', id);
                deleteButton.innerText = 'Удалить';
                deleteButton.addEventListener('click', () => {
                    this.setDeleteModalId(id);
                });

                divCardBodyDiv.appendChild(h3);
                divForButtons.appendChild(redactButton);
                divForButtons.appendChild(deleteButton);
                divCardBodyDiv.appendChild(divForButtons);
                divCard.appendChild(divCardBodyDiv);
                container.insertBefore(divCard, container.firstChild);
            });
        }
    }

    setDeleteModalId(id) {
        this.modalDeleteButton = document.getElementById(`delete-${this.categoryUrl}`);
        this.modalDeleteButton.dataset.cardId = id;
    }

    async deleteCategory() {
        const cardId = this.modalDeleteButton.dataset.cardId;
        const result = await HttpUtils.request(`/categories/${this.categoryUrl}/${cardId}`, 'DELETE', true);
        if (result.error === false) {
            return this.openNewRoute(`/${this.categoryUrl}`);
        }
    }
}