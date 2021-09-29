package ma.nsi.service;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import ma.nsi.domain.*; // for static metamodels
import ma.nsi.domain.Conteneur;
import ma.nsi.repository.ConteneurRepository;
import ma.nsi.service.criteria.ConteneurCriteria;
import ma.nsi.utils.UtilDateTime;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.jhipster.service.QueryService;

/**
 * Service for executing complex queries for {@link Conteneur} entities in the database.
 * The main input is a {@link ConteneurCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link Conteneur} or a {@link Page} of {@link Conteneur} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class ConteneurQueryService extends QueryService<Conteneur> {

    private final Logger log = LoggerFactory.getLogger(ConteneurQueryService.class);
    private final String[] HEADERS = { "id", "dateEntree", "dateSortie", "position", "commentaire" };

    private final ConteneurRepository conteneurRepository;

    public ConteneurQueryService(ConteneurRepository conteneurRepository) {
        this.conteneurRepository = conteneurRepository;
    }

    @Transactional(readOnly = true)
    public File toCsv(ConteneurCriteria criteria) {
        List<Conteneur> conteneurs = findByCriteria(criteria);
        FileWriter out = null;
        CSVPrinter printer = null;
        File file = null;
        try {
            Path path = Files.createTempFile("inv", ".csv");
            file = path.toFile();
            out = new FileWriter(file);
            printer = new CSVPrinter(out, CSVFormat.DEFAULT.builder().setHeader(HEADERS).setDelimiter(';').build());
            for (Conteneur conteneur : conteneurs) {
                printer.printRecord(
                    conteneur.getId(),
                    UtilDateTime.format(conteneur.getDateEntree()),
                    UtilDateTime.format(conteneur.getDateSortie()),
                    conteneur.getPosition(),
                    conteneur.getCommentaire()
                );
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (printer != null) {
                try {
                    printer.close();
                } catch (IOException e) {}
            }
            if (out != null) {
                try {
                    out.close();
                } catch (IOException e) {}
            }
        }
        return file;
    }

    /**
     * Return a {@link List} of {@link Conteneur} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Conteneur> findByCriteria(ConteneurCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Conteneur> specification = createSpecification(criteria);
        return conteneurRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link Conteneur} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Conteneur> findByCriteria(ConteneurCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Conteneur> specification = createSpecification(criteria);
        return conteneurRepository.findAll(specification, page);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(ConteneurCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Conteneur> specification = createSpecification(criteria);
        return conteneurRepository.count(specification);
    }

    /**
     * Function to convert {@link ConteneurCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Conteneur> createSpecification(ConteneurCriteria criteria) {
        Specification<Conteneur> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildStringSpecification(criteria.getId(), Conteneur_.id));
            }
            if (criteria.getPosition() != null) {
                specification = specification.and(buildStringSpecification(criteria.getPosition(), Conteneur_.position));
            }
            if (criteria.getStatut() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getStatut(), Conteneur_.statut));
            }
            if (criteria.getDateEntree() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getDateEntree(), Conteneur_.dateEntree));
            }
            if (criteria.getDateSortie() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getDateSortie(), Conteneur_.dateSortie));
            }
            if (criteria.getZone() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getZone(), Conteneur_.zone));
            }
            if (criteria.getLigne() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getLigne(), Conteneur_.ligne));
            }
            if (criteria.getColonne() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getColonne(), Conteneur_.colonne));
            }
            if (criteria.getCommentaire() != null) {
                specification = specification.and(buildStringSpecification(criteria.getCommentaire(), Conteneur_.commentaire));
            }
        }
        return specification;
    }
}
