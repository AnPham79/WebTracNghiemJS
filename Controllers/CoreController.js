export class CoreController {
    loadView(viewName, callback = function() {}) {
        fetch(`../Views/${viewName}.html`)
            .then(function(response) {
                return response.text();
            })
            .then(function(codeHtml) {
                document.querySelector('body').insertAdjacentHTML('beforeend', codeHtml);
            })
            .then(function() {
                callback();
            })
            .catch(function(error) {
                console.error(' có lỗi ', error);
            });
    }
}
