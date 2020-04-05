import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges
} from '@angular/core';
import { Dish, Order } from '@bon-appetit/interfaces';

@Component({
    selector: 'tin-card-meal',
    templateUrl: './card-meal.component.html',
})
export class CardMealComponent {
    @Input() dish: Dish;
    @Input() openedRestaurant: boolean;
    @Input() authenticated: boolean;
    @Output() addToOrder = new EventEmitter<{ count: number; dishId: number; }>();

    count = 1;

    readonly MIN_COUNT = 1;
    readonly MAX_COUNT = 99;

    increment(): void {
        if (this.count <= this.MAX_COUNT) {
            this.count += 1;
        }
    }

    decrement(): void {
        if (this.count >= this.MIN_COUNT) {
            this.count -= 1;
        }
    }

    onChange($event): void {
        const count = parseInt($event.target.value, 10);

        if (count >= this.MIN_COUNT && count <= this.MAX_COUNT) {
            this.count = count;
        }
    }

    order(): void {
        this.addToOrder.emit({
            count: this.count,
            dishId: this.dish.id,
        })
    }
}
