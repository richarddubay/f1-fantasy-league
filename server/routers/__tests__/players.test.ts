import app from "../../app";
import request from "supertest";

describe("/player", () => {
  describe("POST /player", () => {
    it("should respond with a 201", async () => {
      await request(app)
        .post("/player")
        .send({
          first_name: "Magic",
          last_name: "Johnson",
          identifier: "magic@johnson.basketball",
          password: "b@sketB@11",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201);
    });

    it("should respond with a 201 again", async () => {
      await request(app)
        .post("/player")
        .send({
          first_name: "Larry",
          last_name: "Bird",
          identifier: "bird@threepointking.basketball",
          password: "Thr$$p0IntKing",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201);
    });
  });

  describe("DELETE /player/1", () => {
    it("should respond with a 204", async () => {
      await request(app)
        .delete("/player/1")
        .set("Accept", "application/json")
        .expect(204);
    });
  });

  describe("GET /player", () => {
    it("should respond with a 200", async () => {
      await request(app)
        .get("/player")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  describe("GET /player/1", () => {
    it("should respond with a 404", async () => {
      await request(app)
        .get("/player/1")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(404);
    });
  });

  describe("GET /player/2", () => {
    it("should respond with a 200", async () => {
      await request(app)
        .get("/player/2")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  describe("PUT /player/2", () => {
    it("should respond with a 200", async () => {
      await request(app)
        .put("/player/2")
        .send({
          first_name: "Bruce",
          last_name: "Wayne",
          identifier: "bruce@wayneenterprises.com",
          password: "Imn0tb@tman",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });
});
