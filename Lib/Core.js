import { PageController } from '../Controllers/PageController.js';
import { QuizController } from '../Controllers/QuizController.js';

export class Core {
    controller = 'page'
    method = 'index'
    params = []

    constructor() {
        var search = location.search.slice(1);
        if(search.length > 0) {
            var url = search.split('/');
            [this.controller, this.method, ...this.params] = url;
        }
        
        console.log(this.controller, this.method, this.params);

        switch (this.controller) {
            case 'page':
                var controller = new PageController();
                controller[this.method](this.params);
                break;
            case 'quizz':
                var controller = new QuizController();
                controller[this.method](this.params);
                break;
            default:
                break;
        }
    }
}