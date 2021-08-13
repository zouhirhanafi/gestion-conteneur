import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';

export const ConteneurMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.conteneur.main')}
    id="conteneur-menu"
    data-cy="conteneur"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <>{/* to avoid warnings when empty */}</>
    <MenuItem icon="asterisk" to="/conteneur/liste">
      <Translate contentKey="global.menu.conteneur.liste" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/conteneur/entree">
      <Translate contentKey="global.menu.conteneur.entree" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/conteneur/sortie">
      <Translate contentKey="global.menu.conteneur.sortie" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/conteneur/visite">
      <Translate contentKey="global.menu.conteneur.visite" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/conteneur/finvisite">
      <Translate contentKey="global.menu.conteneur.finVisite" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
