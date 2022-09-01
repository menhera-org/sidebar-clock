// -*- indent-tabs-mode: nil; tab-width: 2; -*-
// vim: set ts=&2 sw=2 et ai :
/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at https://mozilla.org/MPL/2.0/.
*/

import { Digit } from "./modules/view-digit.js";
import { Clock } from "./modules/view-clock.js";

const waitForAnimationFrame = () => new Promise((resolve, _reject) => {
  window.requestAnimationFrame(() => void resolve());
});

const yearDigits = [];
for (let i = 0; i < 5; i++) {
  yearDigits[i] = new Digit;
  document.querySelector('#date').append(yearDigits[i]);
}
document.querySelector('#date').append(new Digit);

const monthDigits = [new Digit, new Digit];
document.querySelector('#date').append(monthDigits[0]);
document.querySelector('#date').append(monthDigits[1]);

document.querySelector('#date').append(new Digit);

const dateDigits = [new Digit, new Digit];
document.querySelector('#date').append(dateDigits[0]);
document.querySelector('#date').append(dateDigits[1]);

const hourDigits = [new Digit, new Digit];
document.querySelector('#time').append(hourDigits[0]);
document.querySelector('#time').append(hourDigits[1]);

const colon1 = new Digit;
colon1.value = ':';
document.querySelector('#time').append(colon1);

const minuteDigits = [new Digit, new Digit];
document.querySelector('#time').append(minuteDigits[0]);
document.querySelector('#time').append(minuteDigits[1]);

const colon2 = new Digit;
colon2.value = ':';
document.querySelector('#time').append(colon2);

const secondDigits = [new Digit, new Digit];
document.querySelector('#time').append(secondDigits[0]);
document.querySelector('#time').append(secondDigits[1]);

const clock = new Clock;
document.querySelector('#container').append(clock);
clock.hourAngle = 360 * Math.random();
clock.minuteAngle = 360 * Math.random();
clock.secondAngle = 360 * Math.random();

let prevUnixTime = Math.trunc((new Date) / 1000) - 1;
(async () => {
  let y, m, d;
  while (true) {
    const date = new Date;
    const unixTime = Math.trunc(date / 1000);
    if (unixTime != prevUnixTime) {
      prevUnixTime = unixTime;
      const s = date.getSeconds();
      const min = date.getMinutes();
      const h = date.getHours() % 12;
      clock.secondAngle = 6 * s;
      clock.minuteAngle = 6 * (min + s / 60);
      clock.hourAngle = 30 * (h + min / 60 + s / 3600);

      const y2 = date.getFullYear();
      if (y !== y2) {
        y = y2;
        yearDigits[0].value = Math.trunc(y / 10000) % 10;
        yearDigits[1].value = Math.trunc(y / 1000) % 10;
        yearDigits[2].value = Math.trunc(y / 100) % 10;
        yearDigits[3].value = Math.trunc(y / 10) % 10;
        yearDigits[4].value = Math.trunc(y) % 10;
      }

      const m2 = date.getMonth() + 1;
      if (m2 !== m) {
        m = m2;
        monthDigits[0].value = Math.trunc(m / 10) % 10;
        monthDigits[1].value = Math.trunc(m) % 10;
      }

      const d2 = date.getDate();
      if (d2 !== d) {
        d = d2;
        dateDigits[0].value = Math.trunc(d / 10) % 10;
        dateDigits[1].value = Math.trunc(d) % 10;
      }

      const hour24 = date.getHours();
      hourDigits[0].value = Math.trunc(hour24 / 10) % 10;
      hourDigits[1].value = Math.trunc(hour24) % 10;

      minuteDigits[0].value = Math.trunc(min / 10) % 10;
      minuteDigits[1].value = Math.trunc(min) % 10;

      secondDigits[0].value = Math.trunc(s / 10) % 10;
      secondDigits[1].value = Math.trunc(s) % 10;

      document.title = `${hourDigits[0].value}${hourDigits[1].value}:${minuteDigits[0].value}${minuteDigits[1].value}:${secondDigits[0].value}${secondDigits[1].value}`;
    }
    await waitForAnimationFrame();
  }
})();
