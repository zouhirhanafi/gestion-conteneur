import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { partialUpdateEntity } from './agent.reducer';
import { convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const SortieAdd = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const conteneurEntity = useAppSelector(state => state.sortie.entity);
  const loading = useAppSelector(state => state.sortie.loading);
  const updating = useAppSelector(state => state.sortie.updating);
  const updateSuccess = useAppSelector(state => state.sortie.updateSuccess);

  const handleClose = () => {
    props.history.push('/agent/sortie');
  };

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.dateSortie = convertDateTimeToServer(values.dateSortie);

    const entity = {
      ...values,
      statut: 102,
    };

    dispatch(partialUpdateEntity(entity));
  };

  const defaultValues = () => ({
    dateSortie: displayDefaultDateTime(),
  });

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gestionConteneurApp.sortie.createLabel" data-cy="SortieAddHeading">
            <Translate contentKey="gestionConteneurApp.sortie.createLabel">Ajouter une sortie</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              <ValidatedField name="id" required id="conteneur-id" label={translate('global.field.id')} validate={{ required: true }} />
              <ValidatedField
                label={translate('gestionConteneurApp.conteneur.dateSortie')}
                id="conteneur-dateSortie"
                name="dateSortie"
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

export default SortieAdd;
