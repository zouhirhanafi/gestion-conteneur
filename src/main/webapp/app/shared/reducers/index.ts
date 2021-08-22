import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';
import entities, { EntitiesState } from './entities.reducer';
// prettier-ignore
import params, {
  ParamsState
} from 'app/entities/parameter/params.reducer';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import parameter from 'app/entities/parameter/parameter.reducer';
// prettier-ignore
import conteneur from 'app/entities/conteneur/conteneur.reducer';
import conteneurListe from 'app/modules/conteneur/liste/conteneur.reducer';
import conteneurEntree from 'app/modules/conteneur/entree/conteneur.reducer';
import conteneurSortie from 'app/modules/conteneur/sortie/conteneur.reducer';
import conteneurVisite from 'app/modules/conteneur/visite/conteneur.reducer';
import conteneurFinVisite from 'app/modules/conteneur/fin-visite/conteneur.reducer';
import inventaire from 'app/modules/agent/inventaire/conteneur.reducer';
import entree from 'app/modules/agent/entree/agent.reducer';
import sortie from 'app/modules/agent/sortie/agent.reducer';
import visite from 'app/modules/agent/visite/agent.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const rootReducer = {
  authentication,
  locale,
  entities,
  params,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  parameter,
  conteneur,
  conteneurListe,
  conteneurEntree,
  conteneurSortie,
  conteneurVisite,
  conteneurFinVisite,
  inventaire,
  entree,
  sortie,
  visite,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
};

export default rootReducer;
