import React, { Suspense } from "react"
import { Link } from "react-router-dom"
import styles from "./Projects.module.scss"
import { ImBin,ImRadioUnchecked } from "react-icons/im";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useSelector } from "react-redux";
import { createResource } from "../PersonApi/PersonApi";
import ProjectComponent from "../Projects/ProjectsComponent"
const Projects = () => {
    const projects = useSelector(state => state.settings.projects)
    console.log(projects);
    const loadingSpinner = <div className={styles.loadingSpinner}>
			<span className={styles.loader}></span>
		</div>
    const resource = createResource()
    return (
        <Suspense fallback = {loadingSpinner}>
        <ProjectComponent resource={resource}/>
        </Suspense>
    )
}
export default Projects