import {HttpUtils} from "./http-utils";

export class BtnFilterUtils {

    constructor() {
        this.result = null
        const dateFrom = document.getElementById('date-from');
        const dateTo = document.getElementById('date-to');
        const todayButton = document.getElementById('today-btn');
        const weekButton = document.getElementById('week-btn');
        const monthButton = document.getElementById('month-btn');
        const yearButton = document.getElementById('year-btn');
        const allButton = document.getElementById('all-btn');
        const intervalButton = document.getElementById('interval-btn');

        this.getDataForRecords('today');

        todayButton.addEventListener("click", () => {
            this.getDataForRecords('today');
            removeActiveClass()
            todayButton.classList.add('active');
        });

        weekButton.addEventListener("click", () => {
            this.getDataForRecords('week');
            removeActiveClass()
            weekButton.classList.add('active');
        });

        monthButton.addEventListener("click", () => {
            this.getDataForRecords('month');
            removeActiveClass()
            monthButton.classList.add('active');
        });

        yearButton.addEventListener("click", () => {
            this.getDataForRecords('year');
            removeActiveClass()
            yearButton.classList.add('active');
        });

        allButton.addEventListener("click", () => {
            this.getDataForRecords('all');
            removeActiveClass()
            allButton.classList.add('active');
        });

        intervalButton.addEventListener("click", () => {
            const dateFromFormatted = formatDate(dateFrom.value);
            const dateToFormatted = formatDate(dateTo.value);

            function formatDate(dateString) {
                const [day, month, year] = dateString.split('.');
                return `${year}-${month}-${day}`;
            }

            this.getDataForRecords('interval', dateFromFormatted, dateToFormatted);
            removeActiveClass()
            intervalButton.classList.add('active');
        });

        function removeActiveClass() {
            const buttons = document.querySelectorAll('.data-filter-btn');
            buttons.forEach(button => {
                button.classList.remove('active');
            });
        }
    }




    async getDataForRecords (period, dateFrom, dateTo) {
        if (period && !dateFrom && !dateTo) {
            this.result = await HttpUtils.request('/operations?period=' + period);
        }

        if (period && dateFrom && dateTo) {
            this.result = await HttpUtils.request('/operations?period=' + period  + '&dateFrom=' + dateFrom + '&dateTo=' + dateTo);
        }


        if (window.location.pathname === '/dashboard') {
            this.showRecords(this.result);
        } else if (window.location.pathname === '/') {
            this.getPieChart(this.result);
        }

    }


}