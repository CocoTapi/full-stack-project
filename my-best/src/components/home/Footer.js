import { Link } from 'react-router-dom';
import classes from '../css/home/Footer.module.css';
import { FaInstagram, FaGoogle, FaLinkedinIn, FaGithub } from "react-icons/fa6";

function Footer(){
    return (
        <div className={classes.frame}>
            <div className={classes.contents}>
                <div className={classes.iconGroup}>
                    <div>
                        <a href='https://www.instagram.com/' className={classes.icon} ><FaInstagram /></a>
                    </div>
                    <div>
                        <a href='https://www.google.com/' className={classes.icon} ><FaGoogle /></a>
                    </div>
                    <div>
                        <a href='www.linkedin.com/in/shiori-yoshida'  className={classes.icon} ><FaLinkedinIn /></a>
                    </div>
                    <div>
                        <a href='https://github.com/CocoTapi'  className={classes.icon} ><FaGithub /></a>
                    </div>
                </div>
                <p>Personal Projects:</p>
                <div className={classes.links}>
                    <Link to='/' className={classes.link}>Home</Link>
                    <Link to='/activities' className={classes.link} >Activities</Link>
                    <a href='www.linkedin.com/in/shiori-yoshida' className={classes.link}>Contact</a>
                </div>
                <h3>LessonLab</h3>
                <p>2024</p>
            </div>
        </div>
    )
}

export default Footer;