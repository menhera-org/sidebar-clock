// -*- indent-tabs-mode: nil; tab-width: 2; -*-
// vim: set ts=&2 sw=2 et ai :
/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at https://mozilla.org/MPL/2.0/.
*/

export class Clock extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({mode: 'open'});
      this.shadowRoot.innerHTML = `
        <svg id='clock-svg' viewBox='0 0 100 100' width='100%'>
          <circle id='clock-face' cx='50' cy='50' r='48' fill='#fff'/>
          <g id='rect-set-a'>
            <rect id='rect-a' x='48.4' y='5' width='3.3' height='11' fill='#000'/>
            <rect id='rect-b' x='49.3' y='5' width='1.45' height='4' fill='#000'/>
            <use href='#rect-b' transform='rotate(6, 50, 50)'/>
            <use href='#rect-b' transform='rotate(12, 50, 50)'/>
            <use href='#rect-b' transform='rotate(18, 50, 50)'/>
            <use href='#rect-b' transform='rotate(24, 50, 50)'/>
          </g>
          <use href='#rect-set-a' transform='rotate(30, 50, 50)'/>
          <use href='#rect-set-a' transform='rotate(60, 50, 50)'/>
          <use href='#rect-set-a' transform='rotate(90, 50, 50)'/>
          <use href='#rect-set-a' transform='rotate(120, 50, 50)'/>
          <use href='#rect-set-a' transform='rotate(150, 50, 50)'/>
          <use href='#rect-set-a' transform='rotate(180, 50, 50)'/>
          <use href='#rect-set-a' transform='rotate(210, 50, 50)'/>
          <use href='#rect-set-a' transform='rotate(240, 50, 50)'/>
          <use href='#rect-set-a' transform='rotate(270, 50, 50)'/>
          <use href='#rect-set-a' transform='rotate(300, 50, 50)'/>
          <use href='#rect-set-a' transform='rotate(330, 50, 50)'/>
          <path id='hour' d='M47.75,19 l-.5,40 h6 l-.5,-40 z' fill='#000' filter='drop-shadow(0 0 2 #fff)'/>
          <path id='minute' d='M48.25,9 l-.75,50 h5 l-.75,-50 z' fill='#000' filter='drop-shadow(0 0 2 #fff)'/>
          <g id='second' fill='#f00'>
            <circle cx='50' cy='22' r='4.5'/>
            <rect x='49.5' y='22' width='1' height='41'/>
          </g>
        </svg>
      `;
    }

    get hourAngle() {
      const hour = this.shadowRoot.querySelector('#hour');
      const transform = hour.getAttribute('transform') || '';
      const matches = transform.match(/rotate\s*\(\s*([0-9.]+)\s*,/);
      if (!matches) return 0;
      return +matches[1];
    }

    set hourAngle(deg) {
      const hour = this.shadowRoot.querySelector('#hour');
      hour.setAttribute('transform', `rotate(${+deg}, 50, 50)`);
    }

    get minuteAngle() {
      const minute = this.shadowRoot.querySelector('#minute');
      const transform = minute.getAttribute('transform') || '';
      const matches = transform.match(/rotate\s*\(\s*([0-9.]+)\s*,/);
      if (!matches) return 0;
      return +matches[1];
    }

    set minuteAngle(deg) {
      const minute = this.shadowRoot.querySelector('#minute');
      minute.setAttribute('transform', `rotate(${+deg}, 50, 50)`);
    }

    get secondAngle() {
      const second = this.shadowRoot.querySelector('#second');
      const transform = second.getAttribute('transform') || '';
      const matches = transform.match(/rotate\s*\(\s*([0-9.]+)\s*,/);
      if (!matches) return 0;
      return +matches[1];
    }

    set secondAngle(deg) {
      const second = this.shadowRoot.querySelector('#second');
      second.setAttribute('transform', `rotate(${+deg}, 50, 50)`);
    }
  }

  customElements.define('view-clock', Clock);
  