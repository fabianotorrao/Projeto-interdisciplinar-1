import UserView from './views/UserView.js'
class App {
    constructor() {
        this.routes = {
            '': [
                UserView

            ],
            'index': [
                UserView
                
            ],
            'activities': [
                UserView

            ]
        };

        this._importDataFixtures();
        this._instantiateViews();
        
    }

    _instantiateViews() {
        
        const path = window.location.pathname
        const file = path.substr(path.lastIndexOf('/') + 1);
        const route = file.split('.')[0];

        const views = this._getViews(route);

        for (const view of views) {
            new view();
            
        }
    }

    _getViews(route) {
        return typeof this.routes[route] === 'undefined' ? [] : this.routes[route];
    }

    _importDataFixtures() {


        const users = [
            {
                id: 1,
                email: "adminAppManager@geome.com",
                username: 'AdminUser',
                password: 'AdminAppUser'
            }
        ];

        // Load the fixtures in case there is no data in the local storage 
        if (!localStorage.users) {
            localStorage.setItem('users', JSON.stringify(users));
        }
    }
}

new App();
