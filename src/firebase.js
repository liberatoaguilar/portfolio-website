import { initializeApp } from 'firebase/app';                                                                          
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';                        
//import { getStorage, ref, deleteObject } from 'firebase/storage';                                                      
                                                                                                                       
const firebaseApp = initializeApp({                                                                                    
      apiKey: "AIzaSyCKWA4gvRmdywzOLLzFT0tQxdhyVM8LEkQ",
      authDomain: "portfolio-website-47224.firebaseapp.com",
      projectId: "portfolio-website-47224",
      storageBucket: "portfolio-website-47224.appspot.com",
      messagingSenderId: "921175225262",
      appId: "1:921175225262:web:2d3f3eba813d4bf4540e3f"
});                                                                                                                    
                                                                                                                       
const db = getFirestore(firebaseApp);                                                                                  
const homeCollection = collection(db, 'home');                                                                    
const socialCollection = collection(db, 'socials');                                                                    
const projectCollection = collection(db, 'projects');
//const storage = getStorage(firebaseApp);                                                                               

export const getHomeInfo = async () => {               
    const homeInfo = await getDocs(homeCollection); 
    let info = [];                                        
    homeInfo.forEach((doc) => {                        
        info.push({...doc.data(), id: doc.id});           
    })                                                    
    return info;                                          
}                                                         
export const getSocials = async () => {                 
    const socialInfo = await getDocs(socialCollection); 
    let info = [];                                      
    socialInfo.forEach((doc) => {                       
                info.push({...doc.data(), id: doc.id});         
            })                                                  
    return info;                                        
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
