import request from "supertest";
import app from "../server.js";

describe("POST /api/invest", () => {
  it("should return 400 if company is missing", async () => {
    const response = await request(app)
      .post("/api/invest")
      .send({});
      
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Company name is required");
  });

  // Note: Testing successful API call might require mocking the LangChain tools and Grok API
  // to avoid hitting rate limits or spending credits in CI/CD environments.
});
