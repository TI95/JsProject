import {AuthUtils} from "../../utils/auth-utils";
import {HttpUtils} from "../../utils/http-utils";

export class Dashboard {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        if (!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey) || !AuthUtils.getAuthInfo(AuthUtils.refreshTokenKey)) {
            return this.openNewRoute('/login');
        }

        this.showRecords('today');
        const dateFrom = document.getElementById('date-from');
        const dateTo = document.getElementById('date-to');
        this.recordsElement = document.getElementById('records');
        const todayButton = document.getElementById('today-btn');
        const weekButton = document.getElementById('week-btn');
        const monthButton = document.getElementById('month-btn');
        const yearButton = document.getElementById('year-btn');
        const allButton = document.getElementById('all-btn');
        const intervalButton = document.getElementById('interval-btn');

        todayButton.addEventListener("click", () => {
            this.updateRecords('today');
        });

        weekButton.addEventListener("click", () => {
            this.updateRecords('week');
        });

        monthButton.addEventListener("click", () => {
            this.updateRecords('month');
        });

        yearButton.addEventListener("click", () => {
            this.updateRecords('year');
        });

        allButton.addEventListener("click", () => {
            this.updateRecords('all');
        });

        intervalButton.addEventListener("click", () => {
            const dateFromFormatted = formatDate(dateFrom.value);
            const dateToFormatted = formatDate(dateTo.value);

            function formatDate(dateString) {
                const [day, month, year] = dateString.split('.');
                return `${year}-${month}-${day}`;
            }
            this.updateRecords('interval', dateFromFormatted, dateToFormatted);


        });
    }
    async updateRecords(period,dateFrom,dateTo) {
        this.recordsElement.innerHTML = '';
        await this.showRecords(period, dateFrom, dateTo);
    }

    async showRecords(useDate, dateFrom, dateTo) {

        if (useDate && !dateFrom && !dateTo) {
            this.result = await HttpUtils.request('/operations?period=' + useDate);
        }

        if (useDate && dateFrom && dateTo) {
               this.result = await HttpUtils.request('/operations?period=' + useDate + '&dateFrom=' + dateFrom + '&dateTo=' + dateTo);
            }

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

