import React from 'react'
import { Link } from 'gatsby'
import logo from '../images/logo.png'

const Header = () => {
	return (
		<>
			<header>
				<Link to="/"><img src={logo} alt="Big Omega" className="logo" /></Link>
			</header>
			<aside className="author-info">
				<div className="text">
					<p>Brought to you by <strong>Sagarmatha Engineering College</strong></p>
					<ul className="social-media-links">
						<li>
							<a href="https://www.instagram.com/sagarmathaengineeringcollege/" target="blank">
								<i className="fab fa-instagram"></i>
							</a>
						</li>
						<li>
							<a href="https://www.facebook.com/college.sagarmatha" target="blank">
								<i className="fab fa-facebook"></i>
							</a>
						</li>
					</ul>
				</div>
			</aside>
		</>
	)
}

export default Header
