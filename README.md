# BusSchedule

[![Build Status][travis-badge]][travis-badge-url]

Demo App

## Running Local

Standard workflow:

- `yarn`
- open three terminals, run one command in each:
  - `npm test`
  - `npm start`
  - `npm run lint`
- [http://localhost:4200/](http://localhost:4200/)

## Deploying to Github Pages

Build, then deploy:

- `ng build --prod --base-href "/bus-schedule/"`
- `cp dist/index.html dist/404.html`
- `ngh --message='chore: deploy version x.y.z'`

For more information, see [angular-cli-ghpages](https://github.com/angular-buch/angular-cli-ghpages) 


[travis-badge]: https://travis-ci.org/kensodemann/bus-schedule.svg?branch=master
[travis-badge-url]: https://travis-ci.org/kensodemann/bus-schedule
