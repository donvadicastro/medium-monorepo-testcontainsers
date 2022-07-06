import * as path from "path";

const {GenericContainer} = require("testcontainers");

module.exports = async () => {
    const postgresContainer = await new GenericContainer("postgres")
        .withExposedPorts(5432)
        .withEnv("POSTGRES_USER", "test")
        .withEnv("POSTGRES_PASSWORD", "test")
        .withEnv("POSTGRES_DB", "medium_monorepo_testcontainsers")
        .start();

    const apiContainerBuilder = await GenericContainer.fromDockerfile(path.resolve(__dirname, '../../api/tests'))
        .build();

    const apiContainer = await apiContainerBuilder
        .withExposedPorts(3333)
        .withBindMount(path.resolve(__dirname, '../../../dist/apps/api'), "/api")
        .withEnv('DATABASE_HOST', postgresContainer.getIpAddress('bridge'))
        .withEnv("DATABASE_USERNAME", "test")
        .withEnv("DATABASE_PASSWORD", "test")
        .start();

    const appContainerBuilder = await GenericContainer.fromDockerfile(path.resolve(__dirname, '../../app/tests'))
        .build();

    const appContainer = await appContainerBuilder
        .withExposedPorts(80)
        .withBindMount(path.resolve(__dirname, '../../../dist/apps/app'), "/usr/share/nginx/html")
        .start();

    process.env['API_URL'] = `http://localhost:${apiContainer.getMappedPort(3333)}`;
    process.env['APP_URL'] = `http://localhost:${appContainer.getMappedPort(80)}`;
};
