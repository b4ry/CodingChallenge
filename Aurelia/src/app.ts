
    import {  Router, RouterConfiguration  } from 'aurelia-router';

    export class App {
      router: Router;

      constructor() {}

      configureRouter(config: RouterConfiguration, router: Router) {
        config.title = 'AureliaChallenge';
        config.map([
          { route: '',              moduleId: './components/challenge-selection/challenge-selection',   title: 'Select a challenge',  name: 'challengeSelection'}
        ]);

        this.router = router;
      }
    }