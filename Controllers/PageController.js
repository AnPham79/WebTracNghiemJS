// quản lí các trang k liên quan đến cái web của mình
// trang chủ, liên hệ, góp ý , giới thiệu
import { CoreController } from './CoreController.js';
import { QuizModel } from '../Models/QuizModel.js';

export class PageController extends CoreController {
    index() {
        var quizz = new QuizModel();
        var data = quizz.getAll(); 

        this.loadView('index', function() {
            var codeHtml = '';
            data.forEach(function(item, index, arr) {
                codeHtml += `<a href="?quizz/detail/${item.id}">${item.name}</a>`;
            });
            document.querySelector('#quiz-list').innerHTML = codeHtml;
        });
    }
}
