import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./styles/styles.scss";

import {Router} from "./router";
class app {

    constructor() {
        new Router();
    }

}

(new app());