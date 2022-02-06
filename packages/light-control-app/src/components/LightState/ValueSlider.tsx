import { ReactElement } from 'react';
import PropTypes from 'prop-types';
import {
  Slider,
  Grid,
  Input,
  InputLabel,
  FormControl,
} from '@material-ui/core';

type Props = {
  value: number,
  min: number,
  max: number,
  title: string,
  endAdornment: ReactElement,
  icon: ReactElement,
};

export function ValueSlider(props: Props): ReactElement {
  const {
    value,
    min,
    max,
    title,
    endAdornment,
    icon,
  } = props;
  return (
    <Grid
      container
      spacing={2}
      alignItems="flex-end"
    >
      <Grid item>{icon}</Grid>
      <Grid item xs>
        <Slider
          value={value}
          min={min}
          step={1}
          max={max}
          aria-labelledby="input-slider"
        />
      </Grid>
      <Grid item>
        <FormControl fullWidth>
          <InputLabel htmlFor="temperature-text">{title}</InputLabel>
          <Input
            id="temperature-text"
            value={value}
            margin="dense"
            endAdornment={endAdornment}
            inputProps={{
              step: 1,
              min,
              max,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
}

ValueSlider.propTypes = {
  value: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  endAdornment: PropTypes.node,
};

ValueSlider.defaultProps = {
  endAdornment: undefined,
};
