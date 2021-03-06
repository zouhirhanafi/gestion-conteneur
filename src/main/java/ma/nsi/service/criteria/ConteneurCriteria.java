package ma.nsi.service.criteria;

import java.io.Serializable;
import java.util.Objects;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.BooleanFilter;
import tech.jhipster.service.filter.DoubleFilter;
import tech.jhipster.service.filter.Filter;
import tech.jhipster.service.filter.FloatFilter;
import tech.jhipster.service.filter.InstantFilter;
import tech.jhipster.service.filter.IntegerFilter;
import tech.jhipster.service.filter.LongFilter;
import tech.jhipster.service.filter.StringFilter;

/**
 * Criteria class for the {@link ma.nsi.domain.Conteneur} entity. This class is used
 * in {@link ma.nsi.web.rest.ConteneurResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /conteneurs?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class ConteneurCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private StringFilter id;

    private StringFilter position;

    private IntegerFilter statut;

    private InstantFilter dateEntree;

    private InstantFilter dateSortie;

    private IntegerFilter zone;

    private IntegerFilter ligne;

    private IntegerFilter colonne;

    private StringFilter commentaire;

    public ConteneurCriteria() {}

    public ConteneurCriteria(ConteneurCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.statut = other.statut == null ? null : other.statut.copy();
        this.dateEntree = other.dateEntree == null ? null : other.dateEntree.copy();
        this.dateSortie = other.dateSortie == null ? null : other.dateSortie.copy();
        this.zone = other.zone == null ? null : other.zone.copy();
        this.ligne = other.ligne == null ? null : other.ligne.copy();
        this.colonne = other.colonne == null ? null : other.colonne.copy();
        this.commentaire = other.commentaire == null ? null : other.commentaire.copy();
    }

    @Override
    public ConteneurCriteria copy() {
        return new ConteneurCriteria(this);
    }

    public StringFilter getId() {
        return id;
    }

    public StringFilter id() {
        if (id == null) {
            id = new StringFilter();
        }
        return id;
    }

    public void setId(StringFilter id) {
        this.id = id;
    }

    public StringFilter getPosition() {
        return position;
    }

    public StringFilter position() {
        if (position == null) {
            position = new StringFilter();
        }
        return position;
    }

    public void setPosition(StringFilter position) {
        this.position = position;
    }

    public IntegerFilter getStatut() {
        return statut;
    }

    public IntegerFilter statut() {
        if (statut == null) {
            statut = new IntegerFilter();
        }
        return statut;
    }

    public void setStatut(IntegerFilter statut) {
        this.statut = statut;
    }

    public InstantFilter getDateEntree() {
        return dateEntree;
    }

    public InstantFilter dateEntree() {
        if (dateEntree == null) {
            dateEntree = new InstantFilter();
        }
        return dateEntree;
    }

    public void setDateEntree(InstantFilter dateEntree) {
        this.dateEntree = dateEntree;
    }

    public InstantFilter getDateSortie() {
        return dateSortie;
    }

    public InstantFilter dateSortie() {
        if (dateSortie == null) {
            dateSortie = new InstantFilter();
        }
        return dateSortie;
    }

    public void setDateSortie(InstantFilter dateSortie) {
        this.dateSortie = dateSortie;
    }

    public IntegerFilter getZone() {
        return zone;
    }

    public IntegerFilter zone() {
        if (zone == null) {
            zone = new IntegerFilter();
        }
        return zone;
    }

    public void setZone(IntegerFilter zone) {
        this.zone = zone;
    }

    public IntegerFilter getLigne() {
        return ligne;
    }

    public IntegerFilter ligne() {
        if (ligne == null) {
            ligne = new IntegerFilter();
        }
        return ligne;
    }

    public void setLigne(IntegerFilter ligne) {
        this.ligne = ligne;
    }

    public IntegerFilter getColonne() {
        return colonne;
    }

    public IntegerFilter colonne() {
        if (colonne == null) {
            colonne = new IntegerFilter();
        }
        return colonne;
    }

    public void setColonne(IntegerFilter colonne) {
        this.colonne = colonne;
    }

    public StringFilter getCommentaire() {
        return commentaire;
    }

    public StringFilter commentaire() {
        if (commentaire == null) {
            commentaire = new StringFilter();
        }
        return commentaire;
    }

    public void setCommentaire(StringFilter commentaire) {
        this.commentaire = commentaire;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final ConteneurCriteria that = (ConteneurCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(statut, that.statut) &&
            Objects.equals(dateEntree, that.dateEntree) &&
            Objects.equals(dateSortie, that.dateSortie) &&
            Objects.equals(zone, that.zone) &&
            Objects.equals(ligne, that.ligne) &&
            Objects.equals(colonne, that.colonne) &&
            Objects.equals(commentaire, that.commentaire)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, statut, dateEntree, dateSortie, zone, ligne, colonne, commentaire);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ConteneurCriteria{" +
            (id != null ? "id=" + id + ", " : "") +
            (statut != null ? "statut=" + statut + ", " : "") +
            (dateEntree != null ? "dateEntree=" + dateEntree + ", " : "") +
            (dateSortie != null ? "dateSortie=" + dateSortie + ", " : "") +
            (zone != null ? "zone=" + zone + ", " : "") +
            (ligne != null ? "ligne=" + ligne + ", " : "") +
            (colonne != null ? "colonne=" + colonne + ", " : "") +
            (commentaire != null ? "commentaire=" + commentaire + ", " : "") +
            "}";
    }
}
