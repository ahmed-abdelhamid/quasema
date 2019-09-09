export const saveAllCompanies = companies => ({ type: 'SAVE_ALL', companies });

export const saveChangeCompanyState = company => ({ type: 'CHANGE_STATE', company });

export const removeAllCompanies = () => ({ type: 'REMOVE_ALL' });
