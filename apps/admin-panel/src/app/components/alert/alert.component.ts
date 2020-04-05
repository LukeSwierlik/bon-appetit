import { Component, Input } from '@angular/core';

export enum AlertType {
    SUCCESS = 'success',
    DANGER = 'danger',
    PRIMARY = 'primary'
}

@Component({
    selector: 'tin-alert',
    templateUrl: './alert.component.html'
})
export class AlertComponent {
    @Input() type: AlertType;
    @Input() message: string;
}
