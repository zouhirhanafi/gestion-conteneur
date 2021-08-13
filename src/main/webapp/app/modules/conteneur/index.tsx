import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ConteneurListe from './liste';
import ConteneurEntree from './entree';
import ConteneurSortie from './sortie';
import ConteneurVisite from './visite';
import ConteneurFinVisite from './fin-visite';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute path={`${match.url}/liste`} component={ConteneurListe} />
      <ErrorBoundaryRoute path={`${match.url}/entree`} component={ConteneurEntree} />
      <ErrorBoundaryRoute path={`${match.url}/sortie`} component={ConteneurSortie} />
      <ErrorBoundaryRoute path={`${match.url}/visite`} component={ConteneurVisite} />
      <ErrorBoundaryRoute path={`${match.url}/finvisite`} component={ConteneurFinVisite} />
    </Switch>
  </>
);

export default Routes;
