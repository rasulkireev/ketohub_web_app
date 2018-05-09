## SSR Notes
I've written a step by step setup guide to SSR here:
https://www.blacksandsolutions.co/blog/posts/server-side-rendering-with-angular-and-firebase.

## SSR Title
In short you cannot set the title using the usual Angular template / directive methods since the Angular applicaiton is bootstrapped within the document. However, Angular provides a service for updating the title. We use a subscription to call this whenever the route (query parms change). Currently this is implemented in the recipe-list component. However it would probably be better to more this code to a more central locaiton higher up the component tree.

The key point for SSR of the title is to ensure that the path passed to `renderModuleFactory` in `functions/index.js` contains the query params.

## Notes on implementation

### Disable the use of angular-universal-express-firebase
I was not able to get this to work in my test project, and I prefer having more control of the server code - easier to debug.
For this reason `server/index.ts` also not used.
Can look at restoring both this once everything works.

### Manual Configuration
An express app will be created in response to a request at Google Functions (that does not match `/registerQuery`).
This lives in index.js. This app will render the application server side and then returned the HTML.

* build.js automates the build and deploy process
The following command will build everything `npm run build`
The following command will build and deploy everything `npm run deploy`

### Caching
Ideally the server side render response will be cached. 
This is not yet implemented as it would have made debugging more difficult.
Easy

## General Notes

### NG Bootstrap
Ng Bootstrap does not currently play nice with SSR (Universal) so the module is currently not imported and the pagination element not used.
Once SSR is implemented we can investigate potential fixes.
https://github.com/ng-bootstrap/ng-bootstrap/issues/858

### AngularFire2 5.0.0rc05 does nto support SSR.
Upgraded to: 5.0.0-rc.7
https://github.com/angular/angularfire2/issues/1073
This necessitated changing reibase version 4.12.1

### Debounced Input
`debounced-input.component.ts`
Use a debounced input so we are not updating on every keystroke E.g. not hitting API / filtering etc too often.