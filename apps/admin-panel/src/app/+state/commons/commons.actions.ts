import { createAction, props } from '@ngrx/store';
import { CustomError } from '@bon-appetit/interfaces';

export const SendForm = createAction('[Form] Send Form');
export const SuccessForm = createAction('[Form] Success Form');
export const ErrorForm = createAction('[Form] Error Form', props<{ message: string; }>());
export const ResetForm = createAction('[Form] Reset Form');

export const ErrorAction = createAction('[Commons] Error Action', props<{ error: CustomError; }>());
