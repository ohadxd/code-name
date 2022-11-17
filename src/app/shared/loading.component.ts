import {Component} from '@angular/core';

@Component({
  selector: 'loading-app',
  styleUrls: ['./loading.component.scss'],
  template: `
      <div style="display: flex;justify-content: center;height: 100%;margin: auto;padding-top: 30%">
          <div class="lds-ripple"><div></div><div></div></div></div>
  `
})

export class LoadingComponent {
}
