/** 
 * MODDED BY STANLEY LIM 3/24
 */

const backgroundColor = '#002b36'
const foregroundColor = '#839496'
const cursorColor = 'rgba(181, 137, 0, 0.6)'
const borderColor = 'transparent'

const colors = {
  lightBlack:     '#586e75',
  black:          '#073642',
  lightGreen:     '#ffd454',
  lightYellow:    '#657b83',
  lightBlue:      '#839496',
  lightCyan:      '#285151',
  white:          '#59450b',
  lightWhite:     '#59450b',
  yellow:         '#b58900',
  lightRed:       '#cb4b16',
  red:            '#dc322f',
  magenta:        '#d33682',
  lightMagenta:   '#6c71c4',
  blue:           '#268bd2',
  cyan:           '#2aa198',
  green:          '#d7ef39'
}



exports.decorateConfig = config => {

  return Object.assign({}, config, {
    foregroundColor,
    backgroundColor,
    borderColor,
    cursorColor,
    colors,
    termCSS: `
      ${config.termCSS || ''}
    `,
    css: `
      ${config.css || ''}
      * {
      	text-rendering: optimizeLegibility;
        font-weight: 500;
      }
      .tabs_list {
      	border: 0;
      }
      .tabs_nav {
      	background-color: #001f27;
      }
      .tab_tab {
        color: ${foregroundColor};
        background-color: #001f27;
				border-color: ${borderColor};
      }
      .tab_tab:before {
      	border: 0;
      }
      .tab_tab.tab_active {
        border: transparent;
        font-weight: bold;
        color: #b3b3b3;
        background-color: ${backgroundColor};
      }
      .splitpane_divider {
      	background-color: #001f27;
      }
    `
  })
}
