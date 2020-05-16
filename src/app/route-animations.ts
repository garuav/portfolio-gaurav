import {
  trigger,
  transition,
  query,
  style,
  animate,
  animateChild,
  group,
} from '@angular/animations';

export const routeAnimations = trigger('routeAnimations', [
  // transition('* <=> *', [
  //   // style({ position: 'relative' }),
  //   query(
  //     ':enter, :leave',
  //     [
  //       style({
  //         position: 'relative',
  //         //   top: 0,
  //         left: 0,
  //         width: '100%',
  //         height: '100%',
  //       }),
  //     ],
  //     { optional: true }
  //   ),
  //   query(':enter', [style({ left: '-100%' })], { optional: true }),
  //   query(':leave', [animateChild()], { optional: true }),
  //   group([
  //     query(':leave', [animate('300ms ease-out', style({ left: '100%' }))], {
  //       optional: true,
  //     }),
  //     query(':enter', [animate('300ms ease-out', style({ left: '0%' }))], {
  //       optional: true,
  //     }),
  //   ]),
  //   query(':enter', [animateChild()], { optional: true }),
  // ]),
  transition('* <=> *', [
    query(':enter, :leave',
    style({ position: 'fixed', width: '100%', height: '100%' }),
    { optional: true }),
    group([
    query(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-in-out',
        style({ transform: 'translateX(0%)' , opacity: 1 }))
    ], { optional: true }),
    query(':leave', [
         style({ transform: 'translateX(0%)' }),
         animate('300ms ease-in-out',
         style({ transform: 'translateX(100%)', opacity: 0 }))
    ], { optional: true }),
])
])
]);
