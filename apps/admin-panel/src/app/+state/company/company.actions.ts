import { createAction, props } from '@ngrx/store';
import { Company } from '@bon-appetit/interfaces';

export const FetchCompany = createAction('[Company] Fetch Company', props<{ ownerId: number; }>());
export const SuccessFetchCompany = createAction('[Company] Success Fetch Company', props<{ company: Company; }>());

// export const SelectedRestaurant = createAction('[Company] Selected Restaurant Company', props<{ id: number; }>());

export const CreateCompany = createAction('[Company] Create Company', props<{ createCompany: Company; }>());
export const SuccessCreateCompany = createAction('[Company] Success Create Company', props<{ company: Company; }>());
