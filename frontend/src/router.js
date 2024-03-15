import {FileUtils} from "./utils/file-utils";
import {Stats} from "./components/stats";
import {Incomes} from "./components/incomes/incomes";
import {Expenses} from "./components/expenses/expenses";
import {Dashboard} from "./components/dashboard/dashboard";
import {DashboardCreate} from "./components/dashboard/dashboard-create";
import {DashboardRedact} from "./components/dashboard/dashboard-redact";
import {Login} from "./components/auth/login";
import {Signup} from "./components/auth/signup";
import {Logout} from "./components/auth/logout";
import {CreateIncomeCategory} from "./components/incomes/create";
import {RedactIncomeCategory} from "./components/incomes/redact";
import {RedactExpenseCategory} from "./components/expenses/redact";
import {CreateExpenseCategory} from "./components/expenses/create";

export class Router {
    constructor() {
        this.titlePageElement = document.getElementById('title');
        this.contentPageElement = document.getElementById('content');


        this.initEvents();

        this.routes = [
            {
                route: '/',
                title: 'Главная',
                filePathTemplate: '/templates/pages/statscharts.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Stats(this.openNewRoute.bind(this));

                },

            },
            {
                route: '/login',
                title: 'Логин',
                filePathTemplate: '/templates/pages/auth/login.html',
                useLayout: false,
                load: () => {
                    document.body.classList.add('d-flex');
                    document.body.classList.add('justify-content-center');
                    document.body.classList.add('align-items-center');
                    document.body.style.height = '100vh';
                    new Login(this.openNewRoute.bind(this));
                },
                unload: () => {
                    document.body.classList.remove('d-flex');
                    document.body.classList.remove('justify-content-center');
                    document.body.classList.remove('align-items-center');
                    document.body.style.height = 'auto';
                },

            },
            {
                route: '/signup',
                title: 'Регистрация',
                filePathTemplate: '/templates/pages/auth/signup.html',
                useLayout: false,
                load: () => {
                    document.body.classList.add('d-flex');
                    document.body.classList.add('justify-content-center');
                    document.body.classList.add('align-items-center');
                    document.body.style.height = '100vh';
                    new Signup(this.openNewRoute.bind(this));
                },
                unload: () => {
                    document.body.classList.remove('d-flex');
                    document.body.classList.remove('justify-content-center');
                    document.body.classList.remove('align-items-center');
                    document.body.style.height = 'auto';
                },

            },
            {
                route: '/logout',
                load: () => {
                    new Logout(this.openNewRoute.bind(this));
                }
            },
            {
                route: '/incomes',
                title: 'Доходы',
                filePathTemplate: '/templates/pages/incomes/incomes.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Incomes(this.openNewRoute.bind(this));
                },

            },
            {
                route: '/incomes/create',
                title: 'Добавление категории дохода',
                filePathTemplate: '/templates/pages/incomes/create.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new CreateIncomeCategory(this.openNewRoute.bind(this));


                },

            },
            {
                route: '/incomes/redact',
                title: 'Изменение категории дохода',
                filePathTemplate: '/templates/pages/incomes/redact.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new RedactIncomeCategory(this.openNewRoute.bind(this));

                },

            },
            {
                route: '/expenses',
                title: 'Расходы',
                filePathTemplate: '/templates/pages/expenses/expenses.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Expenses(this.openNewRoute.bind(this));

                },

            },
            {
                route: '/expenses/create',
                title: 'Добавление категории дохода',
                filePathTemplate: '/templates/pages/expenses/create.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new CreateExpenseCategory(this.openNewRoute.bind(this));

                },

            },
            {
                route: '/expenses/redact',
                title: 'Изменение категории дохода',
                filePathTemplate: '/templates/pages/income/redact.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new RedactExpenseCategory(this.openNewRoute.bind(this));

                },

            },
            {
                route: '/dashboard',
                title: 'Доходы и расходы',
                filePathTemplate: '/templates/pages/dashboard/dashboard.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Dashboard(this.openNewRoute.bind(this));

                },

            },
            {
                route: '/dashboard/create',
                title: 'Создать доход и расход',
                filePathTemplate: '/templates/pages/dashboard/create.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new DashboardCreate(this.openNewRoute.bind(this));

                },

            },
            {
                route: '/dashboard/redact',
                title: 'Редактировать доход и расход',
                filePathTemplate: '/templates/pages/dashboard/redact.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new DashboardRedact(this.openNewRoute.bind(this));

                },

            },
        ]

    }

    initEvents() {
        window.addEventListener('DOMContentLoaded', this.activateRoute.bind(this)) // отлавливаем, что страница загружается
        window.addEventListener('popstate', this.activateRoute.bind(this)) // отлавливаем когда поменялся url
        //document.addEventListener('click', this.clickHandler.bind(this));
    }

    async openNewRoute(url) {

        const currentRoute = window.location.pathname;
        history.pushState({}, '', url);
        await this.activateRoute(null, currentRoute);

    }

    async activateRoute(e, oldRoute) {
        if (oldRoute) {
            const currentRoute = this.routes.find(item => item.route === oldRoute);
            if (currentRoute.unload && typeof currentRoute.unload === 'function') {
                currentRoute.unload();
            }
        }

        const urlRoute = window.location.pathname;
        const newRoute = this.routes.find(item => item.route === urlRoute);

        if (newRoute) {


            if (newRoute.title) {
                this.titlePageElement.innerText = newRoute.title + ' | Lumincoin Finance'
            }

            if (newRoute.filePathTemplate) {
                let contentBlock = this.contentPageElement;
                if (newRoute.useLayout) {
                    this.contentPageElement.innerHTML = await fetch(newRoute.useLayout).then(response => response.text());
                    contentBlock = document.getElementById('content-layout');
                }

                contentBlock.innerHTML = await fetch(newRoute.filePathTemplate).then(response => response.text());
            }

            if (newRoute.load && typeof newRoute.load === 'function') {
                newRoute.load();
            }
        }
    }
}