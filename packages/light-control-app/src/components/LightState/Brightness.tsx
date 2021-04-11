import { ReactElement } from 'react';
import PropTypes from 'prop-types';
import type { Brigthness as BrigthnessType } from 'light-control-lib';
import { BrightnessMedium } from '@material-ui/icons';
import { ValueSlider } from './ValueSlider';

type Props = {
  value: BrigthnessType,
  min?: BrigthnessType,
  max?: BrigthnessType,
};

export function Brightness(props: Props): ReactElement {
  const { value, min, max } = props;
  return (
    <ValueSlider
      min={min ?? 0}
      max={max ?? 255}
      value={value}
      title="Brightness"
      icon={<BrightnessMedium />}
    />
  );
}

Brightness.propTypes = {
  value: PropTypes.number.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
};

Brightness.defaultProps = {
  min: 0,
  max: 255,
};
