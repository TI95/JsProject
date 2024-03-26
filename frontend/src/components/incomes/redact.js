import {RedactCategory} from "../../utils/redact-category-utils";

export class RedactIncomeCategory extends RedactCategory {
    constructor(openNewRoute) {
        super(openNewRoute, 'income', 'income-title');
    }
}