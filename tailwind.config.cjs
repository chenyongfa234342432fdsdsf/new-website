const plugin = require('tailwindcss/plugin')

/** s3 根路径 */

function getColorConfig(key, color) {
  let result = {}
  // 如果是数组说明是色板，需要格式出每个色版值
  if (Array.isArray(color)) {
    color.forEach(v => {
      result[`${key}_${v}`] = `var(--${key.replace(/_/g, '-')}-${v})`
    })
  } else {
    result[key] = `var(--${key})`
  }
  return result
}

/**
 * 初始化颜色配置
 * brand_color -> var(--brand_color) // 业务场景值
 * yl: [1, 2] -> var(--or_1) / var(--or_2) // 色板
 * @param {*} config
 * @returns
 */
function normalizeColor(config) {
  let result = {}
  Object.keys(config).forEach(key => {
    const color = config[key]
    result = {
      ...result,
      ...getColorConfig(key, color),
    }
  })
  return result
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './renderer/**/*.{js,ts,jsx,tsx,mdx}',
    'node_modules/@ae*/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      zIndex: {
        '-10': -10,
        '-1': -1,
        '0': 0,
        '1': 1,
        '10': 10,
        '20': 20,
        '30': 30,
        '40': 40,
        '50': 50,
        '60': 60,
        '70': 70,
        '80': 80,
        '90': 90,
        '100': 100,
        'auto': 'auto',
      },
      colors: {
        ...normalizeColor({
          br: ['01', '02', '03', '04'],
          bl: ['01', '02', '03', '04', '05', '06', '07'],
          gr: ['01', '02', '03', '04', '05', '06'],
          oc: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
          na: ['01', '02', '03', '04', '05', '06'],
          yl: ['01', '02', '03', '04', '05', '06'],
          rd: ['01', '02', '03', '04', '05', '06'],
          pl: ['01', '02', '03', '04', '05', '06', '07'],
          nc: [
            '01',
            '02',
            '03',
            '04',
            '05',
            '06',
            '07',
            '08',
            '09',
            '10',
            '11',
            '12',
            '13',
            '14',
            '15',
            '16',
            '17',
            '18',
            '19',
            '20',
            '21',
            '22',
            '23',
            '24',
            '25',
            '26',
            '27',
            '28',
            '29',
            '30',
            '31',
            '32',
            '33',
            '34',
          ],
          /* 线条 Line */
          line_color_03: 'line_color_03',
          line_color_02: 'line_color_02',
          line_color_01: 'line_color_01',
          line_color_04: 'line_color_04',

          /* 填充 Icon */
          icon_color: 'icon_color',
          icon_color_01: 'icon_color_01',
          icon_color_02: 'icon_color_02',
          icon_color_03: 'icon_color_03',

          /* 文字 Text */
          text_color_01: 'text_color_01',
          text_color_02: 'text_color_02',
          text_color_03: 'text_color_03',
          text_color_04: 'text_color_04',
          text_color_05: 'text_color_05',
          text_color_06: 'text_color_06',
          text_color_07: 'text_color_07',
          text_contrast_low: 'text_contrast_low',
          text_contrast_high: 'text_contrast_high',
  
          /* 层级用色 Hierarchy */
          card_background_color_02: 'card_background_color_02',
          card_background_color_03: 'card_background_color_03',
          card_background_color_04: 'card_background_color_04',
          bg_sr_color: 'bg_sr_color',
          card_background_color_01: 'card_background_color_01',
          bg_color: 'bg_color',
          bg_color_02: 'bg_color_02',
          bg_color_03: 'bg_color_03',
          bg_button_disabled: 'bg_button_disabled',
          toast_bg_color: 'toast_bg_color',
          card_background_color_05: 'card_background_color_05',

          /* 提示 Tips */
          tips_color: 'tips_color',
          tips_color_hover: 'tips_color_hover',
          tips_color_animate: 'tips_color_animate',
          tips_color_disable: 'tips_color_disable',
          tips_color_special: 'tips_color_special',

          /* toast */
          /* 辅助色 */
          auxiliary_01_color: 'auxiliary_01_color',
          auxiliary_01_color_hover: 'auxiliary_01_color_hover',
          auxiliary_01_color_animate: 'auxiliary_01_color_animate',
          auxiliary_01_color_special: 'auxiliary_01_color_special',
          auxiliary_01_color_disable: 'auxiliary_01_color_disable',
          auxiliary_01_color_light_bg: 'auxiliary_01_color_light_bg',
          auxiliary_01_color_trans_bg: 'auxiliary_01_color_trans_bg',
          auxiliary_02_color: 'auxiliary_02_color',
          auxiliary_02_color_hove: 'auxiliary_02_color_hove',
          auxiliary_02_color_animate: 'auxiliary_02_color_animate',
          auxiliary_02_color_special: 'auxiliary_02_color_special',
          auxiliary_02_color_disable: 'auxiliary_02_color_disable',
          auxiliary_02_color_light_bg: 'auxiliary_02_color_light_bg',
          auxiliary_icon_color_01: 'auxiliary_icon_color_01',
          auxiliary_color_special: 'auxiliary_color_special',
          auxiliary_color_02: 'auxiliary_color_02',
          text_label_color_01: 'text_label_color_01',
          auxiliary_icon_color_02: 'auxiliary_icon_color_02',
          text_label_color_02: 'text_label_color_02',
          auxiliary_color_special_02: 'auxiliary_color_special_02',
          auxiliary_color_special_03: 'auxiliary_color_special_03',

          /* 按钮色 */
          button_color_02: 'button_color_02',
          button_color_hover_02: 'button_color_hover_02',
          button_color_animate_02: 'button_color_animate_02',
          button_color_special_02: 'button_color_special_02',
          bg_button_disabled: 'bg_button_disabled',
          button_color_buy_up: 'button_color_buy_up',
          button_color_sell_down: 'button_color_sell_down',
          button_color_02_trans_bg: 'button_color_02_trans_bg',

          /* 文字色 */
          text_color_01: 'text_color_01',
          text_color_02: 'text_color_02',
          text_color_03: 'text_color_03',
          text_color_04: 'text_color_04',
          text_color_05: 'text_color_05',
          text_color_06: 'text_color_06',
          text_color_07: 'text_color_07',

          /* 背景色 */
          bg_color: 'bg_color',
          card_background_color: 'card_background_color',
          card_background_color_01: 'card_background_color_01',
          card_background_color_03: 'card_background_color_03',
          card_background_color_04: 'card_background_color_04',
          card_background_color_05: 'card_background_color_05',
        
        }),
      },

      screens: {
        // 和 configResponsive 保持一致
        xs: '0px',
        sm: '375px',
        md: '1000px',
        lg: '1200px',
        xl: '1440px',
        xxl: '1850px',
        xxxl: '2560px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    plugin(function ({ addBase, addComponents, addUtilities, theme }) {
      addComponents({
      })
    }),
    plugin(function ({ addBase, addComponents, addUtilities, theme }) {
      // 渐变边框需要单独的背景色配置
      const colors = theme('colors')
      const brandBgUtilities = Object.keys(colors).reduce((acc, color) => {
        acc[`.brand-border-bg-color-${color}`] = {
          '--brand-border-bg-color': `var(--${color})`,
        }
        return acc
      }, {})
      addUtilities(brandBgUtilities)
      addComponents({
        '.border-brand_color': {
          backgroundImage: `linear-gradient(to right, var(--brand-border-bg-color, var(--card_background_color)), var(--brand-border-bg-color, var(--card_background_color))), linear-gradient(to right, var(--brand_color_start), var(--brand_color_end))`,
          backgroundClip: `padding-box, border-box`,
          backgroundOrigin: `padding-box, border-box`,
          border: `1px solid transparent`,
        },
      })
    }),
    plugin(function ({ addVariant }) {
      // 添加 press-active 变体
      addVariant('press-active', '&.ae-press-active')
      // 添加 zh 变体，效果为 zh:text-xl 变为 lang*=zh .zh:text-xl {}
      addVariant('zh', ({ modifySelectors, separator }) => {
        modifySelectors(({ selector }) => {
          return `html[lang*=zh] &`;
        });
      })
    }),
  ],
}
