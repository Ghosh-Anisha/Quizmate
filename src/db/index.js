import { useState, useEffect } from "react";
import { auth, firestore, storage } from "./firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const signup = async (email, pwd) =>
  auth
    .createUserWithEmailAndPassword(email.trim(), pwd.trim())
    .then((userCredential) => {
      userCredential.user.sendEmailVerification();
      auth.signOut();
      alert("Please check your email for verification link");
      //toast.info("Please check your email for verification link");
    })
    .catch(alert);
export const login = async (email, pwd) =>
  auth.signInWithEmailAndPassword(email.trim(), pwd.trim()).then((user) => {
    if (!user.user.emailVerified) {
      //toast.error("Please verify your email");
      auth.signOut();
      alert("Please verify your email");
    }
  });

export const logout = () => {
  localStorage.setItem("gfc-user", "");
  return auth.signOut();
};

export const useAuthenticated = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    auth.onAuthStateChanged((usr) => setUser(usr));
  }, []);
  return user;
};

export const createForm = (formModel) => {
  const user = auth.currentUser;
  return firestore.collection("forms").add({ ...formModel, uid: user.uid });
};

export const getForms = async () => {
  const user = auth.currentUser;
  let docs = await firestore
    .collection("forms")
    .where("uid", "==", user.uid)
    .get({});
  docs = docs.docs;
  let forms = docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return forms;
};

export const getForm = async (ops) => {
  let docs = await firestore.collection("forms").get();
  let doc = docs.docs.find((doc) => doc.id === ops.id);
  doc = { ...doc.data(), id: doc.id };
  if(new Date(doc.endDate.trim()) < new Date()){
    alert("Quiz has expired");
    return;
  }
  else if (new Date(doc.startDate.trim()) > new Date()) {
    alert("Quiz is not yet available");
    return;
  }
  
  return doc;
};

export const deleteForm = async (formId) => {
  let submissions = await firestore
    .collection("submissions")
    .where("formId", "==", formId)
    .get();
  submissions = submissions.docs;
  for (let submission of submissions) {
    await firestore.collection("submissions").doc(submission.id).delete();
  }
  return firestore.collection("forms").doc(formId).delete();
};

export const uploadFile = (file, fileName) => {
  let ref = storage.ref("files/" + fileName);
  return ref.put(file);
};

export const submitForm = async (submission, formId) => {
  let docs = await firestore.collection("forms").get();
  let doc = docs.docs.find((doc) => doc.id === formId);
  let formData = { ...doc.data(), id: doc.id };
  formData = formData["fields"];
  console.log(formData);
  let marksTotal = 0
  let marksObtained = 0;
  for (let i = 1; i < formData.length; ++i) {
    if (formData[i]["required"] !== true) {
      formData[i]["required"] = false;
    }
    if (formData[i]["marks"] == null) {
      formData[i]["marks"] = "0";
    }
    submission[i]["required"] = formData[i]["required"];
    submission[i]["marks"] = formData[i]["marks"];
    submission[i]["expectedAnswer"] = formData[i]["answer"] ? formData[i]["answer"] : "NA";

    if (submission[i]["value"] == submission[i]["expectedAnswer"]) {
      marksObtained += parseInt(submission[i]["marks"])
      marksTotal += parseInt(submission[i]['marks'])
    }
    marksTotal += parseInt(submission[i]['marks'])
  }

  firestore.collection("submissions").add({
    submission,
    formId,
    marksObtained,
    marksTotal
  });
};

export const getSubmissions = async (opts) => {
  let docs = await firestore.collection("submissions").where('formId','==', opts).get();
  docs = docs.docs;
  let submissions = docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return submissions;
};

export const getStatistics = async (opts) => {
  let docs = await firestore.collection("submissions").where('formId','==', opts).get(opts);
  docs = docs.docs;
  let submissions = docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  let statistics = {};

  for (let i = 0; i < submissions.length; ++i) {
    if ("marksObtained" in statistics) {
      statistics["marksObtained"].push(`${submissions[i]["marksObtained"]}`);
    }
    else {
      statistics["marksObtained"] = [`${submissions[i]["marksObtained"]}`];
    }
    for (let j = 0; j < submissions[i]["submission"].length; ++j) {
      for (let key in submissions[i]["submission"][j]) {
        if (key in statistics) {
          statistics[key].push(submissions[i]["submission"][j][key]);
        }
        else {
          statistics[key] = Array(`${submissions[i]["submission"][j][key]}`);
        }
      }
    }
  }
  let stats = {};
  stats["marksObtained"] = statistics["marksObtained"];

  for (let i = 0; i < statistics["value"].length; ++i) {
    let title = statistics["title"][i];
    let value = statistics["value"][i];
    if (title in stats) {
      if (value in stats[title]) {
        stats[title][value]++;
      }
      else {
        stats[title][value] = 1;
      }
    }
    else {
      stats[title] = {};
      stats[title][value] = 1;
    }
  }
  return stats;
}
