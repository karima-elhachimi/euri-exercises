import { Observable } from 'rxjs';

const observer = {
  next(val: any) {
    console.log(val);
  },
  error(err: any) {
    console.log('ERROR', err);
  },
  completed() {
    console.log('|');
  },
};

const btn = document.querySelector('#btn');

// Create a stream of a single element with type string
Observable.of('This is a mesage').subscribe(observer);

// Create a subscription that fires once, if you hover over a text element
const stream$ = Observable.fromEvent(btn!, 'mousemove');
stream$.take(1).subscribe(observer);

// Count the number of elements in a array (with an observable stream)
const array$ = Observable.from([1, 2, 3, 4]).count().subscribe(observer);

// Count the number of click events on a button
const clicks$ = Observable.fromEvent(btn!, 'click')
  .mapTo(1)
  .scan<number>((acc, val) => {
    return (acc = acc + 1);
  })
  .subscribe(observer);

// Create a count down timer in seconds (10 - 0)
Observable.interval(500).map(x => 10 - x).take(10).subscribe(observer);

// Create a observable stream of an input box value change
const input = document.querySelector('#input');
Observable.fromEvent<KeyboardEvent>(input!, 'keyup')
  .map(event => (event.target as HTMLInputElement).value)
  .filter(val => val.length > 2)
  .debounceTime(500)
  .map(val => val.toUpperCase())
  .subscribe(observer);

// Create a subscription on a button click that auto unsubscribe after 5 seconds
const timeout$ = Observable.timer(1000);
Observable.fromEvent(btn!, 'click').takeUntil(timeout$).subscribe(observer);
/*
    ---c--c---c------c----c-----
    ----------------0|
    ---c--c---c-----|
*/

// One subscribe with two buttons
const btnStart = document.querySelector('#btnStart');
const btnStop = document.querySelector('#btnStop');
const btnStart$ = Observable.fromEvent(btnStart!, 'click');
const btnStop$ = Observable.fromEvent(btnStop!, 'click');
btnStart$.merge(btnStop$).subscribe(observer);

// Start & stop timer (log to console) with a start and stop button
btnStart$
  .switchMap(event => Observable.interval(500).takeUntil(btnStop$))
  .subscribe(observer);
