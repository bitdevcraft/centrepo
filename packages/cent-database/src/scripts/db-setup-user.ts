import prompts from "prompts";
import { Client } from "pg";

async function main() {
  const response = await prompts([
    {
      type: "text",
      name: "host",
      message: "Postgres host:",
      initial: "localhost",
    },
    {
      type: "number",
      name: "port",
      message: "Postgres port:",
      initial: 5432,
    },
    {
      type: "text",
      name: "adminUser",
      message: "Admin (superuser) DB username:",
      initial: "postgres",
    },
    {
      type: "password",
      name: "adminPassword",
      message: "Admin DB password:",
    },
    {
      type: "text",
      name: "dbName",
      message: "Database name to grant access on:",
    },
    {
      type: "password",
      name: "userPassword",
      message: "Password for new user `app_user`:",
    },
  ]);

  const { host, port, adminUser, adminPassword, dbName, userPassword } =
    response;

  // connect as superuser
  const client = new Client({
    host,
    port,
    user: adminUser,
    password: adminPassword,
    database: "postgres", // connect to a default DB to run CREATE USER
  });

  await client.connect();

  // run the setup DDL
  const sql = `
    CREATE USER app_user WITH
      PASSWORD '${userPassword}'
      NOSUPERUSER
      NOCREATEDB
      NOCREATEROLE
      NOREPLICATION
      INHERIT
      LOGIN;

    GRANT CONNECT ON DATABASE ${dbName} TO app_user;

    GRANT USAGE ON SCHEMA public TO app_user;

    GRANT SELECT, INSERT, UPDATE, DELETE
      ON ALL TABLES IN SCHEMA public
      TO app_user;

    ALTER DEFAULT PRIVILEGES
      IN SCHEMA public
      GRANT SELECT, INSERT, UPDATE, DELETE
      ON TABLES
      TO app_user;

    GRANT USAGE, SELECT
      ON ALL SEQUENCES IN SCHEMA public
      TO app_user;

    ALTER DEFAULT PRIVILEGES
      IN SCHEMA public
      GRANT USAGE, SELECT
      ON SEQUENCES
      TO app_user;
  `;

  await client.query(sql);
  await client.end();

  // URL-encode the password so special chars are safe
  const encodedPwd = encodeURIComponent(userPassword);
  const connectionString = `postgresql://app_user:${encodedPwd}@${host}:${port}/${dbName}`;

  console.log("\n✅  User `app_user` created successfully.");
  console.log("🔗  Connection string:\n");
  console.log(connectionString);
}

main().catch((err) => {
  console.error("❌  Error:", err);
  process.exit(1);
});
