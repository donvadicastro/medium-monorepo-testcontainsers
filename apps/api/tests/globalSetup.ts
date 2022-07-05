import * as path from "path";

const {GenericContainer} = require("testcontainers");

module.exports = async () => {
    const postgresContainer = await new GenericContainer("postgres")
        .withExposedPorts(5432)
        .withEnv("POSTGRES_USER", "test")
        .withEnv("POSTGRES_PASSWORD", "test")
        .withEnv("POSTGRES_DB", "medium_monorepo_testcontainsers")
        .start();

    const apiContainerBuilder = await GenericContainer.fromDockerfile(path.resolve(__dirname))
        .build();

    const apiContainer = await apiContainerBuilder
        .withExposedPorts(3333)
        .withCopyFileToContainer(path.resolve(__dirname, '../../../dist/apps/api/main.js'), "/api/main.js")
        .withEnv('DATABASE_HOST', postgresContainer.getIpAddress('bridge'))
        .withEnv("DATABASE_USERNAME", "test")
        .withEnv("DATABASE_PASSWORD", "test")
        .start();

    process.env.API_URL = `http://localhost:${apiContainer.getMappedPort(3000)}`;
};
