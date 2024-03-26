import {AuthUtils} from "../../utils/auth-utils";
import {CategoryHandler} from "../../utils/category-handler";

export class Incomes extends CategoryHandler{

    constructor(openNewRoute) {
        super(openNewRoute, 'income');
        if (!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey) || !AuthUtils.getAuthInfo(AuthUtils.refreshTokenKey)) {
            return this.openNewRoute('/login');
        }
    }

}


