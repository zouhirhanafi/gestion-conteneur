import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ParamOptionsContainer } from 'app/shared/components';
import { Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { Button, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const defaultQuery = {
  'statut-in': [100, 101, 102, 104, 105, 106],
};

export const SearchForm = ({ handleSearch, loading, reset }) => {
  let defaultValues = defaultQuery;
  useEffect(() => {
    defaultValues = { ...defaultQuery };
  }, [reset]);
  return (
    <ValidatedForm className="form-row align-items-center" defaultValues={defaultValues} onSubmit={handleSearch}>
      <ValidatedField name="id-contains" className="col-auto" label={translate('global.field.id')} />
      <ValidatedField
        label={translate('gestionConteneurApp.conteneur.position')}
        name="position-contains"
        type="text"
        className="col-auto"
      />
      <ValidatedField
        type="datetime-local"
        className="col-auto"
        placeholder="YYYY-MM-DD HH:mm"
        name="dateEntree-greaterThanOrEqual"
        label={translate('gestionConteneurApp.conteneur.dateEntree') + ' ' + translate('global.field.from')}
      />
      <ValidatedField
        label={translate('global.field.to')}
        type="datetime-local"
        placeholder="YYYY-MM-DD HH:mm"
        name="dateEntree-lessThanOrEqual"
        className="col-auto"
      />
      <ValidatedField
        type="datetime-local"
        className="col-auto"
        placeholder="YYYY-MM-DD HH:mm"
        name="dateSortie-greaterThanOrEqual"
        label={translate('gestionConteneurApp.conteneur.dateSortie') + ' ' + translate('global.field.from')}
      />
      <ValidatedField
        label={translate('global.field.to')}
        type="datetime-local"
        placeholder="YYYY-MM-DD HH:mm"
        name="dateSortie-lessThanOrEqual"
        className="col-auto"
      />
      <ValidatedField
        className="col-auto"
        label={translate('gestionConteneurApp.conteneur.statut')}
        name="statut-in"
        type="select"
        multiple
      >
        <ParamOptionsContainer paramName="statutConteneur" />
      </ValidatedField>
      <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={loading}>
        <FontAwesomeIcon icon="search" />
        &nbsp;
        <Translate contentKey="entity.action.search">Chercher</Translate>
      </Button>
    </ValidatedForm>
  );
};
