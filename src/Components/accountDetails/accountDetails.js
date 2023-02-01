import React,{useState} from 'react';
import styles from './accountDetails.module.scss'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Account from '../PopsUps/account';
import ChangePasswordPopUp from '../PopsUps/changePassword';
import { showChangePasswordUI,showUsernameUI,showPopUp } from '../Settings/SettingsSlice';
import ChangeUsernamePopUp from '../PopsUps/usernamePopUp';
import { useDispatch, useSelector } from 'react-redux';
import {setUserAvatarURL} from "../Settings/SettingsSlice"
import {ref,getDownloadURL,uploadBytesResumable} from "@firebase/storage"
import { db,auth,app,storage } from '../Firebase/Firebase';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const AccountDetails = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
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
    const avatarURL = useSelector(state => state.settings.userAvatarURL)

    /////////Upload File //////////////////////
    const handleChange = (e) => {
		setSelectedFile(e.target.files[0])
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
	
    const popUp = useSelector(state => state.settings.popUp)
    const changeUserName = useSelector(state => state.settings.changeUserName)
    console.log(changeUserName);
    ///////////////////////////////////////
    const showAccountPopUp = () => {
        dispatch(showPopUp())
    }
    ////////////////////////////////////////
    const handleChangePasswordUI = () => {
        dispatch(showChangePasswordUI())
    }
    ///////////////////////////////////////
    const handleChangeUsername = (e) => {
        console.log(e);
        dispatch(showUsernameUI())
    }
    
    /////////////////////////////////////////
    return <div className={styles.accountDetailsWrapper}>
        <h3 className={styles.accountDetailsHeader}>
            <FaChevronLeft className= {styles.navLinkIcon} onClick = {() => navigate('/settings')}/>
            <span className= {styles.headerHeading}>Account Details</span>
        </h3>
        <div className={styles.accountDetailsInnerWrapper}>
            <Link to = "/uploadAvatarUI" className= {styles.changeAvatarLink}>
                <span>Avatar</span>
                <div className={styles.figureWrapper}>
                    <figure className={styles.avatarFigure}>
                    <img src ={avatarURL} alt ="avatar" className={styles.avatarImage}/>
                    
                    </figure>
                    <FaChevronRight className= {styles.navLinkIconRight}/>
                    <input type= 'file' id  ="userAvatar" className={styles.inputFile} onChange = {handleChange} />
                </div> 
            </Link>
            <div className= {styles.newUsername} onClick = {handleChangeUsername}>
                <span>Username</span>
                <div className={styles.rightContainer}>
                    <span>Patrick Chidiebele</span>
                    <FaChevronRight className= {styles.navLinkIconRight}/>
                </div>
            </div>

            <div className= {styles.newEmail} onClick = {showAccountPopUp}>
                <span>Account</span>
                <div className={styles.rightContainer}>
                    <span>okaforPatrick@gmail.com</span>
                    <FaChevronRight className= {styles.navLinkIconRight}/>
                </div>
            </div>
            <div className= {styles.newPassword} onClick = {handleChangePasswordUI}>
                <span>Change Password</span>
                <FaChevronRight className= {styles.navLinkIconRight}/>
            </div>
        </div>
        
        <button className={styles.signOutBtn}>Sign Out</button>
        <Account/>
        <ChangeUsernamePopUp/>
        <ChangePasswordPopUp/>
        
    </div>;
}
export default AccountDetails;