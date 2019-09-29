import React from 'react';
import { connect } from 'react-redux';

import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

import { addFilter } from '../redux/actions/filtersActions';
import translations from '../translations/arabicTranslation';

const OfferFilters = ({ addFilter, onChangeFilter, rowsPerPage, filter }) => {
  const [value, setValue] = React.useState(filter);

  const handleChange = async event => {
    addFilter(event.target.value);
    setValue(event.target.value);
    await onChangeFilter(rowsPerPage, event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <RadioGroup
        style={{ display: 'inline' }}
        name="filterOffers"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="32" control={<Radio />} label={translations.BEST_OFFERS} />
        <FormControlLabel value="0" control={<Radio />} label={translations.ALL} />
        <FormControlLabel value="1" control={<Radio />} label={translations.HOUSING} />
        <FormControlLabel value="2" control={<Radio />} label={translations.COFFEESHOPS} />
        <FormControlLabel value="3" control={<Radio />} label={translations.CLINICS} />
        <FormControlLabel value="4" control={<Radio />} label={translations.TRAVEL} />
        <FormControlLabel value="5" control={<Radio />} label={translations.BEAUTY_CENTERS} />
        <FormControlLabel value="6" control={<Radio />} label={translations.SHOPPING} />
        <FormControlLabel value="7" control={<Radio />} label={translations.FAMILIES} />
        <FormControlLabel value="8" control={<Radio />} label={translations.COURSES} />
        <FormControlLabel value="9" control={<Radio />} label={translations.OTHERS} />
        {/* <FormControlLabel value="BEST_SALES" control={<Radio />} label={translations.BEST_SALES} /> */}
        <FormControlLabel value="31" control={<Radio />} label={translations.BEST_RATES} />
        <FormControlLabel value="30" control={<Radio />} label={translations.LESS_THAN_THIRTY} />
        <FormControlLabel value="10" control={<Radio />} label={translations.CHARITY} />
      </RadioGroup>
    </FormControl>
  );
};

const mapStateToProps = state => ({ filter: state.filters.filterOffersBy });

const mapDispatchToProps = dispatch => ({
  addFilter: filter => dispatch(addFilter(filter))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OfferFilters);
