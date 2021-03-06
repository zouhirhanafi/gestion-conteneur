package ma.nsi.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import ma.nsi.domain.Parameter;
import ma.nsi.service.ParameterQueryService;
import ma.nsi.service.ParameterService;
import ma.nsi.service.dto.ParameterCriteria;
import ma.nsi.service.dto.ParameterMinProjection;
import ma.nsi.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link ma.nsi.domain.Parameter}.
 */
@RestController
@RequestMapping("/api")
public class ParameterResource {

    private final Logger log = LoggerFactory.getLogger(ParameterResource.class);

    private static final String ENTITY_NAME = "parameter";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ParameterService parameterService;

    private final ParameterQueryService parameterQueryService;

    public ParameterResource(ParameterService parameterService, ParameterQueryService parameterQueryService) {
        this.parameterService = parameterService;
        this.parameterQueryService = parameterQueryService;
    }

    /**
     * {@code POST  /parameters} : Create a new parameter.
     *
     * @param parameter the parameter to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new parameter, or with status {@code 400 (Bad Request)} if the parameter has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/parameters")
    public ResponseEntity<Parameter> createParameter(@RequestBody Parameter parameter) throws URISyntaxException {
        log.debug("REST request to save Parameter : {}", parameter);
        if (parameter.getId() != null) {
            throw new BadRequestAlertException("A new parameter cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Parameter result = parameterService.save(parameter);
        return ResponseEntity
            .created(new URI("/api/parameters/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /parameters} : Updates an existing parameter.
     *
     * @param parameter the parameter to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated parameter,
     * or with status {@code 400 (Bad Request)} if the parameter is not valid,
     * or with status {@code 500 (Internal Server Error)} if the parameter couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/parameters")
    public ResponseEntity<Parameter> updateParameter(@RequestBody Parameter parameter) throws URISyntaxException {
        log.debug("REST request to update Parameter : {}", parameter);
        if (parameter.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Parameter result = parameterService.save(parameter);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, parameter.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /parameters} : get all the parameters.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of parameters in body.
     */
    @GetMapping("/parameters")
    public ResponseEntity<List<Parameter>> getAllParameters(ParameterCriteria criteria, Pageable pageable) {
        log.debug("REST request to get Parameters by criteria: {}", criteria);
        Page<Parameter> page = parameterQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /parameters/count} : count all the parameters.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/parameters/count")
    public ResponseEntity<Long> countParameters(ParameterCriteria criteria) {
        log.debug("REST request to count Parameters by criteria: {}", criteria);
        return ResponseEntity.ok().body(parameterQueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /parameters/:id} : get the "id" parameter.
     *
     * @param id the id of the parameter to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the parameter, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/parameters/{id}")
    public ResponseEntity<Parameter> getParameter(@PathVariable Long id) {
        log.debug("REST request to get Parameter : {}", id);
        Optional<Parameter> parameter = parameterService.findOne(id);
        return ResponseUtil.wrapOrNotFound(parameter);
    }

    /**
     * {@code DELETE  /parameters/:id} : delete the "id" parameter.
     *
     * @param id the id of the parameter to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/parameters/{id}")
    public ResponseEntity<Void> deleteParameter(@PathVariable Long id) {
        log.debug("REST request to delete Parameter : {}", id);
        parameterService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }

    @GetMapping("/ano/parameters/forms")
    public ResponseEntity<Map<String, List<ParameterMinProjection>>> getParameterForms() {
        log.debug("REST request to get Parameters forms");
        return ResponseEntity.ok().body(parameterService.getParameterForms());
    }

    @GetMapping("/ano/parameters/plud")
    public Long getPlud() {
        log.debug("REST request to get Parameters last modified date");
        return parameterService.getPlud();
    }
}
