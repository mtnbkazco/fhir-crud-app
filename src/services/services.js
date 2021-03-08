import _axios from "axios";

const axios = _axios.create({
  baseURL: "http://hapi.fhir.org/baseR4",
});

export const getPatients = () => {
  return axios.get("/Patient");
};

export const postPatient = () => {
  return axios.post("/Patient")
}
