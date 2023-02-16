import { getDoc,doc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import {auth,db} from "../Firebase/Firebase"
import { showNoInternetConnection,hideNoInternetConnection } from "../Settings/SettingsSlice";
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
const WrapPromise = (promise) => {
    const dispatch = useDispatch()
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
                dispatch(showNoInternetConnection())
                console.log(result);
            }
            else{
                dispatch(hideNoInternetConnection())
                return result
        }
        }
    }
}
export const createResource = () => {
    return {
        data: WrapPromise(FetchPerson()),
        tasks: WrapPromise(FetchProjectTasks())
    }
}