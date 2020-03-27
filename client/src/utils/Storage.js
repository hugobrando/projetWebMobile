import { storage } from '../firebase-config';

export default {
  create: function(currentImageName,e) {
    return storage.ref(`images/${currentImageName}`).put(e.target.files[0]);
  },
  
  getUrlImage: function(currentImageName){
    return storage.ref('images').child(currentImageName).getDownloadURL()
  }
}