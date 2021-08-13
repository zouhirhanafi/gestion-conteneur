package ma.nsi.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Conteneur.
 */
@Entity
@Table(name = "conteneur")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Conteneur implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private Long id;

    private Integer type;

    @Column(name = "statut")
    private Integer statut;

    @Column(name = "date_entree")
    private Instant dateEntree;

    @Column(name = "date_sortie")
    private Instant dateSortie;

    private String position;

    @Column(name = "zone")
    private Integer zone;

    @Column(name = "ligne")
    private Integer ligne;

    @Column(name = "colonne")
    private Integer colonne;

    @Column(name = "commentaire")
    private String commentaire;

    @Transient
    @JsonIgnore
    private boolean _new;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Conteneur id(Long id) {
        this.id = id;
        return this;
    }

    public Integer getType() {
        return this.type;
    }

    public Conteneur type(Integer type) {
        this.type = type;
        return this;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Integer getStatut() {
        return this.statut;
    }

    public Conteneur statut(Integer statut) {
        this.statut = statut;
        return this;
    }

    public void setStatut(Integer statut) {
        this.statut = statut;
    }

    public Instant getDateEntree() {
        return this.dateEntree;
    }

    public Conteneur dateEntree(Instant dateEntree) {
        this.dateEntree = dateEntree;
        return this;
    }

    public void setDateEntree(Instant dateEntree) {
        this.dateEntree = dateEntree;
    }

    public Instant getDateSortie() {
        return this.dateSortie;
    }

    public Conteneur dateSortie(Instant dateSortie) {
        this.dateSortie = dateSortie;
        return this;
    }

    public void setDateSortie(Instant dateSortie) {
        this.dateSortie = dateSortie;
    }

    public String getPosition() {
        return this.position;
    }

    public Conteneur Position(String position) {
        this.position = position;
        return this;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public Integer getZone() {
        return this.zone;
    }

    public Conteneur zone(Integer zone) {
        this.zone = zone;
        return this;
    }

    public void setZone(Integer zone) {
        this.zone = zone;
    }

    public Integer getLigne() {
        return this.ligne;
    }

    public Conteneur ligne(Integer ligne) {
        this.ligne = ligne;
        return this;
    }

    public void setLigne(Integer ligne) {
        this.ligne = ligne;
    }

    public Integer getColonne() {
        return this.colonne;
    }

    public Conteneur colonne(Integer colonne) {
        this.colonne = colonne;
        return this;
    }

    public void setColonne(Integer colonne) {
        this.colonne = colonne;
    }

    public String getCommentaire() {
        return this.commentaire;
    }

    public Conteneur commentaire(String commentaire) {
        this.commentaire = commentaire;
        return this;
    }

    public void setCommentaire(String commentaire) {
        this.commentaire = commentaire;
    }

    public void setNew(boolean isNew) {
        this._new = isNew;
    }

    public boolean isNew() {
        return this._new;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Conteneur)) {
            return false;
        }
        return id != null && id.equals(((Conteneur) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Conteneur{" +
            "id=" + getId() +
            ", statut=" + getStatut() +
            ", dateEntree='" + getDateEntree() + "'" +
            ", dateSortie='" + getDateSortie() + "'" +
            ", zone=" + getZone() +
            ", ligne=" + getLigne() +
            ", colonne=" + getColonne() +
            ", commentaire='" + getCommentaire() + "'" +
            "}";
    }
}
