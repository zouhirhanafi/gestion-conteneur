import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity, updateEntity, reset } from './conteneur.reducer';
import { IConteneur } from 'app/shared/model/conteneur.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { ParamOptionsContainer } from 'app/shared/components';

export const ConteneurUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const conteneurEntity = useAppSelector(state => state.inventaire.entity);
  const loading = useAppSelector(state => state.inventaire.loading);
  const updating = useAppSelector(state => state.inventaire.updating);
  const updateSuccess = useAppSelector(state => state.inventaire.updateSuccess);

  const handleClose = () => {
    props.history.push('/agent/inventaire');
  };

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('is new ', isNew, props.match.params.id);
    if (!isNew) {
      dispatch(getEntity(props.match.params.id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.dateEntree = convertDateTimeToServer(values.dateEntree);
    values.dateSortie = convertDateTimeToServer(values.dateSortie);

    const entity = {
      ...conteneurEntity,
      ...values,
    };

    dispatch(updateEntity(entity));
  };

  const defaultValues = () => ({
    ...conteneurEntity,
    dateEntree: convertDateTimeFromServer(conteneurEntity.dateEntree),
    dateSortie: convertDateTimeFromServer(conteneurEntity.dateSortie),
  });

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gestionConteneurApp.conteneur.home.createOrEditLabel" data-cy="ConteneurCreateUpdateHeading">
            <Translate contentKey="gestionConteneurApp.conteneur.home.createOrEditLabel">Create or edit a Conteneur</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="conteneur-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField label={translate('gestionConteneurApp.conteneur.statut')} name="statut" id="conteneur-statut" type="select">
                <ParamOptionsContainer paramName="statutConteneur" />
              </ValidatedField>
              <ValidatedField
                label={translate('gestionConteneurApp.conteneur.dateEntree')}
                id="conteneur-dateEntree"
                name="dateEntree"
                data-cy="dateEntree"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('gestionConteneurApp.conteneur.dateSortie')}
                id="conteneur-dateSortie"
                name="dateSortie"
                data-cy="dateSortie"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('gestionConteneurApp.conteneur.position')}
                id="conteneur-position"
                name="position"
                data-cy="position"
                type="text"
              />
              <ValidatedField
                label={translate('gestionConteneurApp.conteneur.commentaire')}
                id="conteneur-commentaire"
                name="commentaire"
                data-cy="commentaire"
                type="text"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/conteneur" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ConteneurUpdate;
