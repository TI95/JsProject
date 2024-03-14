import {AuthUtils} from "../../utils/auth-utils";

export class Incomes {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        if (!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey) || !AuthUtils.getAuthInfo(AuthUtils.refreshTokenKey)) {
            return this.openNewRoute('/login');
        }

      /*  let deleteButton = document.querySelectorAll('.card-btn-delete');
        let CancelDeleteButton = document.getElementById('btn-cancel');

        deleteButton.forEach(button => {
            button.addEventListener('click', function () {
                document.getElementById('popup-container').style.display = 'block';
            });
        });



        CancelDeleteButton.addEventListener('click', function () {
            document.getElementById('popup-container').style.display = 'none';
        });

*/
    }

}