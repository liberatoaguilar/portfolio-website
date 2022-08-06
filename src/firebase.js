import { initializeApp } from 'firebase/app';                                                                          
import { getFirestore, collection, getDocs, query, where, deleteDoc, doc, setDoc } from 'firebase/firestore';                        
import { getStorage, ref, deleteObject } from 'firebase/storage';                                                      
                                                                                                                       
const firebaseApp = initializeApp({                                                                                    
      apiKey: "AIzaSyCKWA4gvRmdywzOLLzFT0tQxdhyVM8LEkQ",
      authDomain: "portfolio-website-47224.firebaseapp.com",
      projectId: "portfolio-website-47224",
      storageBucket: "portfolio-website-47224.appspot.com",
      messagingSenderId: "921175225262",
      appId: "1:921175225262:web:2d3f3eba813d4bf4540e3f"
});                                                                                                                    
                                                                                                                       
const db = getFirestore(firebaseApp);                                                                                  
const pageCollection = collection(db, 'page');                                                                    
const socialCollection = collection(db, 'socials');                                                                    
const projectCollection = collection(db, 'projects');
const projectBackupCollection = collection(db, 'projectsBackup');
const storage = getStorage(firebaseApp);                                                                               

export const getPageInfo = async () => {               
    const pageInfo = await getDocs(pageCollection); 
    let info = [];                                        
    pageInfo.forEach((doc) => {                        
        info.push({...doc.data(), id: doc.id});           
    })                                                    
    return info;                                          
}                                                         

export const setPageInfo = async(info) => {
    await setDoc(doc(db, "page", "pageInfo"), {
        ...info,
    });
    localStorage.removeItem("page");
}

export const getSocials = async () => {                 
    const socialInfo = await getDocs(socialCollection); 
    let info = [];                                      
    socialInfo.forEach((doc) => {                       
                info.push({...doc.data(), id: doc.id});         
            })                                                  
    return info;                                        
}                                                       

export const eraseSocials = async (ids) => {
    for (let i = 0; i < ids.length; i++) {
        await deleteDoc(doc(db, "socials", String(ids[i])));
    }
}

export const setSocial = async (name, info) => {
    await setDoc(doc(db, "socials", name), {
        ...info,
    });
}


export const getFeaturedProjects = async () => {                   
    let q = query(projectCollection, where("featured", "==", true));
    const projectDocs = await getDocs(q);   
    let projects = [];                                     
    projectDocs.forEach((doc) => {                          
        projects.push({...doc.data(), projectID: doc.id});
    })                                                    
    return projects;                                       
}                                                         

export const getProjects = async () => {
    const projectDocs = await getDocs(projectCollection);
    let projects = [];
    projectDocs.forEach((doc) => {
        projects.push({...doc.data(), projectID: doc.id});
    })
    return projects;
}

export const getProjectsBackup = async () => {
    const projectDocs = await getDocs(projectBackupCollection);
    let projects = [];
    projectDocs.forEach((doc) => {
        projects.push({...doc.data(), projectID: doc.id});
    })
    return projects;
}

export const saveProjectsBackup = async (projects) => {
    const projectDocs = await getDocs(projectBackupCollection);
    projectDocs.forEach(async (projectDoc) => {
        await deleteDoc(doc(db, "projectsBackup", String(projectDoc.data().projectID)));
    })
    projects.forEach(async (project) => {
        await setDoc(doc(db, "projectsBackup", String(project.projectID)), {
            ...project,
        });
    });
}

export const saveAllProjects = async (projects) => {
    const projectDocs = await getDocs(projectCollection);
    projectDocs.forEach(async (projectDoc) => {
        await deleteDoc(doc(db, "projects", String(projectDoc.data().projectID)));
    })
    projects.forEach(async (project) => {
        await setDoc(doc(db, "projects", String(project.projectID)), {
            ...project,
        });
    });
}

export const addProject = async (project, projectID) => {
    await setDoc(doc(db, "projects", String(projectID)), {
        ...project,
    });
}

export const deleteProjects = async (projectIDs) => {
    for (let i = 0; i < projectIDs.length; i++) {
        await deleteDoc(doc(db, "projects", String(projectIDs[i])));
    }
}

export const deletePicture = async (url) => {
    const storageRef = ref(storage, url);
    deleteObject(storageRef).then(() => {

    });
}
