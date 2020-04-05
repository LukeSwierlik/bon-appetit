import { createAction, props } from '@ngrx/store';
import { Table } from '@bon-appetit/interfaces';

export const LoadTables = createAction('[Tables] Load Tables');
export const SuccessLoadTables = createAction('[Tables] Success Load Tables', props<{ tables: Table[]; }>());

export const CreateTable = createAction('[Restaurant] Create Table', props<{ createTable: Table; }>());
export const SuccessCreateTable = createAction('[Restaurant] Success Create Table', props<{ table: Table }>());
