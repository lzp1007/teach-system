import request from "./request";

export async function getDesp() {
  return await request().get("/api/desp");
}
