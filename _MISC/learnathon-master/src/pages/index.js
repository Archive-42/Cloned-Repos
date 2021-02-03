import React from "react"
import Layout from '../components/Layout'
import { graphql, useStaticQuery, Link } from 'gatsby'
import Head from '../components/head'

const IndexPage = () => {
	const data = useStaticQuery(graphql`
		query {
			allMarkdownRemark (sort: {
				fields: frontmatter___date
				order: DESC
			}) {
				edges{
					node{
						frontmatter{
							title
							subtitle
							date(formatString: "Do MMMM, YYYY")
							writer
						}
						timeToRead
						fields{
							slug
						}
					}
				}
			}
		}
	`)


	return (
		<Layout>
			<Head title="Home"/>
			{
				data.allMarkdownRemark.edges.map(edge => {
					return (
						<article className={`list-blogs`}>
							<Link to={`/${edge.node.fields.slug}`}>
								<h2>{edge.node.frontmatter.title}</h2>
							</Link>
							<p className="subtitle">{edge.node.frontmatter.subtitle}</p>
							<p><i className="far fa-calendar-alt">
								</i>&nbsp;{edge.node.frontmatter.date} | &nbsp;
								<i class="fas fa-stopwatch"></i>&nbsp;
								{edge.node.timeToRead}min read | &nbsp;
								<i class="fas fa-user"></i> {edge.node.frontmatter.writer}
							</p>
						</article>
					)
				})
			}
		</Layout>
	)
}

export default IndexPage
