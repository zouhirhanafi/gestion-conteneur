import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity, partialUpdateEntity } from './conteneur.reducer';
import { IConteneur } from 'app/shared/model/conteneur.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const ConteneurUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const conteneurEntity = useAppSelector(state => state.conteneurSortie.entity);
  const loading = useAppSelector(state => state.conteneurSortie.loading);
  const updating = useAppSelector(state => state.conteneurSortie.updating);
  const updateSuccess = useAppSelector(state => state.conteneurSortie.updateSuccess);

  const handleClose = () => {
    props.history.push('/conteneur/sortie');
  };

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
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
      // ...conteneurEntity,
      ...values,
      statut: 103,
    };

    dispatch(partialUpdateEntity(entity));
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
          <h2 id="gestionConteneurApp.conteneur.home.marquerSortieLabel" data-cy="MarquerSortieHeading">
            <Translate contentKey="gestionConteneurApp.conteneur.home.marquerSortieLabel">Marquer comme sortie</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              <ValidatedField
                name="id"
                required
                readOnly
                id="conteneur-id"
                label={translate('global.field.id')}
                validate={{ required: true }}
              />
              <ValidatedField
                label={translate('gestionConteneurApp.conteneur.dateEntree')}
                id="conteneur-dateEntree"
                readOnly
                name="dateEntree"
                data-cy="dateEntree"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('gestionConteneurApp.conteneur.dateSortie')}
                id="conteneur-dateSortie"
                name="dateSortie"
                readOnly
                data-cy="dateSortie"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
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
