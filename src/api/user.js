import request from "./request";


export async function login(loginId, loginPwd, identity) {
  const result = await request().post("/api/login", {
    loginId,
    loginPwd,
    identity,
  })
  if(result) {
    const user = {
      loginId,
      name: result.name,
      identity: result.identity,
      classId: result.ClassId,
    }
    return user;
  }
  return null;
}

export function loginOut() {
  localStorage.removeItem("token");
}

export async function whoAmI() {
  const resp = await request().get("/api/whoami")
  return resp;
}