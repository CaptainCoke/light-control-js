import { ReactElement } from 'react';
import PropTypes from 'prop-types';
import {
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import type { ColorTemperature as ColorTemperatureType } from 'light-control-lib';
import { Palette } from '@material-ui/icons';
import { ValueSlider } from './ValueSlider';

type Props = {
  value: ColorTemperatureType,
  min: ColorTemperatureType,
  max: ColorTemperatureType,
};

export function ColorTemperature(props: Props): ReactElement {
  const unit = 'Mired';
  const { value, min, max } = props;
  return (
    <ValueSlider
      min={min}
      max={max}
      value={value}
      title="Temperature"
      icon={<Palette />}
      endAdornment={(
        <InputAdornment position="end">
          <IconButton size="small">{unit}</IconButton>
        </InputAdornment>
      )}
    />
  );
}

ColorTemperature.propTypes = {
  value: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
};
