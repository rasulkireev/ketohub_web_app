// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: 'AIzaSyCglK8ZkZfL6QWWyEZf26z1BMPYFQM6wTw',
    authDomain: 'ketohub.firebaseapp.com',
    databaseURL: 'https://ketohub-c7fe5.firebaseio.com/',
    projectId: 'ketohub',
    storageBucket: 'ketohub.appspot.com',
    messagingSenderId: '1012588055483',
  },
};
