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
    plugin(function ({ addComponents }) {
      addComponents({
      })
    }),
  ],
}
