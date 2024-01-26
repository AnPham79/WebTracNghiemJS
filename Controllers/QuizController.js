import { CoreController } from "./CoreController.js";
import { QuizModel } from "../Models/QuizModel.js";

export class QuizController extends CoreController {
    detail(id) {
        var quizz = new QuizModel();
        var data = quizz.getById(id);
        console.log(data);
        this.loadView('quiz_detail', function() {
            // hiển thị dữ liệu của quiz lên view detail
            document.querySelector('#name').innerHTML = data.name;
            document.querySelector('#time').innerHTML = data.time;
            document.querySelector('#startDate').innerHTML = data.startDate;
            document.querySelector('#endDate').innerHTML = data.endDate;
            document.querySelector('#limit').innerHTML = data.limit;
            document.querySelector('#question').innerHTML = data.question.length;
            document.querySelector('#score').innerHTML = data.question.length;
            document.querySelector('#btn-start').href = '?quizz/start/' + data.id;
        });
    }
}