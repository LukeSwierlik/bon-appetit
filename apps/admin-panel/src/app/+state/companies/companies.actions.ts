import { createAction, props } from '@ngrx/store';
import { Company } from '@bon-appetit/interfaces';

export const FetchCompanies = createAction('[Companies] Fetch Companies');
export const SuccessFetchCompanies = createAction('[Companies] Success Fetch Companies', props<{ companies: Company[]; }>());
export const SelectedCompany = createAction('[Companies] Selected Company', props<{ companyId: number; }>());

export const SearchCompanies = createAction('[Companies] Search Companies', props<{ searchQuery: string }>());

