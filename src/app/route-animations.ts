import {
  trigger,
  transition,
  query,
  style,
  animate,
  animateChild,
  group,
} from '@angular/animations';

export const fade = trigger('routeAnimations', [
  transition('* <=> *', [
    // style({ position: 'relative' }),
    query(
      ':enter, :leave',
      [
        style({
          position: 'relative',
          //   top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }),
      ],
      { optional: true }
    ),
    query(':enter', [style({ left: '-100%' })], { optional: true }),
    query(':leave', [animateChild()], { optional: true }),
    group([
      query(':leave', [animate('300ms ease-out', style({ left: '100%' }))], {
        optional: true,
      }),
      query(':enter', [animate('300ms ease-out', style({ left: '0%' }))], {
        optional: true,
      }),
    ]),
    query(':enter', [animateChild()], { optional: true }),
  ]),
]);
