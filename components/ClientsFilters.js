import React from 'react';
import { connect } from 'react-redux';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import translations from '../translations/arabicTranslation';
import { filterClientsBy } from '../redux/actions/filtersActions';

const ClientsFilters = ({ filterBy, filterClientsBy }) => {
  const handleFilter = (event, type) => {
    if (event.target.checked) {
      filterClientsBy(type);
    } else {
      filterClientsBy('ALL');
    }
  };

  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            checked={filterBy === 'profit'}
            onChange={event => handleFilter(event, 'PROFIT')}
          />
        }
        label={translations.PROFIT}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={filterBy === 'nonProfit'}
            onChange={event => handleFilter(event, 'NON_PROFIT')}
          />
        }
        label={translations.NON_PROFIT}
      />
    </>
  );
};

const mapStateToProps = ({ filters }) => ({ filterBy: filters.filterClientsBy });

const mapDispatchToProps = dispatch => ({
  filterClientsBy: type => dispatch(filterClientsBy(type))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientsFilters);
