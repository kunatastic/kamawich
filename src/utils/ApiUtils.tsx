import { API_BASE } from "../config";
import {
  CreateBoardType,
  CreateStatusType,
  UserLoginType,
  UserSignupType,
} from "../types/AppTypes";

type RequestMethodType = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

async function request(endpoint: string, method: RequestMethodType = "GET", data: any = {}) {
  let url;
  let payload;

  if (method === "GET") {
    const requestParameters = data
      ? `?${Object.keys(data)
          .map((key) => `${key}=${data[key]}`)
          .join("&")}`
      : "";
    url = `${API_BASE}${endpoint}${requestParameters}`;
    payload = null;
  } else {
    url = `${API_BASE}${endpoint}`;
    payload = data ? JSON.stringify(data) : null;
  }

  // BASIC AUTHENTICATION
  // const auth = "Basic " + window.btoa(API_CREDENTIALS);

  // TOKEN AUTHENTICATION
  const token = localStorage.getItem("token");
  const auth = token ? `Token ${token}` : "";

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
      body: payload,
    });

    if (response.ok) {
      if (method === "DELETE") return true;
      const json = await response.json();
      return json;
    } else {
      const errorJson = await response.json();
      throw errorJson;
    }
  } catch (error) {
    throw error;
  }
}

// User logged In status
export async function me() {
  return request("users/me/");
}

// Authentication API
// ---------------------------------------------------
export async function login(data: UserLoginType) {
  return request("auth-token/", "POST", data);
}

export async function signup(data: UserSignupType) {
  return request("auth/registration/", "POST", data);
}

export async function logout() {
  localStorage.removeItem("token");
  return request("auth/logout/");
}

// Boards API
// ---------------------------------------------------

export async function postBoard(data: CreateBoardType) {
  return request("boards/", "POST", data);
}

export async function getListBoards() {
  return request("boards/");
}

export async function getUniqueBoard(boardId: string) {
  return request(`boards/${boardId}/`);
}

// Status API
// ---------------------------------------------------
export async function getListStatus() {
  return request(`status/`);
}

export async function postStatus(data: CreateStatusType) {
  return request("status/", "POST", data);
}
