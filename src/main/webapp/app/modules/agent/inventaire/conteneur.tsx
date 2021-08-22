import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, TextFormat, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { exportCsv, getEntities, reset } from './conteneur.reducer';
import { IConteneur } from 'app/shared/model/conteneur.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { ParamValue } from 'app/shared/components';

export const Conteneur = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE, 'id'), props.location.search)
  );
  const [sorting, setSorting] = useState(false);

  const conteneurList = useAppSelector(state => state.inventaire.entities);
  const loading = useAppSelector(state => state.inventaire.loading);
  const totalItems = useAppSelector(state => state.inventaire.totalItems);
  const links = useAppSelector(state => state.inventaire.links);
  const entity = useAppSelector(state => state.inventaire.entity);
  const updateSuccess = useAppSelector(state => state.inventaire.updateSuccess);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
      })
    );
  };

  const resetAll = () => {
    dispatch(reset());
    setPaginationState({
      ...paginationState,
      activePage: 1,
    });
    dispatch(getEntities({}));
  };

  useEffect(() => {
    resetAll();
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      resetAll();
    }
  }, [updateSuccess]);

  useEffect(() => {
    getAllEntities();
  }, [paginationState.activePage]);

  const handleLoadMore = () => {
    if ((window as any).pageYOffset > 0) {
      setPaginationState({
        ...paginationState,
        activePage: paginationState.activePage + 1,
      });
    }
  };

  useEffect(() => {
    if (sorting) {
      getAllEntities();
      setSorting(false);
    }
  }, [sorting]);

  const sort = p => () => {
    dispatch(reset());
    setPaginationState({
      ...paginationState,
      activePage: 1,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
    setSorting(true);
  };

  const handleSyncList = () => {
    resetAll();
  };

  const handleExport = () => {
    exportCsv({});
  };

  const { match } = props;

  return (
    <div>
      <h2 id="conteneur-heading" data-cy="ConteneurHeading">
        <Translate contentKey="gestionConteneurApp.conteneur.home.title">Conteneurs</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="gestionConteneurApp.conteneur.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Button className="btn btn-primary" color="info" onClick={handleExport} disabled={loading}>
            <FontAwesomeIcon icon="file-csv" spin={loading} />{' '}
            <Translate contentKey="gestionConteneurApp.conteneur.home.export">Exporter</Translate>
          </Button>
        </div>
      </h2>
      <div className="table-responsive">
        <InfiniteScroll
          pageStart={paginationState.activePage}
          loadMore={handleLoadMore}
          hasMore={paginationState.activePage - 1 < links.next}
          loader={<div className="loader">Loading ...</div>}
          threshold={0}
          initialLoad={false}
        >
          {conteneurList && conteneurList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th className="hand" onClick={sort('id')}>
                    <Translate contentKey="gestionConteneurApp.conteneur.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('type')}>
                    <Translate contentKey="gestionConteneurApp.conteneur.type">Type</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('statut')}>
                    <Translate contentKey="gestionConteneurApp.conteneur.statut">Statut</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('dateEntree')}>
                    <Translate contentKey="gestionConteneurApp.conteneur.dateEntree">Date Entree</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('dateSortie')}>
                    <Translate contentKey="gestionConteneurApp.conteneur.dateSortie">Date Sortie</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('position')}>
                    <Translate contentKey="gestionConteneurApp.conteneur.position">Position</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('commentaire')}>
                    <Translate contentKey="gestionConteneurApp.conteneur.commentaire">Commentaire</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {conteneurList.map((conteneur, i) => (
                  <tr key={`entity-${i}`} data-cy="entityTable">
                    <td>{conteneur.id}</td>
                    <td>
                      <ParamValue value={conteneur.type} />
                    </td>
                    <td>
                      <ParamValue value={conteneur.statut} />
                    </td>
                    <td>
                      {conteneur.dateEntree ? <TextFormat type="date" value={conteneur.dateEntree} format={APP_DATE_FORMAT} /> : null}
                    </td>
                    <td>
                      {conteneur.dateSortie ? <TextFormat type="date" value={conteneur.dateSortie} format={APP_DATE_FORMAT} /> : null}
                    </td>
                    <td>{conteneur.position}</td>
                    <td>{conteneur.commentaire}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            !loading && (
              <div className="alert alert-warning">
                <Translate contentKey="gestionConteneurApp.conteneur.home.notFound">No Conteneurs found</Translate>
              </div>
            )
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Conteneur;
