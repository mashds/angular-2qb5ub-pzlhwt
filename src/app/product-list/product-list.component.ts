import { Component } from '@angular/core';

import { products } from '../products';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  products = products;

  idleState = 'Not started.';
  timedOut = false;
  title = 'angular-idle-timeout';
  idle: Idle;
  keepalive: Keepalive;

  constructor(private idle1: Idle, private keepalive1: Keepalive) {
    this.idle = idle1;
    this.keepalive = keepalive1;

    this.getServerSentEvent();
  }

  getServerSentEvent() {
    // sets an idle timeout of 3 minutes
    this.idle.setIdle(180);
    // sets a timeout period of 2 minutes. after 5 minutes of inactivity, the user will be considered timed out.
    this.idle.setTimeout(120);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.idle.onIdleStart.subscribe(() => {
      this.idleState = "You've gone idle!";
      console.log(this.idleState);
      this.show();
    });

    this.idle.onIdleEnd.subscribe(() => {
      this.idleState = 'No longer idle.';
      console.log(this.idleState);
      this.show();
    });

    this.idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      console.log(this.idleState);
      this.show();
    });

    // sets the ping interval to 15 seconds
    this.keepalive.interval(15);
  }

  show() {
    window.alert(this.idleState);
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
