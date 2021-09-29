package ma.nsi.utils;

import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

public class UtilDateTime {

    public static String DATE_FORMAT = "dd/MM/yyyy";

    public static String format(Instant date) {
        if (date == null) {
            return null;
        }
        return DateTimeFormatter.ofPattern(DATE_FORMAT).withZone(ZoneId.systemDefault()).format(date);
    }
}
