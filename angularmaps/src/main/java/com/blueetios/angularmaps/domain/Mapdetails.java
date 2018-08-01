package com.blueetios.angularmaps.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Mapdetails.
 */
@Document(collection = "mapdetails")
public class Mapdetails implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    private String id;

    @Field("longitude")
    private String longitude;

    @Field("latitude")
    private String latitude;

    @Field("label")
    private String label;

    @Field("incompliances")
    private String incompliances;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLongitude() {
        return longitude;
    }

    public Mapdetails longitude(String longitude) {
        this.longitude = longitude;
        return this;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public String getLatitude() {
        return latitude;
    }

    public Mapdetails latitude(String latitude) {
        this.latitude = latitude;
        return this;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public String getLabel() {
        return label;
    }

    public Mapdetails label(String label) {
        this.label = label;
        return this;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getIncompliances() {
        return incompliances;
    }

    public Mapdetails incompliances(String incompliances) {
        this.incompliances = incompliances;
        return this;
    }

    public void setIncompliances(String incompliances) {
        this.incompliances = incompliances;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Mapdetails mapdetails = (Mapdetails) o;
        if (mapdetails.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), mapdetails.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Mapdetails{" +
            "id=" + getId() +
            ", longitude='" + getLongitude() + "'" +
            ", latitude='" + getLatitude() + "'" +
            ", label='" + getLabel() + "'" +
            ", incompliances='" + getIncompliances() + "'" +
            "}";
    }
}
