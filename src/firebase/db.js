//this is going to store Firebase realtime database API code
import { db, storage } from "./firebase";

//##########3 user API

//create an user and store it at users/id path (it's an asynchronous func)
export const doCreateUser = (
  id,
  username,
  email,
  description,
  profilePicture
) => {
  db.ref(`users/${id}`).set(
    {
      username,
      email,
      description,
      profilePicture,
    },
    () => {
      console.log("See this data", profilePicture);
    }
  );
};

export const updateUserData = (id, username, email, description) => {
  db.ref(`users/${id}`).update(
    {
      username: username,
    },
    () => {
      console.log(id, username);
    }
  );
};

export const uploadImageFile = (
  id,
  username,
  email,
  description,
  profilePicture,
  title
) => {
  const uploadImageTask = storage.ref(`Images/${id}`).put(profilePicture);

  uploadImageTask.on(
    "state_changed",
    snapshot => {},
    error => {
      console.log(error);
    },
    () => {
      storage
        .ref("Images")
        .child(id)
        .getDownloadURL()
        .then(url => {
          db.ref(`users/${id}`).set({
            id,
            username,
            email,
            description,
            url,
            title,
          });
        });
    }
  );
};

//returns all users from firebase realtime db
export const onceGetUsers = () => db.ref("users").once("value");

export const doGetAnUnser = uid => db.ref(`users/${uid}`).once("value");

// other APIs could come
