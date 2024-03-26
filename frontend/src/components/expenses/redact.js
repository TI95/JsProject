import {RedactCategory} from "../../utils/redact-category-utils";

export class RedactExpenseCategory extends RedactCategory {
    constructor(openNewRoute) {
        super(openNewRoute, 'expense', 'expense-title');
    }
}