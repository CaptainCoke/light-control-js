import { ReactElement } from 'react';
import { Container, makeStyles } from '@material-ui/core';
import { LightList } from './components';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export function App(): ReactElement {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth={false}>
        <LightList />
      </Container>
    </div>
  );
}
