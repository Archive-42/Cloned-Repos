/* eslint-disable quotes */
/* eslint-disable space-in-parens */
/* eslint-disable valid-jsdoc */
/**
 * BLOCK: epyt/vi
 */

//  Import CSS.
import "./style.scss";
import "./editor.scss";

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { Component, Fragment } = wp.element;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType("epyt/vi", {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __("Video Ad"), // Block title.
	icon: (
		<svg
			version="1.1"
			id="Capa_1"
			xmlns="http://www.w3.org/2000/svg"
			x="0px"
			y="0px"
			viewBox="0 0 485.6 485.6"
			style={{ enableBackground: "new 0 0 485.6 485.6" }}
			xmlSpace="preserve"
		>
			<g>
				<g>
					<path
						fill="#0ECAD4"
						d="M301.5,368l-0.8-1.3c-6.7-10.5-5.8-23,2.3-32.7c1.2-1.4,2.4-2.8,4-4.5c4.8-4.8,12.4-11.3,23.4-11.3
			c6.7,0,13.3,2.4,20,7.4c10.5,7.7,20.9,15.9,30.9,23.6c2,1.5,3.9,3,5.9,4.5c1.5-1.7,2.9-3.5,4.5-5.1c10.4-11.9,20.6-23.9,30.9-35.8
			c5.6-19.2,8.7-39.5,8.7-60.6c0-119-96.6-215.6-215.6-215.6C96.6,36.8,0,133.4,0,252.4S96.6,468,215.6,468
			c48.3,0,93-15.9,128.9-42.8c-11.5-15-23.2-30-34.6-45C306.7,376.2,304,372,301.5,368z M287,341.6c-10.4,12.7-24,21.2-39.9,25.5
			c-7,1.9-10,5.6-9.6,12.8c0.3,7.1,0,14.2,0,21.2c0,6.3-3.2,9.6-9.4,9.9c-7.5,0.2-15.2,0.2-22.9,0c-6.6-0.1-9.7-3.9-9.9-10.4
			c-0.1-5.1-0.1-10.3-0.1-15.4c-0.1-11.4-0.5-11.8-11.5-13.6c-14-2.2-27.7-5.5-40.6-11.6c-10.1-4.9-11.1-7.4-8.2-18
			c2.2-7.9,4.3-15.8,6.7-23.6c2.8-9.1,5.2-10.2,13.6-5.8c14.2,7.4,29.2,11.5,45,13.5c10.2,1.3,20.1,0.2,29.6-3.8
			c17.5-7.7,20.3-28.1,5.5-40.3c-5.1-4.2-10.8-7.2-16.8-9.9c-15.4-6.7-31.5-12-46.1-20.7c-23.7-14.2-38.7-33.5-36.9-62.3
			c2-32.5,20.3-52.8,50.1-63.6c12.3-4.5,12.3-4.3,12.4-17.2c0-4.3,0-8.7,0-13c0.2-9.7,1.9-11.4,11.5-11.6c3-0.1,6,0,8.9,0
			c20.5,0,20.5,0,20.7,20.5c0.1,14.5,0,14.6,14.5,16.8c11.1,1.7,21.7,5,31.9,9.5c5.7,2.4,7.8,6.5,6,12.4c-2.6,8.8-5,17.8-7.8,26.6
			c-2.7,8.4-5.3,9.5-13.3,5.7c-16-7.8-32.8-11-50.6-10c-4.6,0.2-9.2,0.9-13.5,2.8c-15.3,6.7-17.8,23.6-4.8,34
			c6.6,5.2,14.2,9.1,21.9,12.3c13.6,5.6,27.2,11,40,18.1C304.8,255,315.9,306.4,287,341.6z"
					/>
					<path
						fill="#0ECAD4"
						d="M480.3,302c-4.8-3.9-8.1-5.9-11.1-5.9c-3.4,0-6.4,2.6-11,7.9c-23.2,26.9-29.5,34.3-52.8,61.2
			c-5.2,6-10.4,12-15.8,18.2c-2.7-2.1-5.2-4-7.7-6c-13.7-10.6-27.2-21.3-41-31.6c-3.1-2.3-5.7-3.5-8.1-3.5c-3,0-5.8,1.8-9.2,5.3
			c-1,1-1.8,2-2.7,3.1c-2.5,3-2.9,6.2-0.8,9.5c2.5,3.9,5,7.9,7.8,11.6c18.3,23.8,36.6,47.5,55,71.3c2.2,2.9,4.8,4.4,7.4,4.4
			c2.8,0,5.6-1.7,8-5.2c33.7-48.2,50.3-71.9,83.9-120.1C487.3,314.9,486.9,307.5,480.3,302z"
					/>
				</g>
			</g>
		</svg>

		/* 		<svg
			width="66px"
			height="67px"
			viewBox="0 0 66 67"
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g
				id="Page-1"
				stroke="none"
				strokeWidth="1"
				fill="none"
				fillRule="evenodd"
			>
				<g id="vi_logo" transform="translate(2.000000, 2.000000)">
					<path
						d="M31.3,62.4 C48.5,62.4 62.4,48.5 62.4,31.2 C62.4,14 48.5,0 31.3,0 C14.1,0.1 0.2,14 0.2,31.2 C0.2,48.4 14.1,62.4 31.3,62.4"
						id="Fill-1"
						fill="#FEF200"
					/>
					<path
						d="M31,63 C48.1,63 62,48.9 62,31.5 C62,14.1 48.1,0 31,0 C13.9,0 0,14.1 0,31.5 C0,48.9 13.9,63 31,63 L31,63 L31,63 L31,63 L31,63 Z"
						id="Stroke-2"
						stroke="#000000"
						strokeWidth="4"
					/>
					<path
						d="M22,45 L28,45 L36.3,24.5 L30.1,24.5 L27.5,31 C26.7,33.1 25.8,35.5 25,37.5 L25,37.5 C24.3,35.4 23.5,33.2 22.7,31 L20.3,24.4 L13.6,24.4 L22,45 L22,45 L22,45 L22,45 L22,45 Z M38.4,45 L44.7,45 L44.7,24.5 L38.4,24.5 L38.4,45 L38.4,45 L38.4,45 L38.4,45 Z"
						id="Fill-4"
						fill="#000000"
					/>
					<polygon
						id="Fill-5"
						fill="#000000"
						points="38.4 21.1 44.7 21.1 44.7 14.8 38.4 14.8"
					/>
				</g>
			</g>
		</svg> */
	),
	category: "embed", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [__("video"), __("story"), __("ad")],
	description: __("Video ad powered by vi intelligence."),
	supports: {
		multiple: false
	},
	attributes: {
		shortcode: {
			type: "string",
			default: "[embed-vi-ad]"
		}
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: class extends Component {
		constructor(props) {
			super(...arguments);
			this.props = props;
		}

		render() {
			if (this.props.attributes.shortcode) {
				return (
					<div className="vi-story-demo--box">
						<div className="vi-story-demo--screen">
							<span>
								VIDEO AD + CONTENT
								{window._EPYT_.vi_active == "1" ? null : (
									<small>
										Note: Ads are currently turned off. <br />
										When you are ready to make ads appear on your website, visit the{" "}
										<a target="_blank" href={window._EPYTA_.admin_url_vi}>
											Monetize
										</a>{" "}
										page to turn ads on.
									</small>
								)}
							</span>
						</div>
						<div
							className="vi-story-demo--info"
							style={{
								backgroundColor: window._EPYTA_.vi_js_settings.backgroundColor
							}}
						>
							<div
								className="vi-story-demo--title"
								style={{
									fontFamily: window._EPYTA_.vi_js_settings.font,
									fontSize: window._EPYTA_.vi_js_settings.fontSize,
									color: window._EPYTA_.vi_js_settings.textColor
								}}
							>
								Example vi Story Title Text
							</div>
							<div
								className="vi-story-demo--featured"
								style={{ color: window._EPYTA_.vi_js_settings.textColor }}
							>
								<span
									style={{ color: window._EPYTA_.vi_js_settings.textColor }}
								>
									featured by
								</span>{" "}
								<img
									alt="vi logo"
									src={window._EPYT_.eppath + "images/vi_logo.svg"}
								/>
							</div>
						</div>
					</div>
				);
			}
			return null;
		}
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: function(props) {
		return <Fragment>{props.attributes.shortcode}</Fragment>;
	}
});
