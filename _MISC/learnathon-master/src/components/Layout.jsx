import React from 'react'
import '../styles/styles.css'
import Header from './Header'
import Footer from './Footer'

const Layout = (props) => {
	return (
		<div className="container">
			<Header />
				{props.children}
			<Footer />
		</div>
	)
}

export default Layout