import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { createEntity } from './agent.reducer';
import { convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { ParamOptionsContainer } from 'app/shared/components';

export const EntreeAdd = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const conteneurEntity = useAppSelector(state => state.entree.entity);
  const loading = useAppSelector(state => state.entree.loading);
  const updating = useAppSelector(state => state.entree.updating);
  const updateSuccess = useAppSelector(state => state.entree.updateSuccess);

  const handleClose = () => {
    props.history.push('/agent/entree');
  };

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.dateEntree = convertDateTimeToServer(values.dateEntree);

    const entity = {
      ...values,
      statut: 100,
    };

    dispatch(createEntity(entity));
  };

  const defaultValues = () => ({
    dateEntree: displayDefaultDateTime(),
  });

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gestionConteneurApp.entree.createLabel" data-cy="EntreeAddHeading">
            <Translate contentKey="gestionConteneurApp.entree.createLabel">Ajouter une entrée</Translate>
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
              {/* <ParamsSelectContainer name="type" paramName="typeConteneur" labelKey="gestionConteneurApp.conteneur.type" /> */}
              <ValidatedField
                label={translate('gestionConteneurApp.conteneur.type')}
                id="conteneur-type"
                name="type"
                data-cy="type"
                type="select"
                autoComplete="true"
              >
                <ParamOptionsContainer paramName="typeConteneur" allowEmpty={false} />
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
                label={translate('gestionConteneurApp.conteneur.commentaire')}
                id="conteneur-commentaire"
                name="commentaire"
                data-cy="commentaire"
                type="text"
              />{' '}
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

export default EntreeAdd;
