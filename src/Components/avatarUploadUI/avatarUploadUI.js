import React,{ useState, useRef,useEffect,Suspense } from 'react';
import styles from "./avatarUpload.module.scss"
import {setUserAvatarURL} from "../Settings/SettingsSlice"
import { useDispatch,useSelector } from "react-redux";
import {ref,getDownloadURL,uploadBytesResumable} from "@firebase/storage"
import { db,auth,app,storage } from '../Firebase/Firebase';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import {IoMdCheckmark} from "react-icons/io";

const AvatarUploadUI = () => {
    const dispatch = useDispatch()
	const userAvatarURL = useSelector(state => state.settings.userAvatarURL)
    const [avatarFile,setAvatarFile] = useState("No file")
	const [src,setSrc] = useState(null)
	const [preview,setPreview] = useState(null)
    const [showPreview,setShowPreview] = useState(false)
    const [selectedFile,setSelectedFile] = useState(null)
	const [imgUrl,setImgUrl] = useState("")
	const [showDoneIcon,setShowDoneIcon] = useState(false)
	// const []
	const [loadingPercentage,setLoadingPercentage] = useState(`${0}%`)

    /////////Upload File //////////////////////
    const handleChange = (e) => {
		setSelectedFile(e.target.files[0])
		setSrc(`${setSelectedFile}`)
	}
	
    const uploadTask = async(selectedFile) => {
		if(!selectedFile) return
        console.log(selectedFile);
		const storageRef = ref(storage, `/usersAvatars/${selectedFile.name}`)
		const  uploadAvatar = uploadBytesResumable(storageRef, selectedFile)
		uploadAvatar.on("state_changed", (snapshot) => {
			const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100
			setLoadingPercentage(progress)
		},(error) => {
			console.log(error);
		},
		() => {
			getDownloadURL(uploadAvatar.snapshot.ref).then((downloadURL) => {
				dispatch(setUserAvatarURL(downloadURL))
				setImgUrl(downloadURL)
				setShowDoneIcon(true)
			})
		})
	} 
	
    return <div className={styles.uploadAvatarWrapper}>
                <div className={styles.btnsWrapper}>
                    <Link to = "/accountDetails" className={styles.backLink}>
						<FaChevronLeft className={styles.goBackBtn}/>
					</Link>
                    <span className= {styles.uploadBtn} type = "submit" onClick={() => uploadTask(selectedFile)}><IoMdCheckmark className ={ styles.checkMarkIcons}/></span>
                </div>		
				<div className={styles.inputFileWrapper}>
					<label htmlFor='userAvatar' className={styles.inputLabel}>Choose a Profile Image</label>
					<input type= "file" onChange={handleChange} id = "userAvatar" className = {styles.uploadFileInputElement}/>
				</div>
				
                
				<div>Uploaded {loadingPercentage}</div>
    </div>;
}



export default AvatarUploadUI;