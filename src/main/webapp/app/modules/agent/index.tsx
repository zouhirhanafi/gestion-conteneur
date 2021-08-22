import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Inventaire from './inventaire/conteneur';
import EntreeAdd from './entree/entree-add';
import SortieAdd from './sortie/sortie-add';
import VisiteAdd from './visite/visite-add';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/inventaire`} component={Inventaire} />
      <ErrorBoundaryRoute exact path={`${match.url}/entree`} component={EntreeAdd} />
      <ErrorBoundaryRoute exact path={`${match.url}/sortie`} component={SortieAdd} />
      <ErrorBoundaryRoute exact path={`${match.url}/visite`} component={VisiteAdd} />
    </Switch>
  </>
);

export default Routes;
