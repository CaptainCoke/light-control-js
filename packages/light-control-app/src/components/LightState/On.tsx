import { ReactElement } from 'react';
import PropTypes from 'prop-types';
import {
  Switch,
  Grid,
} from '@material-ui/core';
import { WbIncandescent } from '@material-ui/icons';

type Props = {
  on: boolean,
};

export function On(props: Props): ReactElement {
  const { on } = props;

  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
    >
      <Grid item><WbIncandescent /></Grid>
      <Grid item><Switch checked={on} /></Grid>
      <Grid item>{on ? 'On' : 'Off'}</Grid>
    </Grid>
  );
}

On.propTypes = {
  on: PropTypes.bool.isRequired,
};
