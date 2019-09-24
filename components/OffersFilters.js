import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

import translations from '../translations/arabicTranslation';

const OfferFilters = () => {
  const [value, setValue] = React.useState('ALL_OFFERS');

  function handleChange(event) {
    setValue(event.target.value);
  }

  return (
    <FormControl component="fieldset">
      <RadioGroup
        style={{ display: 'inline' }}
        name="filterOffers"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel
          value="BEST_OFFERS"
          control={<Radio />}
          label={translations.BEST_OFFERS}
        />
        <FormControlLabel value="ALL_OFFERS" control={<Radio />} label={translations.ALL} />
        <FormControlLabel value="HOUSING" control={<Radio />} label={translations.HOUSING} />
        <FormControlLabel
          value="COFFEE_SHOPS"
          control={<Radio />}
          label={translations.COFFEESHOPS}
        />
        <FormControlLabel value="CLINICS" control={<Radio />} label={translations.CLINICS} />
        <FormControlLabel value="TRAVEL" control={<Radio />} label={translations.TRAVEL} />
        <FormControlLabel
          value="BEAUTY_CENTERS"
          control={<Radio />}
          label={translations.BEAUTY_CENTERS}
        />
        <FormControlLabel value="SHOPPING" control={<Radio />} label={translations.SHOPPING} />
        <FormControlLabel value="FAMILIES" control={<Radio />} label={translations.FAMILIES} />
        <FormControlLabel value="COURSES" control={<Radio />} label={translations.COURSES} />
        <FormControlLabel value="OTHERS" control={<Radio />} label={translations.OTHERS} />
        <FormControlLabel value="BEST_SALES" control={<Radio />} label={translations.BEST_SALES} />
        <FormControlLabel value="BEST_RATES" control={<Radio />} label={translations.BEST_RATES} />
        <FormControlLabel
          value="LESS_THAN_THIRTY"
          control={<Radio />}
          label={translations.LESS_THAN_THIRTY}
        />
        <FormControlLabel value="CHARITY" control={<Radio />} label={translations.CHARITY} />
      </RadioGroup>
    </FormControl>
  );
};

export default OfferFilters;
