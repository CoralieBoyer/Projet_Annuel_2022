module com.example.dashboardclient {
    requires javafx.controls;
    requires javafx.fxml;

    requires org.kordamp.bootstrapfx.core;
    requires java.net.http;
    requires com.fasterxml.jackson.databind;
    requires org.json;


    opens com.example.dashboardclient to javafx.fxml;
    exports com.example.dashboardclient;
}
