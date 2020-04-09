import React from 'react'
import { Global, css } from '@emotion/core'

import './sanitize.css'
import '../fonts/index.css'

const GlobalStyles = ({ theme }) => (
  <Global
    styles={
      css`
        body,
        html,
        #root {
          margin: 0;
          padding: 0;
          width: 100%;
          font-size: 16px;
          height: 100vh;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          color: #333;
        }

        html {
          width: 100vw;
          overflow-x: hidden;
        }

        #root {
          align-items: stretch;
        }

        body {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          font-variant-numeric: tabular-nums;
          overscroll-behavior: none;
        }

        input,
        button {
          font-family: Montserrat, sans-serif;
          margin: 0;
          padding: 0;
        }

        * {
          box-sizing: border-box;
          font-family: Montserrat, sans-serif;
        }
      `
    }
  />
)

export default GlobalStyles
