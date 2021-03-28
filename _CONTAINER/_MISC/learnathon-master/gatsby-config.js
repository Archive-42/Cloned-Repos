module.exports = {
	plugins: [
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'blog-posts',
				path: `${__dirname}/contents`
			}
		},
		{
			resolve: 'gatsby-plugin-favicon',
			options: {
				logo: './src/static/logo.png',
				icons: {
					android: true,
					appleIcon: true,
					appleStartup: true,
					coast: false,
					favicons: true,
					firefox: true,
					yandex: false,
					windows: false
				}
			}
		},
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-sharp',
		{
			resolve: 'gatsby-transformer-remark',
			options: {
				plugins: [
					'gatsby-remark-relative-images',
					{
						resolve: 'gatsby-remark-images',
						options: {
							maxWidth: 600,
							linkImagesToOriginal: false
						}
					},
					{
						resolve: 'gatsby-remark-prismjs',

					}
				]
			}
		},
	]
}
