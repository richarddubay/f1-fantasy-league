import app from "../../app";
import request from "supertest";

describe("/team", () => {
  describe("DELETE /team/1", () => {
    it("should respond with a 204", async () => {
      await request(app)
        .delete("/team/1")
        .set("Accept", "application/json")
        .expect(204);
    });
  });

  describe("GET /team", () => {
    it("should respond with a 200", async () => {
      await request(app)
        .get("/team")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  describe("GET /team/1", () => {
    it("should respond with a 404", async () => {
      await request(app)
        .get("/team/1")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(404);
    });
  });

  describe("GET /team/2", () => {
    it("should respond with a 200", async () => {
      await request(app)
        .get("/team/2")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  describe("POST /team", () => {
    it("should respond with a 201", async () => {
      await request(app)
        .post("/team")
        .send({
          team_name: "Eli Marshall Disney Formula One Team",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201);
    });
  });

  describe("PUT /team/2", () => {
    it("should respond with a 200", async () => {
      await request(app)
        .put("/team/2")
        .send({
          team_name: "Dark Knight Gotham Formula One Team",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });
});
