test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();

  const parsedUpdadedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdadedAt);

  expect(responseBody.version_db).toBe("16.0");
  expect(responseBody.connections_max).toBe(100);
  expect(responseBody.connections_now).toBeGreaterThanOrEqual(1);
});
