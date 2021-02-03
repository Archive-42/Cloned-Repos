import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import Head from '../components/head'

export const query = graphql`
	query($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
			frontmatter {
				title
				date(formatString: "Do MMMM, YYYY")
				keywords
				writer
			}
			html
			timeToRead
		}
	}
`

const Blog = (props) => {
		return (
			<Layout>
				<Head
					title={props.data.markdownRemark.frontmatter.title}
					keywords={props.data.markdownRemark.frontmatter.keywords}
				/>
				<article className="blog">
					<h1>{props.data.markdownRemark.frontmatter.title}</h1>
					<p>
					<i className="far fa-calendar-alt"></i> {props.data.markdownRemark.frontmatter.date} |&nbsp;
					<i className="fas fa-stopwatch"></i> {props.data.markdownRemark.timeToRead}min read |&nbsp;
					<i class="fas fa-pen-fancy"></i> written by {props.data.markdownRemark.frontmatter.writer}
					</p>
					<div className="blog-content" dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }}></div>
				</article>
			</Layout>
		)
}

export default Blog
