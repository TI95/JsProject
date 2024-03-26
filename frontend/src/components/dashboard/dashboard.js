import {AuthUtils} from "../../utils/auth-utils";
import {HttpUtils} from "../../utils/http-utils";
import {BtnFilterUtils} from "../../utils/btn-filter-utils";

export class Dashboard extends BtnFilterUtils {
    constructor(openNewRoute) {
        super();
        this.openNewRoute = openNewRoute;

        if (!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey) || !AuthUtils.getAuthInfo(AuthUtils.refreshTokenKey)) {
            return this.openNewRoute('/login');
        }
        this.recordsElement = document.getElementById('records');


    }


    async showRecords() {
        this.recordsElement.innerHTML = '';

        for (let i = 0; i < this.result.response.length; i++) {
            const orderType = this.result.response[i].type;
            const id = this.result.response[i].id;


            const trElement = document.createElement('tr');

            const OperationNumberCell = trElement.insertCell();
            OperationNumberCell.innerText = i + 1;
            OperationNumberCell.classList.add('fw-bold');

            if (orderType === 'expense') {
                trElement.insertCell().innerHTML = '<span class="text-danger ">Расход</span';
            } else {
                trElement.insertCell().innerHTML = '<span class="text-success ">Доход</span';
            }

            trElement.insertCell().innerText = this.result.response[i].category;
            trElement.insertCell().innerText = this.result.response[i].amount + ' $';
            trElement.insertCell().innerText = (new Date(this.result.response[i].date)).toLocaleDateString('ru-RU');
            trElement.insertCell().innerText = this.result.response[i].comment;
            trElement.insertCell().innerHTML =
                '<div class="d-flex justify-content-end">' +
                '<button  class="border-0 bg-white click"  data-bs-toggle="modal" data-bs-target="#exampleModal" id="' + id + '">' +
                '<img src="images/trash-icon.png" alt="trash-icon" class="me-2">' +
                '</button>' +
                '<a href="dashboard/redact/?id=' + id + '">' +
                '<img src="/images/pen-icon.png" alt="pen-icon">' +
                '</a>' +
                '</div>';

            const deleteButton = trElement.querySelector('.click');
            deleteButton.addEventListener('click', () => {
                this.setDeleteModalId(id);
            });

            this.recordsElement.appendChild(trElement);

        }

    }

    setDeleteModalId(id) {
        this.modalDeleteButton = document.getElementById('delete');
        this.modalDeleteButton.dataset.cardId = id;
        document.getElementById('delete').addEventListener("click", this.deleteExpense.bind(this));

    }

    async deleteExpense() {
        const result = await HttpUtils.request('/operations/' + this.modalDeleteButton.dataset.cardId, 'DELETE', true)
        if (result.error === false) {
            return this.openNewRoute('/dashboard');
        }
    }
}

