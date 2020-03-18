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

  updatePost: function(send) {
    return axios.patch(`${burl}/post/update`, send, { headers: headers });
  },

  getAllPost: function() {
    return axios.get(`${burl}/post/get/allPost`, { headers: headers });
  },

  getAllReponse: function(id) {
    return axios.get(`${burl}/post/allReponse/` + id, { headers: headers });
  },

  getPost: function(id) {
    return axios.get(`${burl}/post/` + id, { headers: headers });
  },

  addLikePost: function(postId){
    const token = localStorage.getItem("token")
    return axios.patch(`${burl}/post/addLike`,{
      postId,
      token
    }
    , { headers: headers });
  },

  addDislikePost: function(postId){
    const token = localStorage.getItem("token")
    return axios.patch(`${burl}/post/addDislike`,{
      postId,
      token
    }
    , { headers: headers });
  },

  addSignalementPost: function(postId){
    const token = localStorage.getItem("token")
    return axios.patch(`${burl}/post/addSignalement`,{
      postId,
      token
    }
    , { headers: headers });
  },

  deleteLikePost: function(postId){
    const token = localStorage.getItem("token")
    return axios.patch(`${burl}/post/deleteLike`,{
      postId,
      token
    }
    , { headers: headers });
  },

  deleteDislikePost: function(postId){
    const token = localStorage.getItem("token")
    return axios.patch(`${burl}/post/deleteDislike`,{
      postId,
      token
    }
    , { headers: headers });
  },

  deleteSignalementPost: function(postId){
    const token = localStorage.getItem("token")
    return axios.patch(`${burl}/post/deleteSignalement`,{
      postId,
      token
    }
    , { headers: headers });
  },

  addLikeReponse: function(reponseId){
    const token = localStorage.getItem("token")
    return axios.patch(`${burl}/reponse/addLike`,{
      reponseId,
      token
    }
    , { headers: headers });
  },

  addDislikeReponse: function(reponseId){
    const token = localStorage.getItem("token")
    return axios.patch(`${burl}/reponse/addDislike`,{
      reponseId,
      token
    }
    , { headers: headers });
  },

  addSignalementReponse: function(reponseId){
    const token = localStorage.getItem("token")
    return axios.patch(`${burl}/reponse/addSignalement`,{
      reponseId,
      token
    }
    , { headers: headers });
  },

  deleteLikeReponse: function(reponseId){
    const token = localStorage.getItem("token")
    return axios.patch(`${burl}/reponse/deleteLike`,{
      reponseId,
      token
    }
    , { headers: headers });
  },

  deleteDislikeReponse: function(reponseId){
    const token = localStorage.getItem("token")
    return axios.patch(`${burl}/reponse/deleteDislike`,{
      reponseId,
      token
    }
    , { headers: headers });
  },

  deleteSignalementReponse: function(reponseId){
    const token = localStorage.getItem("token")
    return axios.patch(`${burl}/reponse/deleteSignalement`,{
      reponseId,
      token
    }
    , { headers: headers });
  },

  createReponse: function(libelle, token, postId){
    return axios.post(`${burl}/reponse/create`, { libelle, token, postId }, { headers: headers });
  },

  getAllNotification: function() {
    const token = localStorage.getItem("token");
    return axios.get(`${burl}/notification/allNotification/` + token, { headers: headers });
  },

  notificationVue: function(notificationId){
    return axios.patch(`${burl}/notification/vue`,{
      notificationId
    }
    , { headers: headers });
  },

  getAllMyPosts: function() {
    const token = localStorage.getItem("token");
    return axios.get(`${burl}/post/get/getAllMyPosts/`+token, { headers: headers });
  },


  //Parti Admin

  isAdmin: function(){
    const token = localStorage.getItem("token");
    return axios.get(`${burl}/user/isAdmin/` + token, { headers: headers });
  },

  getAllPostSignaled: function() {
    const token = localStorage.getItem("token");
    return axios.get(`${burl}/post/get/getAllPostSignaled/`+token, { headers: headers });
  },

  deletePost: function(postId){
    const token = localStorage.getItem("token");
    return axios.delete(`${burl}/post/delete`, {
      data : { 
        postId: postId,
        token: token },
      headers: headers 
    });
  }
};