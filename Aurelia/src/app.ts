
    import {  Router, RouterConfiguration  } from "aurelia-router";

    export class App {
      private router: Router;

      // tslint:disable-next-line:no-empty
      constructor() {}

      public configureRouter(config: RouterConfiguration, router: Router): void {
        config.title = "AureliaChallenge";
        config.map([
          {
            route: "",
            moduleId: "./components/challenge-selection/challenge-selection",
            title: "Select a challenge",
            name: "challengeSelection",
          },
        ]);

        this.router = router;
      }
    }