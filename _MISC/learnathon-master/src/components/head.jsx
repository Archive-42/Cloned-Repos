import React from 'react'
import { Helmet } from 'react-helmet'

const Head = ({title, keywords}) => {
	return (

		<Helmet>
			<title>{`${title} | Learnathon`}</title>
			<meta name="author" content="Prashant Acharya" />
			<meta name="description" content="Learnathon"/>
			<meta name="keywords" content={`${keywords}`}/>
		</Helmet>
	)
}

export default Head
