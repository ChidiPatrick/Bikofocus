import React from "react";
import { HiChevronLeft } from "react-icons/hi";
import { useNavigate } from "react-router";
import style from "./NavButton.module.scss"
import {Link} from "react-router-dom"
export const ButtonBack = (props) =>{
    const navigate = useNavigate();
    const moveToPreviousePage = () => {
      navigate(-1);
    };
    return (
        <Link to={-1} className ={style.backBtn}><HiChevronLeft className={style.navigateBackIcon}/></Link>
    )
}
export const ButtonForward  = (props) =>{
    const navigate = useNavigate();
    const moveToPreviousePage = () => {
      navigate(1);
    };
    return (
        <Link to ={1}><HiChevronLeft/></Link>
    )
}