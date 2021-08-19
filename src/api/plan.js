import request from "./request";

export async function getPlan() {
  return await request().get("/api/plan");
}