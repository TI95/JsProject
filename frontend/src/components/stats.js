import {AuthUtils} from "../utils/auth-utils";

export class Stats {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;


        if (!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey) || !AuthUtils.getAuthInfo(AuthUtils.refreshTokenKey)) {
            return this.openNewRoute('/login');

            /* this.getPieChart();*/
        }


        /*  getPieChart() {


              let data = {
                  datasets: [
                      {
                          data: [700, 500, 400, 600, 300],
                          backgroundColor: ['#DC3545', '#FD7E14', '#FFC107', '#20C997', '#0D6EFD'],
                      }
                  ],

                  labels: [
                      'Red',
                      'Orange',
                      'Yellow',
                      'Green',
                      'Blue',
                  ]
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

              const pie1 = document.getElementById('myChart');
              const pie2 = document.getElementById('myChart2');


              new Chart(pie1, {
                  type: 'pie',
                  data: data,
                  options: {
                      responsive: true,
                  },
                  plugins: [legendMargin]


              });
              new Chart(pie2, {
                  type: 'pie',
                  data: data,
                  options: {
                      responsive: true,
                  },
                  plugins: [legendMargin]


              })

          }*/
    }

}