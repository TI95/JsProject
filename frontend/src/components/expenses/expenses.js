import {AuthUtils} from "../../utils/auth-utils";
 import {CategoryHandler} from "../../utils/category-handler";

export class  Expenses extends CategoryHandler{

        constructor(openNewRoute) {
            super(openNewRoute, 'expense');
            if (!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey) || !AuthUtils.getAuthInfo(AuthUtils.refreshTokenKey)) {
                return this.openNewRoute('/login');
            }
        }
}

