import { COMPANY_API } from './api';

export const CompanyResource = {
    loadCompany: `${COMPANY_API}`,
    createCompany: `${COMPANY_API}/create`,
    loadCompanies: `${COMPANY_API}/all`,
};
