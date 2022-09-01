// -*- indent-tabs-mode: nil; tab-width: 2; -*-
// vim: set ts=&2 sw=2 et ai :
/*
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at https://mozilla.org/MPL/2.0/.
*/

export class Digit extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <svg id='digit-svg' viewBox='0 0 100 200' width='100%'>
        <g id='digit-parts' fill='#fff' stroke-width='1' stroke='#000'>
          <path id='part1' d='M20,20 l10,-10 h40 l10,10 l-10,10 h-40 z'/>
          <path id='part2' d='M20,100 l10,-10 h40 l10,10 l-10,10 h-40 z'/>
          <path id='part3' d='M20,180 l10,-10 h40 l10,10 l-10,10 h-40 z'/>
          <path id='part4' d='M20,20 l-10,10 v60 l10,10 l10,-10 v-60 z'/>
          <path id='part5' d='M80,20 l-10,10 v60 l10,10 l10,-10 v-60 z'/>
          <path id='part6' d='M20,100 l-10,10 v60 l10,10 l10,-10 v-60 z'/>
          <path id='part7' d='M80,100 l-10,10 v60 l10,10 l10,-10 v-60 z'/>
          <g id='part8' fill='#fff' stroke-width='1' stroke='#000'>
            <circle cx='50', cy='60', r='10'/>
            <circle cx='50', cy='140', r='10'/>
          </g>
        </g>
      </svg>
    `;
    this.value = '-';
  }

  get value() {
    return this.dataset.value || '';
  }

  set value(s) {
    const display = (... parts) => {
      for (let i = 0; i < 8; i++) {
        const element = this.shadowRoot.getElementById(`part${1 + i}`);
        if (!element) continue;
        element.style.opacity = parts[i] ? '1' : '.125';
      }
    };

    switch (String(s).trim().slice(0, 1)) {
      case ':': {
        display(0, 0, 0, 0, 0, 0, 0, 1);
        this.dataset.value = ':';
        break;
      }
      case '0': {
        display(1, 0, 1, 1, 1, 1, 1, 0);
        this.dataset.value = '0';
        break;
      }
      case '1': {
        display(0, 0, 0, 0, 1, 0, 1, 0);
        this.dataset.value = '1';
        break;
      }
      case '2': {
        display(1, 1, 1, 0, 1, 1, 0, 0);
        this.dataset.value = '2';
        break;
      }
      case '3': {
        display(1, 1, 1, 0, 1, 0, 1, 0);
        this.dataset.value = '3';
        break;
      }
      case '4': {
        display(0, 1, 0, 1, 1, 0, 1, 0);
        this.dataset.value = '4';
        break;
      }
      case '5': {
        display(1, 1, 1, 1, 0, 0, 1, 0);
        this.dataset.value = '5';
        break;
      }
      case '6': {
        display(1, 1, 1, 1, 0, 1, 1, 0);
        this.dataset.value = '6';
        break;
      }
      case '7': {
        display(1, 0, 0, 1, 1, 0, 1, 0);
        this.dataset.value = '7';
        break;
      }
      case '8': {
        display(1, 1, 1, 1, 1, 1, 1, 0);
        this.dataset.value = '8';
        break;
      }
      case '9': {
        display(1, 1, 1, 1, 1, 0, 1, 0);
        this.dataset.value = '9';
        break;
      }
      default: {
        display(0, 1, 0, 0, 0, 0, 0, 0);
        this.dataset.value = '-';
        break;
      }
    }
  }
}

customElements.define('view-digit', Digit);
