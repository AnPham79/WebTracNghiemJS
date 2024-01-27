import { CoreModel } from '../Models/CoreModel.js';

export class QuizModel extends CoreModel {
    constructor() {
        super();
    }

    getAll() {
        return this.db.data.quizz;
    }

    getById(id) {
        return this.db.data.quizz.filter(function(item) {
            return item.id == id;
        })[0];
    }

    getAnswerByQuiz(id) {
        var quizz = this.db.data.quizz.filter(function(item) {
            return item.id == id;
        })[0];
        var { question } = quizz;
        question = question.map(function(question) {
            return {
                [question.id] : question.answers
            }
        })
        return Object.assign(...question);
    }
}
