import { Component } from '@angular/core';
import { parseString } from 'xml2js';

@Component({
  selector: 'bus-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Bus Schedule';

  constructor() {
    const opt = { explicitArray: false, mergeAttrs: true };
    const xml = '<body><route tag="E" title="E-Embarcadero"/></body>';

    parseString(xml, opt, function(err, result) {
      console.dir(result);
      console.log(Array.isArray(result.body.route));
      // console.log(result.body.route[0].tag[0]);
    });
  }
}
