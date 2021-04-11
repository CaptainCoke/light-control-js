import { ReactElement } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  makeStyles,
  CircularProgress,
  Grid,
  Theme,
} from '@material-ui/core';

import type {
  ColorTemperatureLightState,
  XyLightState,
  HueSaturationLightState,
} from 'light-control-lib';

import { Title } from './Title';
import { On, Brightness, ColorTemperature } from './LightState';
import { useLight } from '../api';

const useStyles = makeStyles((theme: Theme) => ({
  id: {
    padding: theme.spacing(1),
    color: theme.palette.grey[400],
    fontWeight: 75,
  },
}));

type Props = {
  id: number,
}

function makeColorElement(
  state: ColorTemperatureLightState | XyLightState | HueSaturationLightState,
) {
  switch (state.colormode) {
    case 'ct': return <ColorTemperature value={state.ct} min={0} max={600} />;
    default: return null;
  }
}

export function Light(props: Props): ReactElement {
  const { id } = props;

  const { light } = useLight(id);

  const classes = useStyles();

  if (!light) {
    return (<CircularProgress />);
  }

  const { name, type, state } = light;
  const { on, bri } = state;
  const color = makeColorElement(state);
  return (
    <>
      <Title>
        <>
          {name}
          <span className={classes.id}>
            {`#${id}`}
          </span>
        </>
      </Title>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Typography color="textSecondary">
            {type}
          </Typography>
        </Grid>
        <Grid item>
          <Typography color="textSecondary">
            {state.reachable ? 'reachable' : 'not reachable'}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="stretch"
        justify="flex-start"
      >
        {typeof on !== 'undefined' ? (
          <Grid item>
            <On on={on} />
          </Grid>
        ) : null}
        {(typeof bri !== 'undefined') ? (
          <Grid item xs={12}>
            <Brightness value={bri} />
          </Grid>
        ) : null}
        {color ? <Grid item xs={12}>{color}</Grid> : null}
      </Grid>
    </>
  );
}

Light.propTypes = {
  id: PropTypes.number.isRequired,
};
