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

    start(id) {
        // console.log('bắt đầu làm bài quizz: ' + id);
        var quizz = new QuizModel();
        var data = quizz.getById(id)
        var answerList = quizz.getAnswerByQuiz(id);

        this.loadView('quiz_start', function() {
            var codeHTML = '';
            data.question = data.question.sort((a,b)=>{
                return Math.random()-0.5;
            })
            data.question.forEach(function(question) {
                var codeHTMLoption = '';
                var type = (question.answers.length > 1) ? 'checkbox' : 'radio';
                question.options.forEach(function(option) {
                    codeHTMLoption += `<label class="option" for="option-${option.id}-question-${question.id}">
                        <input type="${type}" name="option-question-${question.id}" 
                    id="option-${option.id}-question-${question.id}" value="${option.id}">
                    ${option.content}
                </label> 
                <br>`
                })
                codeHTML += `<div class="question">
                <h4>${question.content}</h4>
                    ${codeHTMLoption}
                </div>`
            })
            document.querySelector('#test').innerHTML = codeHTML;

            var optionList = document.querySelectorAll('.option input');
            var selectList = {};
            
            optionList.forEach(function (option) {
                option.addEventListener('click', function() {

                    var idQuestion = option.name.split('-').pop();

                    if(option.type == 'radio') {
                        selectList[idQuestion] = [];
                        selectList[idQuestion].push(option.value);
                    } else { // check box

                        if(selectList[idQuestion] == undefined) {
                            selectList[idQuestion] = [];
                        }

                        if (!option.checked) {
                            var index = selectList[idQuestion].indexOf(option.value);
                            selectList[idQuestion].splice(index, 1);
                        } else {
                            selectList[idQuestion].push(option.value);
                        }
                    }

                    console.log(selectList);
                })
            })

            document.querySelector('#btn-submit').addEventListener('click', function() {
                var questionList = Object.keys(selectList);
                var soCauDung = 0;
            
                questionList.forEach(function(id) {
                    console.log(selectList[id], answerList[id]);
            
                    selectList[id] = selectList[id].sort();
                    answerList[id] = answerList[id].sort();
                    
                    var check = true;
            
                    for(var i = 0; i < selectList[id].length; i++) {
                        if (selectList[id].length != answerList[id].length ||
                            selectList[id][i] != answerList[id][i]) {
                            check = false;
                            break;
                        }
                    }
            
                    if(check == true) {
                        soCauDung++;
                    }
                });
                console.log('số câu đúng:' + soCauDung);
                var ketqua = {
                    tile : (soCauDung/data.question.length)*100,
                    diem : (soCauDung/data.question.length) * data.score,
                    soCauDung : soCauDung,
                    soCau : data.question.length
                }

                document.querySelector('#cau-dung').innerHTML = ketqua.soCauDung;
                document.querySelector('#so-cau').innerHTML = ketqua.soCau;
                document.querySelector('#diem').innerHTML = ketqua.diem;
                document.querySelector('#phan-tram').innerHTML = ketqua.tile;
                document.querySelector('#score').style.display = 'block';
                document.querySelector('.lam_quiz').style.display = 'none';
            })
        });
    }
}