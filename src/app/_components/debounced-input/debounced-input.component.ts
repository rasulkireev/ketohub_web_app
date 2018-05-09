import {Observable} from 'rxjs/Rx';
import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';

@Component({
    selector: 'app-input-debounce',
    template: '<input type="text" class="form-control" [placeholder]="placeholder" [(ngModel)]="inputValue">'
})
export class InputDebounceComponent {
    @Output() value: EventEmitter<any> = new EventEmitter();
    @Input() placeholder: string;
    @Input() delay: number = 300;

    public inputValue: string;

    constructor(private elementRef: ElementRef) {
        const eventStream = Observable.fromEvent(elementRef.nativeElement, 'keyup')
            .map(() => this.inputValue)
            .debounceTime(this.delay)
            .distinctUntilChanged();

        eventStream.subscribe(input => this.value.emit(input));
    }
}