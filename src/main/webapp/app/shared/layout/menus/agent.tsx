import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';

export const AgentMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.agent.main')}
    id="agent-menu"
    data-cy="agent"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <>{/* to avoid warnings when empty */}</>
    <MenuItem icon="asterisk" to="/agent/entree">
      <Translate contentKey="global.menu.agent.entree" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/agent/sortie">
      <Translate contentKey="global.menu.agent.sortie" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/agent/visite">
      <Translate contentKey="global.menu.agent.visite" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
