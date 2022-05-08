package com.example.dashboardclient;

import javafx.beans.property.SimpleIntegerProperty;
import javafx.beans.property.SimpleStringProperty;

import java.net.URL;
import java.util.ResourceBundle;

public class PrestationsModel {

    private SimpleStringProperty price;
    private SimpleStringProperty name;
    private SimpleStringProperty description;
    private SimpleStringProperty quantity;

    public PrestationsModel(String price, String name, String description,String quantity) {
        this.price = new SimpleStringProperty(price);
        this.name = new SimpleStringProperty(name);
        this.description = new SimpleStringProperty(description);
        this.quantity = new SimpleStringProperty(quantity);
    }

    public String getPrice() {
        return price.get();
    }

    public void setPrice(String price) {
        this.price = new SimpleStringProperty(price);
    }

    public String getName() {
        return name.get();
    }

    public void setName(String name) {
        this.name = new SimpleStringProperty(name);
    }

    public String getDescription() {
        return description.get();
    }

    public void setDescription(String description) {
        this.description = new SimpleStringProperty(description);
    }

    public String getQuantity() {
        return quantity.get();
    }

    public void setQuantity(String quantity) {
        this.quantity = new SimpleStringProperty(quantity);
    }
}
