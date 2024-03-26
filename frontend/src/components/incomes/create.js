import {CreateCategory} from "../../utils/create-category-utils";
import {AuthUtils} from "../../utils/auth-utils";

export class CreateIncomeCategory extends CreateCategory {
    constructor(openNewRoute) {
        super(openNewRoute, 'income', 'income-title');
        if (!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey) || !AuthUtils.getAuthInfo(AuthUtils.refreshTokenKey)) {
            return this.openNewRoute('/login');
        }
    }
}