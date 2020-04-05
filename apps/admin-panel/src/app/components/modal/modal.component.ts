import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'tin-modal',
    templateUrl: './modal.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent {
    @Input() opened: boolean;
    @Input() title: string;
    @Input() text: string;

    @Output() closed = new EventEmitter();
}
