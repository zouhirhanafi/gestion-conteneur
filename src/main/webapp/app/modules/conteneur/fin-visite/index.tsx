import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Conteneur from './conteneur';
import ConteneurUpdate from './conteneur-update';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ConteneurUpdate} />
      <ErrorBoundaryRoute path={match.url} component={Conteneur} />
    </Switch>
  </>
);

export default Routes;
