/*
 * Copyright (C) 2020 DS Co., dba dsco - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 */

import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[verticalExpander]',
  template: `
    <ng-content></ng-content>`,
  styles: [
      `
          :host.ng-animating {
              overflow: hidden;
          }
    `
  ],
  animations: [
    trigger('animateOnRemove', [
      transition('true => void', [
        animate('0.3s ease', keyframes([
          style({
            height: '*'
          }),
          style({
            height: '0'
          })
        ]))
      ])
    ]),
    trigger('animateOnEnter', [
      transition('void => true', [
        style({
          height: '0'
        }),
        animate('0.3s ease', style({height: '*'}))
      ])
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class VerticalExpanderComponent {
  @HostBinding('@animateOnRemove')
  @Input() animateOnRemove = true;

  @HostBinding('@animateOnEnter')
  @Input() animateOnEnter = true;
}
