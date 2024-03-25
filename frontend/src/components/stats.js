import {AuthUtils} from "../utils/auth-utils";
import Chart from 'chart.js/auto'
import {HttpUtils} from "../utils/http-utils";

export class Stats {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.chart1 = null;
        this.chart2 = null;

        if (!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey) || !AuthUtils.getAuthInfo(AuthUtils.refreshTokenKey)) {
            return this.openNewRoute('/login');

        }
        this.getPieChart('today')

        const dateFrom = document.getElementById('date-from');
        const dateTo= document.getElementById('date-to');
        const todayButton = document.getElementById('today-btn');
        const weekButton = document.getElementById('week-btn');
        const monthButton = document.getElementById('month-btn');
        const yearButton = document.getElementById('year-btn');
        const allButton = document.getElementById('all-btn');
        const intervalButton = document.getElementById('interval-btn');

        todayButton.addEventListener("click", () => {
            this.getPieChart('today');
        });

        weekButton.addEventListener("click", () => {
            this.getPieChart('week');
        });

        monthButton.addEventListener("click", () => {
            this.getPieChart('month');
        });

        yearButton.addEventListener("click", () => {
            this.getPieChart('year');
        });

        allButton.addEventListener("click", () => {
            this.getPieChart('all');
        });

        intervalButton.addEventListener("click", () => {

            this.getPieChart('interval', dateFrom.value, dateTo.value);
        });

    }




   async getPieChart(useDate,dateFrom, dateTo) {
       const pie1 = document.getElementById('myChart');
       const pie2 = document.getElementById('myChart2');

       if (useDate && !dateFrom && !dateTo) {
           this.result = await HttpUtils.request('/operations?period=' + useDate);
       }

       if (useDate && dateFrom && dateTo) {
           this.result = await HttpUtils.request('/operations?period=' + useDate + '&dateFrom=' + dateFrom + '&dateTo=' + dateTo);
       }

       if (this.chart1) {
           this.chart1.destroy();
       }
       if (this.chart2) {
           this.chart2.destroy();
       }

       const incomeByCategory = {};
       const expenseByCategory = {};

       this.result.response.forEach(item => {
           if (item.type === 'income') {
               if (!incomeByCategory[item.category]) {
                   incomeByCategory[item.category] = item.amount;
               } else {
                   incomeByCategory[item.category] += item.amount;
               }
           } else if (item.type === 'expense') {
               if (!expenseByCategory[item.category]) {
                   expenseByCategory[item.category] = item.amount;
               } else {
                   expenseByCategory[item.category] += item.amount;
               }
           }
       });



        let dataForIncomes = {
            datasets: [
                {
                    data: Object.values(incomeByCategory),
                    backgroundColor: ['#DC3545', '#FD7E14', '#FFC107', '#20C997', '#0D6EFD'],
                }
            ],

            labels:  Object.keys(incomeByCategory)
        }
        let dataForExpenses = {
            datasets: [
                {
                    data: Object.values(expenseByCategory),
                    backgroundColor: ['#DC3545', '#FD7E14','#FFC107', '#20C997', '#0D6EFD'],
                }
            ],

            labels: Object.keys(expenseByCategory)
        }

        const legendMargin = {
            id: 'legendMargin',
            beforeInit(chart) {
                const fitValue = chart.legend.fit;
                chart.legend.fit = function fit() {
                    fitValue.bind(chart.legend)();
                    return this.height += 40;
                }
            }
        };





       this.chart1 =   new Chart(pie1, {
            type: 'pie',
            data: dataForIncomes,
            options: {
                responsive: true,
            },
            plugins: [legendMargin]


        });
       this.chart2 = new Chart(pie2, {
            type: 'pie',
            data: dataForExpenses,
            options: {
                responsive: true,
            },
            plugins: [legendMargin]
        })
    }
}