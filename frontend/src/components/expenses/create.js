import {CreateCategory} from "../../utils/create-category-utils";
import {AuthUtils} from "../../utils/auth-utils";

export class CreateExpenseCategory extends CreateCategory {
    constructor(openNewRoute) {
        super(openNewRoute, 'expense', 'expense-title');
        if (!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey) || !AuthUtils.getAuthInfo(AuthUtils.refreshTokenKey)) {
            return this.openNewRoute('/login');
        }
    }
}