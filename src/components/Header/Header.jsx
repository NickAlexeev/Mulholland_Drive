import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';
import { connect } from 'react-redux';
import CartIconCounter from './CartIconCounter/CartIconCounter';
import HiddenMenu from './HiddenMenu/HiddenMenu';
import DropDownOnHover from './DropDownOnHover/DropDownOnHover';
import { selectIsCurrentUserLoggedIn } from '../../redux/user/users.selectors';

const DEFAULT_WIDTH = 550;

function Header({ isCurrentUserLoggedIn, location, match }) {
    const [isActive, setIsActive] = useState(false);
    const [currentPath, setCurrentPath] = useState();
    const isActiveRef = useRef(false);
    isActiveRef.current = isActive;
    const navbar = useRef()
    const prevPathRef = useRef()

    console.log('~~~~~~~~~~~~~~~Header.jsx~~~~~~~~~~~~~~~')

    useEffect(() => {
        // #0 Set redirect of Go Back button to previous path
        prevPathRef.current = currentPath;
        setCurrentPath(location.pathname)

        location.pathname === '/' ?
            navbar.current.style.backgroundColor = 'transparent' :
            navbar.current.style.backgroundColor = 'black';
        // #1
        const handleViewPortChange = () => {
            if (isActiveRef.current && window.innerWidth > DEFAULT_WIDTH) {
                setIsActive(prevState => !prevState)
            }
        }
        // #2
        const handleScroll = () => {
            location.pathname === '/' && window.scrollY > 525 ?
                navbar.current.style.backgroundColor = "black" : navbar.current.style.backgroundColor = "null"
        }
        window.addEventListener('resize', handleViewPortChange)
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('resize', handleViewPortChange);
            window.removeEventListener('scroll', handleScroll);
        }
    })

    useEffect(() => {
        setIsActive(false)
    }, [location])




    return (

        < React.Fragment >
            <header ref={navbar} className="header">
                <div className="flex-header">
                    <Link to={{ pathname: '/' }} className="logo">Mulholland Drive</Link>
                    <div className="menu">
                        <Link
                            to={{ pathname: `${prevPathRef.current ? prevPathRef.current : '/'}` }}
                            style={location.pathname === '/' ? { display: "none" } :
                                { color: "crimson", display: "inline-block" }}>
                            Go Back
                        </Link>
                        <div className="clothing-link" >Clothing
                        <DropDownOnHover />
                        </div>
                        <Link disabled to={{ pathname: '/ContactUs' }}>Contact</Link>
                        {isCurrentUserLoggedIn !== null ?
                            <a onClick={() => firebase.auth().signOut()}>Sign Out</a> :
                            <Link to={{ pathname: '/SignInUp' }}>Sign In</Link>}
                        <CartIconCounter />
                    </div>
                    <div onClick={() => setIsActive(prevState => !prevState)} className="hamburger-wrapper">
                        <div className={isActive ? "hamburger-menu active" : "hamburger-menu"}></div>
                    </div>
                </div>
            </header>
            <HiddenMenu isActive={isActive} />
        </React.Fragment >
    )

}
// Redux
const mapStateToProps = state => ({
    isCurrentUserLoggedIn: selectIsCurrentUserLoggedIn(state)
})

export default connect(mapStateToProps, null)(withRouter(Header))