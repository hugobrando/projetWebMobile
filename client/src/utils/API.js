import axios from "axios";
const headers = {
  "Content-Type": "application/json"
};
const burl = "http://localhost:9000";

export default {
  login: function(email, password, pseudo, firstname, lastname, birthday, adress, tel) {
    return axios.post(
      `${burl}/user/login`,
      {
        email,
        password,
        pseudo,
        firstname,
        lastname,
        birthday,
        adress,
        tel
      },
      {
        headers: headers
      }
    );
  },
  signup: function(send) {
    return axios.post(`${burl}/user/signup`, send, { headers: headers });
  },

  isAuth: function() {
    return localStorage.getItem("token") !== null;
  },
  logout: function() {
    localStorage.clear();
  },

  modifyInfo: function(email, pseudo, firstname, lastname, birthday, adress, tel){
    const token = localStorage.getItem("token")
    return axios.patch(`${burl}/user/edit`,{
      token,
      email,
      pseudo,
      firstname,
      lastname,
      birthday,
      adress,
      tel}
    , { headers: headers });
  },

  getInfoUser: function(){
    const token = localStorage.getItem("token");
    return axios.get(`${burl}/user/info/` + token , { headers: headers });
  },

  createPost: function(send) {
    return axios.post(`${burl}/post/create`, send, { headers: headers });
  },

  getAllPost: function() {
    return axios.get(`${burl}/post/get/allPost`, { headers: headers });
  },

  getPost: function(id) {
    return axios.get(`${burl}/post/` + id, { headers: headers });
  },

  addLike: function(postId){
    const token = localStorage.getItem("token")
    return axios.patch(`${burl}/post/addLike`,{
      postId,
      token
    }
    , { headers: headers });
  },

  addDislike: function(postId){
    const token = localStorage.getItem("token")
    return axios.patch(`${burl}/post/addDislike`,{
      postId,
      token
    }
    , { headers: headers });
  },

  addSignalement: function(postId){
    const token = localStorage.getItem("token")
    return axios.patch(`${burl}/post/addSignalement`,{
      postId,
      token
    }
    , { headers: headers });
  }


};