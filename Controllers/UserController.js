import { CoreController } from './CoreController.js';
import { UserModel } from '../Models/UserModel.js';

export class UserController extends CoreController {
    login() {
        var user = new UserModel();
        this.loadView('login', function() {
            document.querySelector('#form-login').addEventListener
            ('submit', function(event) {
                event.preventDefault();
                var email = document.querySelector('#email').value;
                var password = document.querySelector('#password').value;
                var result = user.handleLogin(email, password);

                if(result.length > 0) {
                    alert('Đăng nhập thành công');
                    console.log(result);
                } else {
                    alert('Đăng nhập thất bại');
                }
            })
        })
    }
}