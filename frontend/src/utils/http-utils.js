import config from "../config/config";
import {AuthUtils} from "./auth-utils";


export class HttpUtils {
    static async request (url, method = "GET", useAuth = true, body = null){

        const result = {
            error: false,
            response: null,
        };

        const params = {
            method: method,
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
            },
        };

        let token = null;

        if (useAuth) {
            token = AuthUtils.getAuthInfo(AuthUtils.refreshTokenKey);
            if (token) {
                params.headers['x-auth-token'] = token;
            }
        }

        if (body) {
            params.body = JSON.stringify(body);
            if (body.fio){
                const [name, lastName] =  body.fio.split(" ", 2)
                params.body = JSON.stringify({name: name, lastName: lastName,email: body.email, password: body.password, passwordRepeat: body.passwordRepeat})

            }
        }

        let response = null;
        try {
            response = await fetch(config.api + url, params);
            result.response = await response.json();
        } catch (e) {
            result.error = true;
            return result;
        }

        if (response.status < 200 || response.status >= 300) {
            result.error = true;
            if (useAuth && response.status === 401) {
                if (!token) {
                    result.redirect = '/login';
                } else {
                    const updateTokenResult = await AuthUtils.updateRefreshToken();
                    if (updateTokenResult) {
                        return this.request(url, method, useAuth, body);
                    } else {
                        result.redirect = '/login';

                    }
                }
            }
        }
        return result;
    }
}