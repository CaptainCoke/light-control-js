import { ReactElement } from 'react';
import { LightResource } from 'light-control-lib';
import {
  Grid,
  Card,
  CardContent,
  Theme,
  makeStyles,
  CircularProgress,
  Backdrop,
} from '@material-ui/core';

import { Light } from './Light';
import { useList } from '../api';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: theme.spacing(1),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export function LightList(): ReactElement {
  const classes = useStyles();

  const { resourceIds, isLoading } = useList(LightResource);

  if (isLoading) {
    return (
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress />
      </Backdrop>
    );
  }
  return (
    <Grid
      container
      spacing={3}
    >
      {resourceIds?.map((lightId) => (
        <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
          <Card className={classes.paper}>
            <CardContent>
              <Light key={lightId} id={lightId} />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
