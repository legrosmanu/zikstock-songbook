package com.zikstock.songbook.application;

import java.util.logging.Level;
import java.util.logging.Logger;

import org.apache.commons.configuration2.Configuration;
import org.apache.commons.configuration2.FileBasedConfiguration;
import org.apache.commons.configuration2.PropertiesConfiguration;
import org.apache.commons.configuration2.builder.FileBasedConfigurationBuilder;
import org.apache.commons.configuration2.builder.fluent.Parameters;

public class ConfigApp {

    private Configuration config;
    private static final Logger logger = Logger.getLogger(ConfigApp.class.getName());

    public ConfigApp() {
        try {
            var params = new Parameters();
            var fileBasedBuilder = new FileBasedConfigurationBuilder<FileBasedConfiguration>(
                    PropertiesConfiguration.class)
                    .configure(params.properties().setFileName("application.properties"));

            config = fileBasedBuilder.getConfiguration();

            logger.info("------ Configuration loaded successfully ------");

        } catch (Exception e) {
            logger.log(Level.SEVERE, String.format("‼️ Failed to load configuration, null: %s", e.getMessage()), e);
        }
    }

    public String getGcpProjectId() {
        return config.getString("gcp.project-id");
    }

    public int getAppPort() {
        return config.getInt("app.port", 8080);
    }

}
