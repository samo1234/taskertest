import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";
/*
const postTask = (taskname, description, fiatvalue, tags) => {
  return axios.post(API_URL + "posttask", { headers: authHeader()}, {
    taskname,
    description,
    fiatvalue,
    tags
  });
};
*/
const postTask = (taskname, description, fiatvalue, tags) => {
  return axios.post(API_URL + "posttask",
    {
      headers: authHeader(),
      taskname,
      description,
      fiatvalue,
      tags
    }
  );
};

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  const apiResponse = axios.get(API_URL + "user", { headers: authHeader() })
  //  console.log("user.services.js",apiResponse.data);

  return apiResponse;
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

export default {
  postTask,
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};
