import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const versionDb = (await database.query("SHOW server_version;")).rows[0]
    .server_version;
  const connectionsMax = (await database.query("SHOW max_connections;")).rows[0]
    .max_connections;
  const connectionsNow = (
    await database.query("SELECT COUNT(*) FROM pg_stat_activity;")
  ).rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    version_db: versionDb,
    connections_max: parseInt(connectionsMax),
    connections_now: parseInt(connectionsNow),
  });
}

export default status;
