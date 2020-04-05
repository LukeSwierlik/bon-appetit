import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../../../+state';
import { LoadTables } from '../../../+state/tables/tables.actions';
import { Observable } from 'rxjs';
import { Table } from '@bon-appetit/interfaces';
import { tablesQuery } from '../../../+state/tables/tables.selectors';
import { AlertType } from '../../../components/alert/alert.component';

@Component({
    selector: 'tin-tables-container',
    templateUrl: './tables-container.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablesContainerComponent implements OnInit {
    tables$: Observable<Table[]> = this.store.pipe(select(tablesQuery.getTables));

    readonly AlertType = AlertType;

    constructor(private store: Store<State>) {}

    ngOnInit() {
        this.store.dispatch(LoadTables());
    }
}
