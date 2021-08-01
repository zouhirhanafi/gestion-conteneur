package ma.nsi.domain.enumeration;

/**
 * The StatutConteneur enumeration.
 */
public enum StatutConteneur {
    C("Créé"),
    A("Affecté"),
    AS("Attente sortie"),
    S("Sortie"),
    AC("A controlé"),
    EN("En controle"),
    CC("Controlé");

    private final String value;

    StatutConteneur(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
