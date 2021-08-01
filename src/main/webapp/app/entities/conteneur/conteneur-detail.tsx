import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './conteneur.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const ConteneurDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const conteneurEntity = useAppSelector(state => state.conteneur.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="conteneurDetailsHeading">
          <Translate contentKey="gestionConteneurApp.conteneur.detail.title">Conteneur</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{conteneurEntity.id}</dd>
          <dt>
            <span id="statut">
              <Translate contentKey="gestionConteneurApp.conteneur.statut">Statut</Translate>
            </span>
          </dt>
          <dd>{conteneurEntity.statut}</dd>
          <dt>
            <span id="dateEntree">
              <Translate contentKey="gestionConteneurApp.conteneur.dateEntree">Date Entree</Translate>
            </span>
          </dt>
          <dd>
            {conteneurEntity.dateEntree ? <TextFormat value={conteneurEntity.dateEntree} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="dateSortie">
              <Translate contentKey="gestionConteneurApp.conteneur.dateSortie">Date Sortie</Translate>
            </span>
          </dt>
          <dd>
            {conteneurEntity.dateSortie ? <TextFormat value={conteneurEntity.dateSortie} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="zone">
              <Translate contentKey="gestionConteneurApp.conteneur.zone">Zone</Translate>
            </span>
          </dt>
          <dd>{conteneurEntity.zone}</dd>
          <dt>
            <span id="ligne">
              <Translate contentKey="gestionConteneurApp.conteneur.ligne">Ligne</Translate>
            </span>
          </dt>
          <dd>{conteneurEntity.ligne}</dd>
          <dt>
            <span id="colonne">
              <Translate contentKey="gestionConteneurApp.conteneur.colonne">Colonne</Translate>
            </span>
          </dt>
          <dd>{conteneurEntity.colonne}</dd>
          <dt>
            <span id="commentaire">
              <Translate contentKey="gestionConteneurApp.conteneur.commentaire">Commentaire</Translate>
            </span>
          </dt>
          <dd>{conteneurEntity.commentaire}</dd>
        </dl>
        <Button tag={Link} to="/conteneur" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/conteneur/${conteneurEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ConteneurDetail;
