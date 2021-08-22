package ma.nsi.repository;

import ma.nsi.domain.Conteneur;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Conteneur entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ConteneurRepository extends JpaRepository<Conteneur, String>, JpaSpecificationExecutor<Conteneur> {}
