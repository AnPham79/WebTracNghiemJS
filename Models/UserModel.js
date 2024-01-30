import { CoreModel } from '../Models/CoreModel.js';

export class UserModel extends CoreModel {
    constructor() {
        super();
    }

    handleLogin(email, password) {
        return this.db.data.user.filter(function(info) {
            return info.email === email && info.password === password;
        });
    }

    register() {
        
    }
}
