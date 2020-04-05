import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'tin-product',
    templateUrl: './product.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent {
    @Input() image: string;
    @Input() title: string;
}
