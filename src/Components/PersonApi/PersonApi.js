import { getDoc,doc } from "firebase/firestore";
import { useSelector } from "react-redux";
import {auth,db} from "../Firebase/Firebase"

const FetchPerson = async () => {
    // return fetch('https://randomuser.me/api').then(x => x.json()).then(x =>x.results[0])
    const userId =  useSelector((state) => state.signUpSlice.userId)
    const settingsRef = doc(db,"users",`${userId}`,"userSettingsCollection","settings")
    const data = await getDoc(settingsRef)
    if(data.exists()){
        console.log(data);
        // dispatch(getUser)
         return data
    }
}
const FetchProjectTasks = async (projectId) => {
    const userId =  useSelector((state) => state.signUpSlice.userId)
    const settingsRef = doc(db,"users",`${userId}`,"userSettingsCollection","settings")
    const data = await getDoc(settingsRef)
    console.log(data.data().projects[projectId]);
    return data
    //    return data.data().projects[projectId].tasks
    
}
const wrapPromise = (promise) => {
    let status = "pending";
    let result = '';
    let suspender = promise.then(r => {
        status = "success"
        result = r;
    },
    e => {
        status = "error"
        result = e
    }
    )
    return {
        read() {
            if(status === "pending") {
                throw suspender
            }
            else if(status === "error"){
                throw result
            }
            return result
        }
    }
}
export const createResource = () => {
    return {
        data: wrapPromise(FetchPerson()),
        tasks: wrapPromise(FetchProjectTasks())
    }
}