(function () {
  'use strict';

  /*
    a SASS-like object that will be converted into a stylesheet
  */

  const rules = {
    '*': {
      'box-sizing': 'border-box',
    },
    body: {
      margin: '0',
      padding: '0',
      'font-family':
        '"Helvetica Neue", Helvetica, "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", メイリオ, Meiryo, "ＭＳ Ｐゴシック", arial, sans-serif',
      // wherever %prefix% appears, something like moz- or webkit- will be substituted by the build
      '%prefix%font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
      '._bg': {
        display: 'none',
        top: '0',
        left: '0',
        height: '100vh',
        width: '100vw',
        background: 'transparent',
        '._me': {
          position: 'absolute',
          '._boardPickerOpener': {
            display: 'flex',
            height: '40px',
            width: '236px',
            'box-shadow': '0px 0px 10px -8px #000000',
            position: 'absolute',
            '._boardPickerOpenerContainer': {
              display: 'grid',
              position: 'relative',
              // leave room for Pinterest logo to the left
              padding: '7px 0 7px 35px',
              'border-radius': '8px 0 0 8px',
              flex: '1 1 auto',
              background:
                'url(data:image/svg+xml;base64,PHN2ZyBpZD0ic291cmNlIiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iOCIgY3k9IjgiIHI9IjgiIGZpbGw9IndoaXRlIj48L2NpcmNsZT4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0wIDhDMCAxMS40MTUzIDIuMTQwNjcgMTQuMzMxMyA1LjE1MzMzIDE1LjQ3ODdDNS4wOCAxNC44NTQgNS4wMDIgMTMuODI0IDUuMTcgMTMuMTAxM0M1LjMxNDY3IDEyLjQ4IDYuMTA0IDkuMTQyNjcgNi4xMDQgOS4xNDI2N0M2LjEwNCA5LjE0MjY3IDUuODY2IDguNjY2IDUuODY2IDcuOTZDNS44NjYgNi44NTMzMyA2LjUwNzMzIDYuMDI2NjcgNy4zMDY2NyA2LjAyNjY3QzcuOTg2NjcgNi4wMjY2NyA4LjMxNDY3IDYuNTM2NjcgOC4zMTQ2NyA3LjE0OEM4LjMxNDY3IDcuODMxMzMgNy44NzkzMyA4Ljg1MjY3IDcuNjU0NjcgOS44QzcuNDY3MzMgMTAuNTkyNyA4LjA1MjY3IDExLjIzOTMgOC44MzQgMTEuMjM5M0MxMC4yNDkzIDExLjIzOTMgMTEuMzM4IDkuNzQ2NjcgMTEuMzM4IDcuNTkyQzExLjMzOCA1LjY4NDY3IDkuOTY3MzMgNC4zNTIgOC4wMTA2NyA0LjM1MkM1Ljc0NTMzIDQuMzUyIDQuNDE1MzMgNi4wNTEzMyA0LjQxNTMzIDcuODA4QzQuNDE1MzMgOC40OTI2NyA0LjY3ODY3IDkuMjI2IDUuMDA4IDkuNjI1MzNDNS4wNzI2NyA5LjcwNDY3IDUuMDgyNjcgOS43NzMzMyA1LjA2MzMzIDkuODU0QzUuMDAyNjcgMTAuMTA2IDQuODY4IDEwLjY0NjcgNC44NDIgMTAuNzU3M0M0LjgwNjY3IDEwLjkwMjcgNC43MjY2NyAxMC45MzQgNC41NzUzMyAxMC44NjMzQzMuNTgwNjcgMTAuNDAwNyAyLjk1OTMzIDguOTQ2NjcgMi45NTkzMyA3Ljc3ODY3QzIuOTU5MzMgNS4yNjYgNC43ODQgMi45NTkzMyA4LjIyMDY3IDIuOTU5MzNDMTAuOTgzMyAyLjk1OTMzIDEzLjEzMDcgNC45MjggMTMuMTMwNyA3LjU1ODY3QzEzLjEzMDcgMTAuMzAzMyAxMS40MDA3IDEyLjUxMjcgOC45OTggMTIuNTEyN0M4LjE5MDY3IDEyLjUxMjcgNy40MzI2NyAxMi4wOTI3IDcuMTcyNjcgMTEuNTk3M0M3LjE3MjY3IDExLjU5NzMgNi43NzMzMyAxMy4xMTg3IDYuNjc2NjcgMTMuNDkwN0M2LjQ4ODY3IDE0LjIxMzMgNS45NjczMyAxNS4xMjggNS42NDQgMTUuNjQ3M0M2LjM4OTMzIDE1Ljg3NjcgNy4xOCAxNiA4IDE2QzEyLjQxOCAxNiAxNiAxMi40MTggMTYgOEMxNiAzLjU4MiAxMi40MTggMCA4IDBDMy41ODIgMCAwIDMuNTgyIDAgOFoiIGZpbGw9IiNFNjAwMjMiPjwvcGF0aD4KPC9zdmc+) 10px 50% no-repeat, url(data:image/svg+xml;base64,PHN2ZyBpZD0ic291cmNlIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik04LjM5OTk4IDIuNzcxMjVMNC45OTk5OCA2LjEyOTU4TDEuNjAwODIgMi43NzEyNUMxLjIzNDE1IDIuNDA5NTggMC42NDA4MTUgMi40MDk1OCAwLjI3NDU2NSAyLjc3MTI1Qy0wLjA5MTY4NDYgMy4xMzI1IC0wLjA5MTY4NDYgMy43MiAwLjI3NDU2NSA0LjA4MTY3TDQuOTk5OTggOC43NUw5LjcyNTQgNC4wODE2N0M5LjkwODMxIDMuOTAwNDIgOS45OTk5OCAzLjY2MjkyIDkuOTk5OTggMy40MjYyNUM5Ljk5OTk4IDMuMTg5MTcgOS45MDgzMSAyLjk1MjA4IDkuNzI1NCAyLjc3MTI1QzkuNTQyNDggMi41OTA0MiA5LjMwMjQ4IDIuNSA5LjA2MjQ4IDIuNUM4LjgyMjQ4IDIuNSA4LjU4MjkgMi41OTA0MiA4LjM5OTk4IDIuNzcxMjVaIiBmaWxsPSIjNzY3Njc2Ij48L3BhdGg+Cjwvc3ZnPg==) 95% 50% no-repeat',
              'background-color': '#fff',
              'background-size': '16px 16px, 10px 10px',
              // Save to board
              '._boardPickerOpenerLabel': {
                display: 'block',
                'font-size': '10px',
                'line-height': '12px',
              },
              '._boardPickerOpenerCurrent': {
                display: 'block',
                'white-space': 'nowrap',
                'text-overflow': 'ellipsis',
                overflow: 'hidden',
                'font-weight': 'bold',
                'font-size': '12px',
                'padding-right': '20px',
              },
            },
            '._saveAction': {
              cursor: 'pointer',
              'min-width': '58px',
              padding: '0px 5px',
              flex: '0 0 auto',
              height: '40px',
              'border-radius': '0 8px 8px 0',
              background: '#e60023',
              color: '#fff',
              font: '12px/40px "Helvetica Neue", Helvetica, sans-serif',
              'font-weight': 'bold',
              'text-align': 'center',
              '&:hover': {
                background: '#e60023 linear-gradient(rgba(0,0,0,0.06), rgba(0,0,0,0.06))',
              },
              '&._working': {
                background:
                  'linear-gradient(rgba(0,0,0,0.06), rgba(0,0,0,0.06)), url(data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIAoJeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiAKCXhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiAKCWhlaWdodD0iMzIiCgl3aWR0aD0iMzIiCgl2aWV3Qm94PSIwIDAgMTYgMTYiIAoJeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+Cgk8cGF0aCBmaWxsPSIjZmZmIiBkPSIKICAJTSA4LCAwCiAgICBBIC41LCAuNSwgMCwgMCwgMCwgOCwgMQogICAgQSA2LCA3LCAwLCAwLCAxLCAxNCwgOAogICAgQSA2LCA2LCAwLCAwLCAxLCA4LCAxNAogICAgQSA1LCA2LCAwLCAwLCAxLCAzLCA4CiAgICBBIDEsIDEsIDAsIDAsIDAsIDAsIDgKICAgIEEgOCwgOCwgMCwgMCwgMCwgOCwgMTYKICAgIEEgOCwgOCwgMCwgMCwgMCwgMTYsIDgKICAgIEEgOCwgOCwgMCwgMCwgMCwgOCwgMAogICAgWiIgPgogICAgPGFuaW1hdGVUcmFuc2Zvcm0KCQkJYXR0cmlidXRlVHlwZT0ieG1sIgoJCQlhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iCgkJCXR5cGU9InJvdGF0ZSIKCQkJZnJvbT0iMCA4IDgiCgkJCXRvPSIzNjAgOCA4IgoJCQlkdXI9IjAuNnMiCgkJCXJlcGVhdENvdW50PSJpbmRlZmluaXRlIgoJCS8+Cgk8L3BhdGg+Cjwvc3ZnPgo=) 50% 50% no-repeat',
                'background-color': '#e60023',
                'background-size': '18px 18px',
                color: 'transparent',
              },
              '&._done': {
                // background image is white checkbox
                background:
                  'linear-gradient(rgba(0,0,0,0.06), rgba(0,0,0,0.06)), url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIxN3B4IiBoZWlnaHQ9IjEzcHgiIHZpZXdCb3g9IjAgMCAxNyAxMyIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48Zz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMyw0TDcsOEwxNCwxQTEsMSAwIDAgMSAxNiwzTDcsMTJMMSw2QTEsMSAwIDAgMSAzLDRaIi8+PC9nPjwvc3ZnPg==) 50% 50% no-repeat',
                'background-color': '#e60023',
                'background-size': '18px 18px',
                color: 'transparent',
              },
            },
            '._afterSave': {
              'border-radius': '8px',
              cursor: 'pointer',
              'min-width': '45px',
              padding: '0px 5px',
              height: '28px',
              'border-radius': '14px',
              margin: '6px 6px 6px 0',
              background: '#EFEFEF url() 50% 50% no-repeat',
              color: '#000',
              font: '12px/28px "Helvetica Neue", Helvetica, sans-serif',
              'font-weight': 'bold',
              'text-align': 'center',
              'white-space': 'nowrap',
              flex: '0 0 auto',
              display: 'none',
              '&:hover': {
                background: '#EFEFEF linear-gradient(rgba(0,0,0,0.06),rgba(0,0,0,0.06))',
              },
            },
            '&._feedback': {
              'background-color': '#fff',
              'border-radius': '8px',
              '._boardPickerOpenerContainer': {
                background:
                  '#fff url(data:image/svg+xml;base64,PHN2ZyBpZD0ic291cmNlIiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik04IDBDMy41ODE3MiAwIDAgMy41ODE3MiAwIDhDMCAxMi40MTgzIDMuNTgxNzIgMTYgOCAxNkMxMi40MTgzIDE2IDE2IDEyLjQxODMgMTYgOEMxNiAzLjU4MTcyIDEyLjQxODMgMCA4IDBaTTQuMjQ0IDguOTE2TDcgMTEuNjY2N0wxMS43NTYgNi45MTk2N0MxMi4wODEzIDYuNTk1IDEyLjA4MTMgNi4wNjgzNCAxMS43NTYgNS43NDM2N0MxMS40MzA3IDUuNDE4NjcgMTAuOTAyNyA1LjQxODY3IDEwLjU3NzMgNS43NDM2N0w3IDkuMzE0TDUuNDIyNjcgNy43Mzk2N0M1LjA5NzMzIDcuNDE1IDQuNTY5MzMgNy40MTUgNC4yNDQgNy43Mzk2N0MzLjkxODY3IDguMDY0NjcgMy45MTg2NyA4LjU5MTM0IDQuMjQ0IDguOTE2WiIgZmlsbD0iI0U2MDAyMyI+PC9wYXRoPgo8L3N2Zz4=) 10px 50% no-repeat',
              },
              '._boardPickerOpenerCurrent': {
                'padding-right': '0px',
              },
              '._saveAction': {
                display: 'none',
              },
              '._afterSave': {
                display: 'block',
              },
              '._mask': {
                cursor: 'default',
                '&:hover': {
                  background: 'transparent',
                },
              },
            },
            '&._fail': {
              background: '#fff linear-gradient(rgba(255,0,0,0.08), rgba(255,0,0,0.08))',
              '._boardPickerOpenerContainer': {
                background:
                  'url(data:image/svg+xml;base64,PHN2ZyBpZD0ic291cmNlIiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE1LjQxNDYgNi41ODI0NUw5LjQxNzU1IDAuNTg1MzY2QzguNjM3MDYgLTAuMTk1MTIyIDcuMzYyOTMgLTAuMTk1MTIyIDYuNTgyNDUgMC41ODUzNjZMMC41ODUzNjYgNi41ODI0NUMtMC4xOTUxMjIgNy4zNjI5NCAtMC4xOTUxMjIgOC42MzcwNiAwLjU4NTM2NiA5LjQxNzU1TDYuNTgyNDUgMTUuNDE0NkM3LjM2MjkzIDE2LjE5NTEgOC42MzcwNiAxNi4xOTUxIDkuNDE3NTUgMTUuNDE0NkwxNS40MTQ2IDkuNDE3NTVDMTYuMTk1MSA4LjYzNzA2IDE2LjE5NTEgNy4zNjk2MSAxNS40MTQ2IDYuNTgyNDVaTTcuOTk2NjYgMTIuNjcyOUM3LjQyMjk3IDEyLjY3MjkgNi45NTYwMSAxMi4yMDYgNi45NTYwMSAxMS42MzIzQzYuOTU2MDEgMTEuMDU4NiA3LjQyMjk3IDEwLjU5MTYgNy45OTY2NiAxMC41OTE2QzguNTcwMzUgMTAuNTkxNiA5LjAzNzMxIDExLjA1ODYgOS4wMzczMSAxMS42MzIzQzkuMDM3MzEgMTIuMjA2IDguNTcwMzUgMTIuNjcyOSA3Ljk5NjY2IDEyLjY3MjlaTTkuMDM3MzEgOC41MjM2NkM5LjAzNzMxIDkuMDk3MzUgOC41NzAzNSA5LjU2NDMxIDcuOTk2NjYgOS41NjQzMUM3LjQyMjk3IDkuNTY0MzEgNi45NTYwMSA5LjA5NzM1IDYuOTU2MDEgOC41MjM2NlY0LjM2NzczQzYuOTU2MDEgMy43OTQwNCA3LjQyMjk3IDMuMzI3MDggNy45OTY2NiAzLjMyNzA4QzguNTcwMzUgMy4zMjcwOCA5LjAzNzMxIDMuNzk0MDQgOS4wMzczMSA0LjM2NzczVjguNTIzNjZaIiBmaWxsPSIjRTYwMDIzIj48L3BhdGg+Cjwvc3ZnPg==) 10px 50% no-repeat',
              },
              '._afterSave': {
                background: '#e60023 url() 50% 50% no-repeat',
                color: '#fff',
                '&:hover': {
                  background: '#e60023 linear-gradient(rgba(0,0,0,0.06),rgba(0,0,0,0.06))',
                },
              },
            },
          },
          // click collector
          '._mask': {
            position: 'absolute',
            top: '0',
            left: '0',
            bottom: '0',
            right: '0',
            height: '100%',
            width: 'auto',
            cursor: 'pointer',
            'border-radius': '8px 0px 0px 8px',
            '&:hover': {
              background: 'linear-gradient(rgba(0,0,0,0.03), rgba(0,0,0,0.03))',
            },
          },
        },
        '._boardPicker': {
          display: 'none',
          overflow: 'hidden',
          position: 'absolute',
          height: '500px',
          width: '360px',
          background: '#fff',
          'box-shadow': '0 0 8px rgba(0, 0, 0, .1)',
          'border-radius': '16px',
          color: '#444',
          '._boardPickerHead': {
            display: 'block',
            height: '128px',
            width: 'inherit',
            '._boardPickerHeadLine': {
              display: 'block',
              height: '64px',
              'line-height': '64px',
              'text-align': 'center',
              'font-size': '16px',
              'font-weight': 'bolder',
            },
            // back-arrow when we're in the image picker
            '._boardPickerHide': {
              position: 'absolute',
              top: '0',
              left: '0',
              height: '64px',
              width: '64px',
              cursor: 'pointer',
              'background-size': '25px 25px',
              background:
                'transparent url(data:image/svg+xml;base64,CjxzdmcgdmVyc2lvbj0iMS4xIiBoZWlnaHQ9IjE2IiB3aWR0aD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PHBhdGggZmlsbD0iIzAwMCIgZD0iTTIuNSA4LjAwMWw3Ljg0IDcuNDgxYTEuOTE0IDEuOTE0IDAgMCAwIDIuNjE4LjAwMyAxLjcwNSAxLjcwNSAwIDAgMC0uMDA0LTIuNDk3TDcuNzMgOC4wMDFsNS4yMjUtNC45ODZjLjcyNC0uNjkuNzI2LTEuODA5LjAwNC0yLjQ5N2ExLjkxIDEuOTEgMCAwIDAtMi42MTkuMDAzTDIuNSA4LjAwMXoiPjwvcGF0aD48L3N2Zz4K) 50% 50% no-repeat',
            },
            '._boardPickerHeadNav': {
              position: 'absolute',
              top: '0',
              left: '0',
              height: '64px',
              width: '64px',
              cursor: 'pointer',
              'background-size': '25px 25px',
              // background defaults to X for 'cancel'
              background:
                'transparent url(data:image/svg+xml;base64,CjxzdmcgdmVyc2lvbj0iMS4xIiBoZWlnaHQ9IjE2IiB3aWR0aD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CjxwYXRoIGZpbGw9IiMwMDAiIGQ9Ik04IDUuNTA2TDMuMDE1LjUyQTEuNzY1IDEuNzY1IDAgMSAwIC41MjEgMy4wMTVMNS41MDYgOCAuNTIgMTIuOTg1QTEuNzY1IDEuNzY1IDAgMCAwIDEuNzY2IDE2YTEuNzYgMS43NiAwIDAgMCAxLjI0OC0uNTJMOCAxMC40OTNsNC45ODUgNC45ODVhMS43NjcgMS43NjcgMCAwIDAgMi40OTguMDA0IDEuNzYyIDEuNzYyIDAgMCAwLS4wMDQtMi40OThMMTAuNDk0IDhsNC45ODUtNC45ODVhMS43NjcgMS43NjcgMCAwIDAgLjAwNC0yLjQ5OCAxLjc2MiAxLjc2MiAwIDAgMC0yLjQ5OC4wMDRMOCA1LjUwNnoiPjwvcGF0aD4KPC9zdmc+) 50% 50% no-repeat',
              // change background to < for 'back'
              '&._back': {
                'background-image':
                  'url(data:image/svg+xml;base64,CjxzdmcgdmVyc2lvbj0iMS4xIiBoZWlnaHQ9IjE2IiB3aWR0aD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PHBhdGggZmlsbD0iIzAwMCIgZD0iTTIuNSA4LjAwMWw3Ljg0IDcuNDgxYTEuOTE0IDEuOTE0IDAgMCAwIDIuNjE4LjAwMyAxLjcwNSAxLjcwNSAwIDAgMC0uMDA0LTIuNDk3TDcuNzMgOC4wMDFsNS4yMjUtNC45ODZjLjcyNC0uNjkuNzI2LTEuODA5LjAwNC0yLjQ5N2ExLjkxIDEuOTEgMCAwIDAtMi42MTkuMDAzTDIuNSA4LjAwMXoiPjwvcGF0aD48L3N2Zz4K)',
              },
            },
            '._boardPickerInputBar': {
              display: 'block',
              height: '64px',
              background: '#fff',
              position: 'relative',
              '._boardPickerInput': {
                position: 'absolute',
                top: '0',
                left: '16px',
                height: '48px',
                width: '330px',
                border: '2px solid #efefef',
                'font-size': '16px',
                'text-indent': '40px',
                'border-radius': '24px',
                outline: 'none',
                background: 'transparent url() 16px 50% no-repeat',
                'background-size': '16px 16px',
                // magnifying glass
                'background-image':
                  'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTAgMTZhNiA2IDAgMSAxIC4wMS0xMi4wMUE2IDYgMCAwIDEgMTAgMTZtMTMuMTIgMi44OGwtNC4yNi00LjI2YTEwIDEwIDAgMSAwLTQuMjQgNC4yNGw0LjI2IDQuMjZhMyAzIDAgMSAwIDQuMjQtNC4yNCIgZmlsbD0iIzhlOGU4ZSIvPjwvc3ZnPg==)',
              },
            },
          },
          '._boardPickerBoards': {
            display: 'block',
            height: '292px',
            width: 'inherit',
            overflow: 'auto',
          },
          '._boardPickerSections': {
            display: 'block',
            height: '292px',
            width: 'inherit',
            overflow: 'auto',
          },
          '._boardPickerFoot': {
            height: '80px',
            width: 'inherit',
            position: 'absolute',
            bottom: '0',
            'line-height': '80px',
            '._plusIcon': {
              position: 'absolute',
              top: '16px',
              left: '16px',
              height: '48px',
              width: '48px',
              'border-radius': '8px',
              'background-image':
                'url(data:image/svg+xml;base64,Cjxzdmcgd2lkdGg9IjMycHgiIGhlaWdodD0iMzJweCIgdmlld0JveD0iMCAwIDI0IDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogIDxwYXRoIGQ9Ik0yMiAxMGgtOFYyYTIgMiAwIDAgMC00IDB2OEgyYTIgMiAwIDAgMCAwIDRoOHY4YTIgMiAwIDAgMCA0IDB2LThoOGEyIDIgMCAwIDAgMC00Ij48L3BhdGg+Cjwvc3ZnPgoKCgoK)',
              'background-color': '#efefef',
              'background-position': '50% 50%',
              'background-repeat': 'no-repeat',
              'background-size': '24px 24px',
            },
            '._boardPickerSlugLine': {
              height: 'inherit',
              display: 'inherit',
              'font-size': '16px',
              'font-weight': 'bolder',
              'text-indent': '80px',
              width: '340px',
              overflow: 'hidden',
              'text-overflow': 'ellipsis',
              'white-space': 'nowrap',
              'line-height': 'inherit',
            },
            '._mask': {
              cursor: 'pointer',
              position: 'absolute',
              height: '100%',
              width: '100%',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            },
          },
          '._boardPickerCreate': {
            display: 'none',
            height: '372px',
            width: 'inherit',
            '._boardPickerCreateBody': {
              // secret toggle in here
              '._boardPickerCreateSecretLabel': {
                display: 'block',
                cursor: 'pointer',
                'font-size': '12px',
                padding: '8px 16px',
              },
            },
            '._boardPickerCreateFoot': {
              position: 'absolute',
              bottom: '0',
              left: '0',
              height: '80px',
              width: 'inherit',
              '._boardPickerCreateCancel': {
                position: 'absolute',
                left: '8px',
              },
              '._boardPickerCreateGo': {
                // need to set display here because save buttons default to display: none
                display: 'block',
                position: 'absolute',
                right: '8px',
              },
            },
            '&._modeSection': {
              '._boardPickerCreateBody': {
                '._boardPickerCreateSecretLabel': {
                  display: 'none',
                },
              },
            },
          },
          '._divider': {
            display: 'block',
            height: '30px',
            padding: '8px 16px',
            'font-size': '12px',
          },
          '._item': {
            display: 'flex',
            height: '64px',
            width: '344px',
            margin: '8px',
            // fix horizontal scrollbar on Windows
            overflow: 'hidden',
            position: 'relative',
            'font-size': '16px',
            'border-radius': '8px',
            '&:hover': {
              background: 'rgba(0,0,0,.06)',
              // show save button
              '._save': {
                display: 'block',
              },
              // hide helpers
              '._helpers': {
                display: 'none',
              },
            },
            // if the item has a section, don't show Save button and keep helpers visible
            '&._hazSection': {
              '&:hover': {
                // hide save button
                '._save': {
                  display: 'none',
                },
                // show helpers
                '._helpers': {
                  display: 'block',
                },
              },
            },
            '._cover': {
              background: '#555 url() 50% 50% no-repeat',
              'background-size': 'cover',
              height: '48px',
              width: '48px',
              margin: '8px',
              'min-width': '48px',
              'border-radius': '8px',
              'box-shadow': '0 0 1px #eee inset',
            },
            '._info': {
              height: '48px',
              width: '272px',
              overflow: 'hidden',
              margin: '8px 0',
              'font-weight': 'bold',
              'text-overflow': 'ellipsis',
              'white-space': 'nowrap',
              'line-height': '48px',
              '&._isSectionName': {
                'padding-left': '8px',
                width: '340px',
              },
            },
            '._helpers': {
              display: 'block',
              'white-space': 'nowrap',
              span: {
                background: 'transparent url() 50% 50% no-repeat',
                height: '64px',
                width: '24px',
                display: 'inline-block',
              },
              // collaborative board
              '._collaborative': {
                'background-image':
                  'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgdmVyc2lvbj0iMS4xIiBoZWlnaHQ9IjE0IiB3aWR0aD0iMTQiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PHBhdGggZmlsbD0iIzg4OCIgZD0iTTkuMTQzIDEwLjJBNCA0IDAgMCAxIDE2IDEzdjFIMHYtMWE1IDUgMCAwIDEgOS4xNDMtMi44ek0xMiA4YTIgMiAwIDEgMCAuMDktMy45OTlBMiAyIDAgMCAwIDEyIDh6TTUgN2EyLjUgMi41IDAgMSAwIDAtNSAyLjUgMi41IDAgMCAwIDAgNXoiPjwvcGF0aD48L3N2Zz4=)',
              },
              // secret board
              '._secret': {
                'background-image':
                  'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgdmVyc2lvbj0iMS4xIiBoZWlnaHQ9IjE0IiB3aWR0aD0iMTQiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PHBhdGggZmlsbD0iIzg4OCIgZD0iTTEyLjggNi43OTFoLS4wNFY0LjU2NkMxMi43NiAyLjA0OCAxMC42MjUgMCA4IDBTMy4yNCAyLjA0OCAzLjI0IDQuNTY2djIuMjI1SDMuMmMtLjc3Ny45ODQtMS4yIDIuMi0xLjIgMy40NTRDMiAxMy40MjMgNC42ODYgMTYgOCAxNnM2LTIuNTc3IDYtNS43NTVjMC0xLjI1My0uNDIzLTIuNDctMS4yLTMuNDU0em0tMi4zNiAwSDUuNTZWNC41NjZjMC0xLjI5IDEuMDk1LTIuMzQgMi40NC0yLjM0czIuNDQgMS4wNSAyLjQ0IDIuMzR2Mi4yMjV6Ij48L3BhdGg+PC9zdmc+)',
              },
              // board has sections
              '._opener': {
                'background-image':
                  'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgdmVyc2lvbj0iMS4xIiBoZWlnaHQ9IjE2IiB3aWR0aD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PHBhdGggZmlsbD0iIzg4OCIgZD0iTTEzLjUgOGwtNy44NCA3LjQ4MWExLjkxNCAxLjkxNCAwIDAgMS0yLjYxOC4wMDMgMS43MDUgMS43MDUgMCAwIDEgLjAwNC0yLjQ5N0w4LjI3IDggMy4wNDYgMy4wMTVBMS43MDkgMS43MDkgMCAwIDEgMy4wNDIuNTE4IDEuOTEgMS45MSAwIDAgMSA1LjY2LjUyTDEzLjUgOHoiLz48L3N2Zz4=)',
              },
            },
            '._mask': {
              cursor: 'pointer',
              position: 'absolute',
              height: '100%',
              width: '100%',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            },
          },
          // yes/no toggle with sliding knob
          'input[type=checkbox]': {
            display: 'block',
            height: '1px',
            margin: '8px',
            padding: '0',
            opacity: '.01',
            '&:checked': {
              '~ ._toggle': {
                background: '#e60023',
                '._knob': {
                  float: 'right',
                },
                '._optYes': {
                  display: 'block',
                },
                '._optNo': {
                  display: 'none',
                },
              },
            },
          },
          '._toggle': {
            cursor: 'pointer',
            display: 'inline-block',
            padding: '0 0 16px',
            background: '#f8f8f8',
            'border-radius': '16px',
            border: '1px solid #eee',
            height: '32px',
            '._knob': {
              display: 'inline-block',
              margin: '0',
              padding: '0',
              background: '#fff',
              'border-radius': '16px',
              'box-shadow': '0 0 1px #eee',
              width: '30px',
              height: '30px',
            },
            '._optNo, ._optYes': {
              display: 'inline-block',
              'line-height': '30px',
              padding: '0 10px',
              'font-weight': 'bold',
            },
            '._optNo': {
              color: '#000',
              float: 'right',
            },
            '._optYes': {
              color: '#fff',
              float: 'left',
              display: 'none',
            },
          },
          '&._hazCreate': {
            '._boardPickerInputBar': {
              '._boardPickerInput': {
                // plus-sign
                'background-image':
                  'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgPHBhdGggZD0iTTIyIDEwaC04VjJhMiAyIDAgMCAwLTQgMHY4SDJhMiAyIDAgMCAwIDAgNGg4djhhMiAyIDAgMCAwIDQgMHYtOGg4YTIgMiAwIDAgMCAwLTQiIGZpbGw9IiM4ZThlOGUiPjwvcGF0aD4KPC9zdmc+)',
              },
            },
            '._boardPickerCreate': {
              display: 'block',
            },
            '._boardPickerChoose': {
              display: 'none',
            },
          },
          // fix up height, positioning, and shadow if we were opened from inside the image picker
          '&._fromImagePicker': {
            'box-shadow': 'none',
            height: '590px',
            '._boardPickerBoards': {
              height: '380px',
            },
            '._boardPickerSections': {
              height: '380px',
            },
            '._boardPickerHead': {
              // hide the X
              '._boardPickerHeadNav': {
                display: 'none',
                // show the back-arrow
                '&._back': {
                  display: 'block',
                },
              },
            },
          },
          '&._fromSearch': {
            top: '15px',
            right: '400px',
            '._boardPickerHead': {
              // hide the X
              '._boardPickerHeadNav': {
                // show the back-arrow
                '&._back': {
                  display: 'block',
                },
              },
            },
          },
        },
        '._boardPickerMask': {
          display: 'none',
          top: '0',
          left: '0',
          height: '100vh',
          width: '100vw',
          background: 'transparent',
        },
        '._imagePicker': {
          display: 'none',
          position: 'absolute',
          top: '15px',
          right: '20px',
          height: '640px',
          width: '360px',
          background: '#fff',
          'box-shadow': '0px 0px 8px rgba(0, 0, 0, 0.3)',
          'border-radius': '16px',
          overflow: 'hidden',
          color: '#444',
          '._imagePickerHead': {
            display: 'block',
            height: '88px',
            '._default': {
              'text-align': 'center',
              'padding-top': '10px',
              '._imagePickerHeadMainCaption': {
                display: 'block',
                'font-size': '20px',
                'font-weight': 'bold',
              },
              ',_imagePickerHeadSubCaption': {
                display: 'block',
                'font-size': '16px',
              },
            },
            '._preview': {
              display: 'none',
              height: '72px',
              overflow: 'auto hidden',
              'padding-top': '8px',
              'white-space': 'nowrap',
              '._thumb': {
                'border-radius': '8px',
                margin: '0 0 0 8px',
                display: 'inline-block',
                height: '64px',
                width: '48px',
                background: 'transparent url() 50% 50% no-repeat',
                'background-size': 'cover',
              },
            },
            '&._hazImages': {
              '._default': {
                display: 'none',
              },
              '._preview': {
                display: 'block',
              },
            },
          },
          '._imagePickerBody': {
            display: 'block',
            height: '580px',
            overflow: 'auto',
            '._grid': {
              display: 'block',
              // 80px bottom margin ensures that the footer will always show
              'margin-bottom': '80px',
              // don't wrap column below if we have a scrollbar
              'white-space': 'nowrap',
              '._col': {
                display: 'inline-block',
                width: '115px',
                padding: '0 6px',
                'vertical-align': 'top',
                '._thumb': {
                  'border-radius': '16px',
                  margin: '0 0 8px 0',
                  display: 'block',
                  width: '109px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  position: 'relative',
                  '._mask': {
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    bottom: '0',
                    right: '0',
                    'border-radius': '16px',
                    '&._selected': {
                      border: '2px solid black',
                    },
                    '&._selected:before': {
                      content: '""',
                      position: 'absolute',
                      bottom: '6px',
                      right: '6px',
                      height: '24px',
                      width: '24px',
                      'border-radius': '8px',
                      // white checkbox
                      background:
                        '#000 url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIxN3B4IiBoZWlnaHQ9IjEzcHgiIHZpZXdCb3g9IjAgMCAxNyAxMyIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48Zz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMyw0TDcsOEwxNCwxQTEsMSAwIDAgMSAxNiwzTDcsMTJMMSw2QTEsMSAwIDAgMSAzLDRaIi8+PC9nPjwvc3ZnPg==) 50% 50% no-repeat',
                      'background-size': '12px 12px',
                    },
                    '&._selected:after': {
                      content: '""',
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      right: '0',
                      bottom: '0',
                      border: '2px solid #fff',
                      'border-radius': '14px',
                    },
                  },
                  img: {
                    display: 'block',
                    width: '110px',
                  },
                },
              },
            },
          },
          '._imagePickerFoot': {
            display: 'none',
            background: '#fff',
            height: '80px',
            position: 'absolute',
            bottom: '0px',
            left: '0px',
            width: '360px',
            '._imagePickerFootSelectAll': {
              display: 'none',
              position: 'absolute',
              left: '8px',
              top: '8px',
            },
            '&._hazSelectAll': {
              '._imagePickerFootSelectAll': {
                display: 'block',
              },
            },
            '._imagePickerFootNext': {
              position: 'absolute',
              right: '8px',
              top: '8px',
            },
          },
          '._imagePickerFeedback': {
            display: 'none',
            padding: '16px',
            height: '80px',
            'font-size': '16px',
            'line-height': '48px',
            // board cover
            '._imagePickerFeedbackBoardCover': {
              background: '#555 url() 50% 50% no-repeat',
              'background-size': 'cover',
              display: 'inline-block',
              height: '48px',
              width: '48px',
              'min-width': '48px',
              'border-radius': '8px',
              'box-shadow': '0 0 1px #eee inset',
            },
            // board name (boldface)
            '._imagePickerFeedbackBoardName': {
              overflow: 'hidden',
              margin: '0 8px',
              'font-weight': 'bold',
              'text-overflow': 'ellipsis',
              'white-space': 'nowrap',
              'font-weight': 'bold',
            },
            // button should be disabled until we get at least one success message back
            '._imagePickerFeedbackVisitButton': {
              'white-space': 'nowrap',
              margin: '0 0 8px auto',
            },
          },
          // we have a footer when we start selecting images or have Select All
          '&._hazFooter': {
            // shrink the body
            '._imagePickerBody': {
              height: '500px',
            },
            // show the footer
            '._imagePickerFoot': {
              display: 'block',
            },
          },
          '&._hazFeedback': {
            // how we're going to animate
            transition: 'height .5s ease-out',
            // body of whole picker shrinks
            height: '130px',
            // hide everything
            '._imagePickerHead, ._imagePickerBody, ._imagePickerFoot': {
              display: 'none',
            },
            // show just the footer
            '._imagePickerFeedback': {
              display: 'flex',
            },
          },
        },
        '._infoContainer': {
          display: 'none',
          top: '15px',
          right: '20px',
          overflow: 'hidden',
          display: 'none',
          position: 'absolute',
          width: '360px',
          background: '#fff',
          'box-shadow': '0 0 8px rgba(0, 0, 0, .1)',
          'border-radius': '16px',
          'text-align': 'center',
          color: '#444',
          '._authHelp': {
            display: 'none',
            '._authHelpHead': {
              display: 'block',
              'font-weight': 'bold',
              'font-size': '36px',
            },
            '._authHelpBody': {
              display: 'block',
              'font-size': '16px',
              padding: '5px 30px 15px',
            },
            '._authHelpFoot': {
              display: 'block',
              padding: '5px 0 30px',
            },
          },
        },
        '._searchContainer': {
          'user-select': 'none',
          display: 'none',
          position: 'absolute',
          top: '15px',
          right: '20px',
          height: '640px',
          width: '360px',
          background: '#fff',
          'box-shadow': '0px 0px 8px rgba(0, 0, 0, 0.3)',
          'border-radius': '16px',
          overflow: 'hidden',
          color: '#444',
          // using interfaceHead in this overlay
          '._searchInside': {
            display: 'block',
            height: '400px',
            background: '#444 url() 50% 50% no-repeat',
            'background-size': 'contain',
            'text-align': 'center',
            // canvas overlay for selector
            canvas: {
              height: 'inherit',
              margin: '0 auto',
              cursor: 'crosshair',
              // over a selected area
              '&._move': {
                cursor: 'move',
              },
              // over a dot
              '&._pointer': {
                cursor: 'pointer',
              },
              // over a selector handle
              '&._ne': {
                cursor: 'ne-resize',
              },
              '&._nw': {
                cursor: 'nw-resize',
              },
              '&._se': {
                cursor: 'se-resize',
              },
              '&._sw': {
                cursor: 'sw-resize',
              },
            },
          },
          '._searchResults': {
            display: 'block',
            height: '190px',
            overflow: 'auto',
            // 'padding-top': '8px',
            '._searchResultsGrid': {
              display: 'block',
              'margin-top': '8px',
              // don't wrap column below if we have a scrollbar
              'white-space': 'nowrap',
              '._col': {
                display: 'inline-block',
                width: '115px',
                padding: '0 6px',
                'vertical-align': 'top',
                '._thumb': {
                  'border-radius': '16px',
                  margin: '0 0 8px 0',
                  display: 'block',
                  width: '109px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  position: 'relative',
                  '._mask': {
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    bottom: '0',
                    right: '0',
                    'border-radius': '16px',
                    '._refine': {
                      display: 'none',
                      position: 'absolute',
                      top: '6px',
                      right: '6px',
                      height: '18px',
                      width: '18px',
                      'border-radius': '9px',
                      'box-shadow': 'inset 0 0 1px #555',
                      background:
                        '#000 url(data:image/svg+xml;base64,PHN2ZyBpZD0ic291cmNlIiB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyMiAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTEiIGN5PSIxMSIgcj0iMTEiIGZpbGw9ImJsYWNrIiBmaWxsLW9wYWNpdHk9IjAuOCI+PC9jaXJjbGU+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTUuMDgzNCA0LjU4MzMzSDEzLjMzMzRWNS43NDk5OUgxNS4wODM0QzE1LjcyNjggNS43NDk5OSAxNi4yNSA2LjI3MzI0IDE2LjI1IDYuOTE2NjZWOC42NjY2NkgxNy40MTY3VjYuOTE2NjZDMTcuNDE2NyA1LjYyOTgzIDE2LjM3MDIgNC41ODMzMyAxNS4wODM0IDQuNTgzMzNaTTE2LjI1IDE1LjA4MzNDMTYuMjUgMTUuNzI2NyAxNS43MjY4IDE2LjI1IDE1LjA4MzQgMTYuMjVIMTMuMzMzNFYxNy40MTY3SDE1LjA4MzRDMTYuMzcwMiAxNy40MTY3IDE3LjQxNjcgMTYuMzcwMiAxNy40MTY3IDE1LjA4MzNWMTMuMzMzM0gxNi4yNVYxNS4wODMzWk01Ljc1MDA0IDE1LjA4MzNWMTMuMzMzM0g0LjU4MzM3VjE1LjA4MzNDNC41ODMzNyAxNi4zNzAyIDUuNjI5ODcgMTcuNDE2NyA2LjkxNjcxIDE3LjQxNjdIOC42NjY3MVYxNi4yNUg2LjkxNjcxQzYuMjczMjkgMTYuMjUgNS43NTAwNCAxNS43MjY3IDUuNzUwMDQgMTUuMDgzM1pNNS43NTAwNCA2LjkxNjY2QzUuNzUwMDQgNi4yNzMyNCA2LjI3MzI5IDUuNzQ5OTkgNi45MTY3MSA1Ljc0OTk5SDguNjY2NzFWNC41ODMzM0g2LjkxNjcxQzUuNjI5ODcgNC41ODMzMyA0LjU4MzM3IDUuNjI5ODMgNC41ODMzNyA2LjkxNjY2VjguNjY2NjZINS43NTAwNFY2LjkxNjY2Wk05LjI1MDA0IDEwLjcwODNDOS4yNTAwNCA5LjkwNDQ5IDkuOTA0NTQgOS4yNDk5OSAxMC43MDg0IDkuMjQ5OTlDMTEuNTEyMiA5LjI0OTk5IDEyLjE2NjcgOS45MDQ0OSAxMi4xNjY3IDEwLjcwODNDMTIuMTY2NyAxMS41MTIyIDExLjUxMjIgMTIuMTY2NyAxMC43MDg0IDEyLjE2NjdDOS45MDQ1NCAxMi4xNjY3IDkuMjUwMDQgMTEuNTEyMiA5LjI1MDA0IDEwLjcwODNaTTEzLjYyNSAxNC41QzEzLjg0OSAxNC41IDE0LjA3MyAxNC40MTQ4IDE0LjI0NCAxNC4yNDM5QzE0LjU4NTIgMTMuOTAyMSAxNC41ODUyIDEzLjM0NzkgMTQuMjQ0IDEzLjAwNjFMMTMuMDcwMyAxMS44MzNDMTMuMjM0MiAxMS40OTA2IDEzLjMzMzQgMTEuMTEyNiAxMy4zMzM0IDEwLjcwODNDMTMuMzMzNCA5LjI2MTA4IDEyLjE1NTYgOC4wODMzMyAxMC43MDg0IDguMDgzMzNDOS4yNjExMiA4LjA4MzMzIDguMDgzMzcgOS4yNjEwOCA4LjA4MzM3IDEwLjcwODNDOC4wODMzNyAxMi4xNTU2IDkuMjYxMTIgMTMuMzMzMyAxMC43MDg0IDEzLjMzMzNDMTEuMTEyNiAxMy4zMzMzIDExLjQ5MDYgMTMuMjM0MiAxMS44MzMgMTMuMDcwMkwxMy4wMDYxIDE0LjI0MzlDMTMuMTc3IDE0LjQxNDggMTMuNDAxIDE0LjUgMTMuNjI1IDE0LjVaIiBmaWxsPSJ3aGl0ZSI+PC9wYXRoPgo8L3N2Zz4=) 50% 50% no-repeat',
                      'background-size': '16px 16px',
                    },
                    '._openBoardPickerFromSearch': {
                      display: 'none',
                      position: 'absolute',
                      top: '6px',
                      left: '6px',
                      height: '18px',
                      width: '18px',
                      'border-radius': '9px',
                      'box-shadow': 'inset 0 0 1px #555',
                      background:
                        // pin
                        '#e60023 url(data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjE2IiB3aWR0aD0iMTYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsPSJ3aGl0ZSIgZD0iTTEzLjk4OCAxOS4xNTNjMS40OTctMS40OTcgMS45OTctMy43MDcgMS40OTMtNS42MTZsNC4yNTktNC40NjMgMi45MjItLjI2Ny0uMDE3LS4wMThhLjMuMyAwIDAgMCAuMjY0LS4wODEuMzA4LjMwOCAwIDAgMCAuMDAxLS40MzdMMTUuNzMgMS4wOWEuMzEuMzEgMCAwIDAtLjQzOC4wMDEuMzA1LjMwNSAwIDAgMC0uMDgxLjI2NWwtLjAxNy0uMDE4LS4yNjcgMi45MjMtNC40NjQgNC4yNTljLTEuOTA5LS41MDUtNC4xMTktLjAwNC01LjYxNiAxLjQ5MmwzLjgwOSAzLjgwOS01LjMzMiA1LjMzMmMtLjc2Mi43NjItMi42MTMgMi45NTUtMi4yODUgMy44MDkuODUzLjMyOCAzLjA0Ny0xLjUyNCAzLjgwOC0yLjI4Nmw1LjMzMi01LjMzMiAzLjgwOSAzLjgwOVoiPjwvcGF0aD48L3N2Zz4=) 50% 50% no-repeat',
                      'background-size': '12px 12px',
                      '&._done': {
                        'background-color': '#444',
                        // white checkbox
                        'background-image':
                          'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIxN3B4IiBoZWlnaHQ9IjEzcHgiIHZpZXdCb3g9IjAgMCAxNyAxMyIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48Zz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMyw0TDcsOEwxNCwxQTEsMSAwIDAgMSAxNiwzTDcsMTJMMSw2QTEsMSAwIDAgMSAzLDRaIi8+PC9nPjwvc3ZnPg==)',
                        'background-size': '10px 10px',
                      },
                      '&._working': {
                        background:
                          'linear-gradient(rgba(0,0,0,0.06), rgba(0,0,0,0.06)), url(data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIAoJeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiAKCXhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiAKCWhlaWdodD0iMzIiCgl3aWR0aD0iMzIiCgl2aWV3Qm94PSIwIDAgMTYgMTYiIAoJeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+Cgk8cGF0aCBmaWxsPSIjZmZmIiBkPSIKICAJTSA4LCAwCiAgICBBIC41LCAuNSwgMCwgMCwgMCwgOCwgMQogICAgQSA2LCA3LCAwLCAwLCAxLCAxNCwgOAogICAgQSA2LCA2LCAwLCAwLCAxLCA4LCAxNAogICAgQSA1LCA2LCAwLCAwLCAxLCAzLCA4CiAgICBBIDEsIDEsIDAsIDAsIDAsIDAsIDgKICAgIEEgOCwgOCwgMCwgMCwgMCwgOCwgMTYKICAgIEEgOCwgOCwgMCwgMCwgMCwgMTYsIDgKICAgIEEgOCwgOCwgMCwgMCwgMCwgOCwgMAogICAgWiIgPgogICAgPGFuaW1hdGVUcmFuc2Zvcm0KCQkJYXR0cmlidXRlVHlwZT0ieG1sIgoJCQlhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iCgkJCXR5cGU9InJvdGF0ZSIKCQkJZnJvbT0iMCA4IDgiCgkJCXRvPSIzNjAgOCA4IgoJCQlkdXI9IjAuNnMiCgkJCXJlcGVhdENvdW50PSJpbmRlZmluaXRlIgoJCS8+Cgk8L3BhdGg+Cjwvc3ZnPgo=) 50% 50% no-repeat',
                        'background-color': '#e60023',
                        'background-size': '18px 18px',
                        color: 'transparent',
                      },
                    },
                    '&:hover': {
                      '._refine': {
                        display: 'block',
                      },
                      '._openBoardPickerFromSearch': {
                        display: 'block',
                      },
                    },
                  },
                  img: {
                    display: 'block',
                    width: '110px',
                  },
                },
              },
              // two-column layout (see showResults)
              '&._cols_2': {
                '._col': {
                  width: '175px',
                  '._thumb': {
                    width: '169px',
                    // so footer shows against background
                    'box-shadow': '0 0 1px #000',
                    // make room for footer
                    'padding-bottom': '40px',
                    '._footer': {
                      cursor: 'default',
                      position: 'absolute',
                      bottom: '0',
                      left: '0',
                      right: '0',
                      height: '40px',
                      background: '#fff',
                      'line-height': '40px',
                      'box-shadow': 'inset 0 0 1px #555',
                      '._avatar': {
                        position: 'absolute',
                        top: '8px',
                        left: '8px',
                        height: '24px',
                        width: '24px',
                        'border-radius': '12px',
                        'box-shadow': 'inset 0 0 1px #555',
                        cursor: 'pointer',
                      },
                      '._title': {
                        position: 'absolute',
                        top: '0',
                        left: '40px',
                        'font-size': '11px',
                        'white-space': 'pre',
                        overflow: 'hidden',
                        'text-overflow': 'ellipsis',
                        width: '120px',
                      },
                    },
                    '._mask': {
                      '._refine, ._openBoardPickerFromSearch': {
                        top: '10px',
                        height: '24px',
                        width: '24px',
                        'border-radius': '12px',
                      },
                      '._refine': {
                        right: '8px',
                        'background-size': '20px 20px',
                      },
                      '._openBoardPickerFromSearch': {
                        left: '8px',
                        'background-size': '12px 12px',
                      },
                    },
                    img: {
                      width: '170px',
                    },
                  },
                },
              },
            },
          },
        },
        // show the search panel
        '&._hazSearch': {
          '._searchContainer': {
            display: 'block',
          },
        },
        // show the board picker
        '&._hazBoardPicker': {
          '._boardPicker': {
            display: 'block',
          },
          '._boardPickerMask': {
            display: 'block',
          },
        },
        // show the image picker
        '&._hazImagePicker': {
          '._imagePicker': {
            display: 'block',
            '&._hideSubCaption': {
              '._imagePickerHead': {
                height: '64px',
              },
              '._imagePickerHeadSubCaption': {
                display: 'none',
              },
            },
          },
        },
        // show the unauthed help view inside the info container
        '&._hazAuthHelp': {
          height: '390px',
          '._infoContainer': {
            display: 'block',
            '._authHelp': {
              display: 'block',
            },
          },
        },
        // we have only one possible image to save, so prevent access to image picker
        '&._hazOnlyOneImage': {
          // don't show the go-back arrow between board picker and image picker
          '._boardPicker': {
            '._boardPickerHead': {
              '._boardPickerHide': {
                display: 'none',
              },
            },
          },
          // prevent flash of "choose a pin to save" as feedback footer comes up
          '._imagePicker': {
            '._imagePickerHead': {
              display: 'none',
            },
          },
        },
      },
    },
    // Pinterest logo and Close button; should work for all views inside the nonblocking pop-up
    '._interfaceHead': {
      display: 'block',
      height: '52px',
      // Pinterest logo
      background:
        // Pinterest logo (decoration only)
        'transparent url(data:image/svg+xml;base64,PHN2ZyBpZD0ic291cmNlIiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iOCIgY3k9IjgiIHI9IjgiIGZpbGw9IndoaXRlIj48L2NpcmNsZT4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0wIDhDMCAxMS40MTUzIDIuMTQwNjcgMTQuMzMxMyA1LjE1MzMzIDE1LjQ3ODdDNS4wOCAxNC44NTQgNS4wMDIgMTMuODI0IDUuMTcgMTMuMTAxM0M1LjMxNDY3IDEyLjQ4IDYuMTA0IDkuMTQyNjcgNi4xMDQgOS4xNDI2N0M2LjEwNCA5LjE0MjY3IDUuODY2IDguNjY2IDUuODY2IDcuOTZDNS44NjYgNi44NTMzMyA2LjUwNzMzIDYuMDI2NjcgNy4zMDY2NyA2LjAyNjY3QzcuOTg2NjcgNi4wMjY2NyA4LjMxNDY3IDYuNTM2NjcgOC4zMTQ2NyA3LjE0OEM4LjMxNDY3IDcuODMxMzMgNy44NzkzMyA4Ljg1MjY3IDcuNjU0NjcgOS44QzcuNDY3MzMgMTAuNTkyNyA4LjA1MjY3IDExLjIzOTMgOC44MzQgMTEuMjM5M0MxMC4yNDkzIDExLjIzOTMgMTEuMzM4IDkuNzQ2NjcgMTEuMzM4IDcuNTkyQzExLjMzOCA1LjY4NDY3IDkuOTY3MzMgNC4zNTIgOC4wMTA2NyA0LjM1MkM1Ljc0NTMzIDQuMzUyIDQuNDE1MzMgNi4wNTEzMyA0LjQxNTMzIDcuODA4QzQuNDE1MzMgOC40OTI2NyA0LjY3ODY3IDkuMjI2IDUuMDA4IDkuNjI1MzNDNS4wNzI2NyA5LjcwNDY3IDUuMDgyNjcgOS43NzMzMyA1LjA2MzMzIDkuODU0QzUuMDAyNjcgMTAuMTA2IDQuODY4IDEwLjY0NjcgNC44NDIgMTAuNzU3M0M0LjgwNjY3IDEwLjkwMjcgNC43MjY2NyAxMC45MzQgNC41NzUzMyAxMC44NjMzQzMuNTgwNjcgMTAuNDAwNyAyLjk1OTMzIDguOTQ2NjcgMi45NTkzMyA3Ljc3ODY3QzIuOTU5MzMgNS4yNjYgNC43ODQgMi45NTkzMyA4LjIyMDY3IDIuOTU5MzNDMTAuOTgzMyAyLjk1OTMzIDEzLjEzMDcgNC45MjggMTMuMTMwNyA3LjU1ODY3QzEzLjEzMDcgMTAuMzAzMyAxMS40MDA3IDEyLjUxMjcgOC45OTggMTIuNTEyN0M4LjE5MDY3IDEyLjUxMjcgNy40MzI2NyAxMi4wOTI3IDcuMTcyNjcgMTEuNTk3M0M3LjE3MjY3IDExLjU5NzMgNi43NzMzMyAxMy4xMTg3IDYuNjc2NjcgMTMuNDkwN0M2LjQ4ODY3IDE0LjIxMzMgNS45NjczMyAxNS4xMjggNS42NDQgMTUuNjQ3M0M2LjM4OTMzIDE1Ljg3NjcgNy4xOCAxNiA4IDE2QzEyLjQxOCAxNiAxNiAxMi40MTggMTYgOEMxNiAzLjU4MiAxMi40MTggMCA4IDBDMy41ODIgMCAwIDMuNTgyIDAgOFoiIGZpbGw9IiNFNjAwMjMiPjwvcGF0aD4KPC9zdmc+) 16px 16px no-repeat',
      'background-size': '20px 20px',
      // three-dot menu opener
      '._settings': {
        position: 'absolute',
        top: '10px',
        right: '42px',
        height: '32px',
        width: '32px',
        cursor: 'pointer',
        background:
          'transparent url(data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGhlaWdodD0iMjQiIHdpZHRoPSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KPHBhdGggZD0iTTEyIDljLTEuNjYgMC0zIDEuMzQtMyAzczEuMzQgMyAzIDMgMy0xLjM0IDMtMy0xLjM0LTMtMy0zTTMgOWMxLjY2IDAgMyAxLjM0IDMgM3MtMS4zNCAzLTMgMy0zLTEuMzQtMy0zIDEuMzQtMyAzLTN6bTE4IDBjMS42NiAwIDMgMS4zNCAzIDNzLTEuMzQgMy0zIDMtMy0xLjM0LTMtMyAxLjM0LTMgMy0zeiI+PC9wYXRoPgo8L3N2Zz4=) 50% 50% no-repeat',
        'background-size': '16px 16px',
      },
      '._close': {
        position: 'absolute',
        top: '10px',
        right: '10px',
        height: '32px',
        width: '32px',
        cursor: 'pointer',
        // background defaults to X for 'cancel'
        background:
          'transparent url(data:image/svg+xml;base64,CjxzdmcgdmVyc2lvbj0iMS4xIiBoZWlnaHQ9IjE2IiB3aWR0aD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CjxwYXRoIGZpbGw9IiMwMDAiIGQ9Ik04IDUuNTA2TDMuMDE1LjUyQTEuNzY1IDEuNzY1IDAgMSAwIC41MjEgMy4wMTVMNS41MDYgOCAuNTIgMTIuOTg1QTEuNzY1IDEuNzY1IDAgMCAwIDEuNzY2IDE2YTEuNzYgMS43NiAwIDAgMCAxLjI0OC0uNTJMOCAxMC40OTNsNC45ODUgNC45ODVhMS43NjcgMS43NjcgMCAwIDAgMi40OTguMDA0IDEuNzYyIDEuNzYyIDAgMCAwLS4wMDQtMi40OThMMTAuNDk0IDhsNC45ODUtNC45ODVhMS43NjcgMS43NjcgMCAwIDAgLjAwNC0yLjQ5OCAxLjc2MiAxLjc2MiAwIDAgMC0yLjQ5OC4wMDRMOCA1LjUwNnoiPjwvcGF0aD4KPC9zdmc+) 50% 50% no-repeat',
        'background-size': '16px 16px',
      },
    },
    // buttons
    '._button': {
      cursor: 'pointer',
      display: 'inline-block',
      margin: '8px',
      height: '48px',
      padding: '0 20px',
      'font-size': '16px',
      'font-weight': 'bold',
      'line-height': '48px',
      'text-align': 'center',
      'border-radius': '24px',
      'background-color': '#efefef',
      color: '#000',
      // red button with white text
      '&._majorAction': {
        'background-color': '#e60023',
        color: '#fff',
      },
      // save button in board or section list items
      '&._save': {
        display: 'none',
        'background-color': '#e60023',
        color: '#fff',
      },
      // next button in image picker
      '&._imagePickerFootNext': {
        'background-color': '#e60023',
        color: '#fff',
      },
      '&._cancel, &._imagePickerFootSelectAll': {
        'background-color': '#eee',
        color: '#000',
      },
      '&._disabled': {
        'background-color': '#ddd',
        color: '#aaa',
        cursor: 'normal',
        'pointer-events': 'none',
      },
    },
    // global hide/unhide class
    '._hidden': {
      display: 'none!important',
    },
  };

  /*
    a JSON object that will be converted into HTML
  */

  const template = {
    bg: {
      // clicking outside the UI should close
      cmd: 'close',
      me: {
        boardPickerOpener: {
          cmd: 'close',
          boardPickerOpenerContainer: {
            boardPickerOpenerLabel: {},
            boardPickerOpenerCurrent: {},
            boardPickerOpenerMask: {
              addClass: 'mask',
              cmd: 'openBoardPicker',
            },
          },
          saveAction: {
            cmd: 'save',
          },
          afterSave: {
            cmd: 'visit',
            // experiment: browser_extension_share_after_save
            canShare: 'true',
          },
        },
      },
      imagePicker: {
        interfaceHead: {
          close: {
            cmd: 'closeImagePicker',
          },
        },
        imagePickerHead: {
          default: {
            imagePickerHeadMainCaption: {},
            imagePickerHeadSubCaption: {},
          },
          preview: {},
        },
        imagePickerBody: {
          grid: {},
        },
        imagePickerFoot: {
          imagePickerFootSelectAll: {
            addClass: 'button',
            cmd: 'selectAllThumbs',
          },
          imagePickerFootNext: {
            addClass: 'button disabled',
            cmd: 'openBoardPickerFromImagePicker',
          },
        },
        imagePickerFeedback: {
          imagePickerFeedbackBoardCover: {},
          imagePickerFeedbackBoardName: {},
          imagePickerFeedbackVisitButton: {
            cmd: 'visit',
            // experiment: browser_extension_share_after_save
            canShare: 'true',
            addClass: 'button disabled',
          },
        },
      },
      boardPicker: {
        boardPickerHead: {
          boardPickerHeadLine: {},
          boardPickerHeadNav: {
            cmd: 'close',
          },
          boardPickerHide: {
            addClass: 'hidden',
            cmd: 'backToImagePicker',
          },
          boardPickerInputBar: {
            boardPickerInput: {
              addClass: 'search',
              tag: 'INPUT',
            },
          },
        },
        // choose a board or section
        boardPickerChoose: {
          boardPickerBoards: {
            boardPickerTopContainer: {
              boardPickerTopHeader: {
                addClass: 'divider',
              },
              boardPickerTopList: {},
            },
            boardPickerAllHeader: {
              addClass: 'divider',
            },
            boardPickerAllList: {},
          },
          // lists of sections keyed by board ID
          boardPickerSections: {
            addClass: 'hidden',
          },
          boardPickerFoot: {
            plusIcon: {},
            boardPickerSlugLine: {},
            mask: {
              cmd: 'openModeCreate',
            },
          },
        },
        // create a resource
        boardPickerCreate: {
          boardPickerCreateBody: {
            boardPickerCreateSecretLabel: {
              tag: 'label',
              boardPickerCreateSecretInput: {
                tag: 'input',
                type: 'checkbox',
              },
              toggle: {
                knob: {},
                boardPickerCreateSecretNo: {
                  addClass: 'optNo',
                },
                boardPickerCreateSecretYes: {
                  addClass: 'optYes',
                },
              },
            },
          },
          boardPickerCreateFoot: {
            boardPickerCreateCancel: {
              cmd: 'closeModeCreate',
              addClass: 'button cancel',
            },
            boardPickerCreateGo: {
              cmd: 'makeBoardOrSection',
              addClass: 'button save disabled',
            },
          },
        },
      },
      boardPickerMask: {
        cmd: 'close',
      },
      infoContainer: {
        interfaceHead: {
          close: {
            cmd: 'closeImagePicker',
          },
        },
        authHelp: {
          authHelpHead: {},
          authHelpBody: {},
          authHelpFoot: {
            signIn: {
              addClass: 'button majorAction',
              cmd: 'getAuthHelp',
            },
          },
        },
      },
      searchContainer: {
        interfaceHead: {
          close: {
            cmd: 'closeImagePicker',
          },
        },
        searchInside: {
          searchSelect: {
            tag: 'canvas',
          },
        },
        searchResults: {
          searchResultsGrid: {},
        },
      },
    },
  };

  /*
    Set some globally-available namespaces
  */

  // We'll fill and change these later
  const global = {
    // so we can always test for global.boards.length
    boards: [],
    // space for sections to live keyed by board ID
    sections: {},
  };
  const structure = {};

  // check for Chrome first, then "browser," which is the Web standards version
  const browser = chrome || browser;

  // immutable settings, available globally
  const config = {
    me: 'save',
    localValuesNeeded: ['boards', 'ctrl', 'debug', 'experimentGroup', 'msg', 'override'],
    structure: template,
    presentation: rules,
    // wait this long before auto-closing after a save
    delayAfterSave: 3000,
    // close our ovrlay if nothing renders after this number of milliseconds
    safetyTimeout: 10000,
    limit: {
      grid: {
        selectedThumbs: 20,
      },
    },
    url: {
      helpSaving: 'https://help.pinterest.com/en/article/trouble-with-pinterest-browser-button',
    },
  };

  /*
    find an event's target element
    {
      target: [an event]
    }
  */

  function seek(me) {
    const found = me.target;
    // if our target is a text node return its parent
    if (found.targetNodeType === 3) {
      found = found.parentNode;
    }
    return found;
  }

  /* 
    get a DOM property or data attribute
    { 
      el: [an element],
      att: [an attribute]
    }
  */

  function get(me) {
    let found = null;
    if (typeof me.el[me.att] === 'string') {
      // found a natural DOM attribute like src, height, or width
      found = me.el[me.att];
    } else {
      // found a data attribute
      found = me.el.dataset[me.att];
    }
    return found;
  }

  /*
    clear the global that forces us to stay open if we have
    - moused over
    - are not currently saving a Pin
    me: {
      event: [event]
      name: [string]
    }
  */

  function allowClose(me) {
    if (me.name === 'over' && !global.hazPinningNow) {
      global.stayOpen = false;
    }
  }

  /* 
    add and/or remove a class or a list of classes from an element or list of elements:
    {
      el: an element or [collection of elements] to be changed,
      add: a className or [list of classNames] to be added,
      remove: a className or [list of classNames] to be removd
    }
  */

  function changeClass(changeMe) {
    let i, applyThis;
    if (changeMe.el) {
      if (!changeMe.el.length) {
        changeMe.el = [changeMe.el];
      }
      // changeMe will take a collection, which is not an array, so this loop is needed
      for (i = 0; i < changeMe.el.length; i = i + 1) {
        // do your adds and removes
        if (changeMe.el[i] && changeMe.el[i].classList) {
          if (changeMe.add) {
            if (typeof changeMe.add !== 'object') {
              changeMe.add = [changeMe.add];
            }
            // add OURGLOBAL_ to supplied class names
            applyThis = changeMe.add.map((e) => {
              return `${config.me}_${e}`;
            });
            changeMe.el[i].classList.add.apply(changeMe.el[i].classList, applyThis);
          }
          if (changeMe.remove) {
            if (typeof changeMe.remove !== 'object') {
              changeMe.remove = [changeMe.remove];
            }
            applyThis = changeMe.remove.map((e) => {
              return `${config.me}_${e}`;
            });
            changeMe.el[i].classList.remove.apply(changeMe.el[i].classList, applyThis);
          }
        }
        if (changeMe.el[i].classList && !changeMe.el[i].classList.length) {
          changeMe.el[i].removeAttribute('class');
        }
      }
    }
  }

  /*
    return the hexadecimal reprentation of an RFC4122-compliant UUID
  */

  function makeUUID() {
    return [1e7, 1e3, 4e3, 8e3, 1e11]
      .join('')
      .replace(/[018]/g, (c) =>
        (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16),
      );
  }

  /*
    log a message to console if global.debug is set
    message: anything you want to log
    level: [bool] or [number]
  */

  function debug(message, level = 0) {
    // do we have a message?
    if (message) {
      // is global.debug truthy?
      if (global.debug) {
        // are we filtering our debug messages?
        if (typeof global.debug === 'number') {
          // debug is some number greater than zero, so:
          // is our level greater than or equal to the debug number?
          if (level >= global.debug) {
            console.log(message);
          }
        } else {
          // any other truthy value? log everything
          console.log(message);
        }
      }
    }
  }

  /*
    send a message
    {
      to: [a process name, like grid or create]
      act: [a function in the act object of the receiving process],
      data: [an object]
    }
    // TODO: fix this up so we're all using me.from or me.via
  */

  function send(me) {
    // set via to my config.me: grid, save, create, search, etc.
    me.via = config.me;
    me.from = config.me;
    if (!me.to) {
      me.to = 'background';
    }
    debug('Sending message');
    debug(JSON.stringify(me));
    browser.runtime.sendMessage(me);
  }

  /*
    Request a context log entry
    me: {
      viewType: [string; should be a member of global.ctrl.ViewTypes],
      url: [optional; string; overrides saveMe.url or pinmarkletData.url]
    }
  */

  // TODO: change the name of this function, now that it doesn't just log views

  function logView(me) {
    // set funnel_uuid on global, once per load per overlay
    if (!global.funnel_uuid) {
      global.funnel_uuid = makeUUID();
    }
    // start our data object
    const data = {
      eventType: 'VIEW',
      viewType: me.viewType,
      auxData: {
        funnel_uuid: global.funnel_uuid,
      },
    };

    // do we have a non-view event (a click, perhaps?)
    if (me.eventType && me.element) {
      data.eventType = me.eventType;
      delete data.viewType;
      data.element = me.element;
    }
    // auxData url can be overloaded in many ways:
    // - me.url may be sent by Visual Search
    // - saveMe.url may be set on global from hoverboard opener
    // - pinmarkletData.url imay be set on global from pinmarklet
    let auxUrl = me.url || global.saveMe?.url || global.pinmarkletData?.url;
    // no matter what happens, send auxData.url only if we have it
    if (auxUrl) {
      data.auxData.url = auxUrl;
    }
    // ready to send
    send({
      to: 'background',
      act: 'contextLog',
      data,
    });
  }

  /*
    clear the global that forces us to stay open if we have 
    - moused over
    - are not currently saving a Pin
    me: {
      event: [event]
      name: [string]
    }
  */

  function backToImagePicker(me) {
    if (me.name === 'click') {
      // someone has clicked the back-arrow on the board picker while it's inside the image picker
      changeClass({
        el: structure.bg,
        remove: 'hazBoardPicker',
      });
      logView({ viewType: 'IMAGE_PICKER' });
    }
  }

  /*
    close the save overlay
    me: null or {
      url: URL,
      media: URL,
      id: pin ID or 0,
      description: string or null
    }
  }
  */

  function doClose(me = {}) {
    // only close if we've rendered the picker, otherwise we will close instantly
    if (global.hazRendered) {
      // ask the background process to close our overlay
      send({ act: 'closeSave', data: me });
    }
  }

  /*
    close board picker 
  */

  function closeBoardPicker() {
    // hide boardPicker and boardPickerMask
    changeClass({
      el: structure.bg,
      remove: 'hazBoardPicker',
    });
  }

  /*
    close our overlay, potentially because we moused out of the picker
    me: {
      event: [event],
      name: [string; looking for over or move]
    }
    TODO: rename this? It's confusing to have two functions named "close"
  */

  function close(me) {
    // only the background iframe tries to close on mouse over or move
    if (me.name === 'over' || me.name === 'move') {
      if (!global.stayOpen) {
        // call the actual close function
        doClose();
      }
    }
    // only the background iframe tries to close on mouse over or move
    if (me.name === 'click') {
      // if we've opened from search, only close the board picker and not the whole UI
      if (global.openBoardPickerFromSearch) {
        global.openBoardPickerFromSearch = false;
        closeBoardPicker();
      } else {
        doClose();
      }
    }
  }

  /*
    set a DOM property or data attribute:
    {
      el: [an element],
      att: [an attribute],
      string: [a string]
    }
  */

  function set(me) {
    if (typeof me.el[me.att] === 'string') {
      // natural DOM attribute
      me.el[me.att] = me.string;
    } else {
      // data attribute
      me.el.dataset[me.att] = me.string;
    }
  }

  /*
    close the create interface
    me: {
      name: [string, must match "click"]
    }
  */

  function closeModeCreate(me) {
    if (me.name === 'click') {
      // put back whatever it was
      global.pickerView = global.stashView;

      // clear value, in case we are returning from a search run
      structure.boardPickerInput.value = '';

      // show the main nav
      changeClass({ el: structure.boardPickerHeadNav, remove: 'hidden' });

      // reset top headline
      if (global.pickerView === 'board') {
        // we werew creating a board, so go back to board view
        structure.boardPickerHeadLine.innerText = global.msg.boardPickerChooseBoard;
        // show the back-to-image-picker nav if we are going back into the board list
        if (global.hazImagePicker) {
          changeClass({ el: structure.boardPickerHide, remove: 'hidden' });
        }
      } else {
        // we were creating a section, so go back to sections view
        structure.boardPickerHeadLine.innerText = global.msg.boardPickerChooseSection;
      }
      // set the nav command to the correct next thing
      if (global.pickerView === 'section') {
        // command: close section picker
        set({ el: structure.boardPickerHeadNav, att: 'cmd', string: 'closeSectionPicker' });
        logView({ viewType: 'BOARD_SECTION_PICKER' });
      } else {
        // nav to X
        changeClass({ el: structure.boardPickerHeadNav, remove: 'back' });
        // command: close everything
        set({ el: structure.boardPickerHeadNav, att: 'cmd', string: 'close' });
        logView({ viewType: 'BOARD_PICKER' });
      }
      // this should hide the creator and show whatever else was there previously
      changeClass({ el: structure.boardPicker, remove: 'hazCreate' });
    }
  }

  /*
    close the image picker
    me: {
      name: [string, must match "click"]
    }
  */

  function closeImagePicker(me) {
    if (me.name === 'click') {
      global.hazRendered = true;
      doClose();
    }
  }

  /*
    close the section picker
    me: {
      name: [string, must match "click"]
    }
  */

  function closeSectionPicker(me) {
    // TODO: keyboard handling
    if (me.name === 'click') {
      if (global.hazImagePicker) {
        // show the back-to-image-picker nav
        changeClass({ el: structure.boardPickerHide, remove: 'hidden' });
      }
      // hide section list
      changeClass({ el: structure.boardPickerSections, add: 'hidden' });
      // show board list
      changeClass({ el: structure.boardPickerBoards, remove: 'hidden' });
      // hide the section list under this board so next time we open sections it's not visible
      changeClass({
        el: structure[global.searchSectionsUnderThisBoard + '_sections'],
        add: 'hidden',
      });
      // tell Search we're going to be looking for board names rather than section names
      global.searchSectionsUnderThisBoard = '';
      // set the navigation icon to X
      changeClass({ el: structure.boardPickerHeadNav, remove: 'back' });
      // set the navgiation command to close
      set({ el: structure.boardPickerHeadNav, att: 'cmd', string: 'close' });
      // set the headline to "choose board"
      structure.boardPickerHeadLine.innerText = global.msg.boardPickerChooseBoard;
      // set the footer text to "create board"
      structure.boardPickerSlugLine.innerText = global.msg.boardPickerCreateBoard;
      // set a global view so we do the right thing on escape
      global.pickerView = 'board';
      // clear input value (or we will show boards matching the input last entered for section picker)
      structure.boardPickerInput.value = '';
      logView({ viewType: 'BOARD_PICKER' });
      // show the secret toggle in create panel
      changeClass({
        el: structure.boardPickerCreateSecretLabel,
        remove: 'hidden',
      });
    }
  }

  /*
    when someone clicks the Sign In link in the unauthed help overlay, help them to sign in
    this should open the home page with the login box in front
    me: {
      event: [event]
      name: [string, looking for 'click']
    }
  */

  function getAuthHelp(me) {
    if (me.name === 'click') {
      send({
        act: 'getAuthHelp',
        data: {},
      });
    }
  }

  /*
    when someone clicks the Help link, open the article about saving
    me: {
      event: [event]
      name: [string, looking for 'click']
    }
  */

  function getSaveHelp(me) {
    if (me.name === 'click') {
      window.open(config.url.helpSaving);
      doClose();
    }
  }

  /*
    create a new board or section
    me: {
      name: [string, must match "click"],
      element: [DOM element],
    }
  */

  function makeBoardOrSection(me) {
    // TODO: keyboard handling
    if (me.name === 'click') {
      // don't allow an attempt to create a board or section with a blank name
      if (!me.element.className.match('_disabled')) {
        const query = {
          to: 'background',
          replyTo: 'save',
          data: {
            skipTimeCheck: true,
          },
        };
        // what shall we close?
        switch (global.stashView) {
          case 'section':
            query.act = 'newSection';
            // sections get a title and must know their parent board
            query.data.title = structure.boardPickerInput.value;
            query.data.board = get({ el: structure.boardPickerHeadNav, att: 'boardId' });
            break;
          case 'board':
            query.act = 'newBoard';
            // boards get a name and secrecy flag
            query.data.name = structure.boardPickerInput.value;
            query.data.secret = structure.boardPickerCreateSecretInput.checked;
        }
        if (query.act) {
          // fire it off
          send(query);
        }
      }
    }
  }

  /*
    open the create interface
    me: {
      name: [string, must match "click"],
    }
  */

  function openModeCreate(me) {
    if (me.name === 'click') {
      // be ready to put back whatever it was
      global.stashView = global.pickerView;

      // hide the main nav
      changeClass({ el: structure.boardPickerHeadNav, add: 'hidden' });

      if (global.hazImagePicker) {
        // hide the back-to-image-picker nav
        changeClass({ el: structure.boardPickerHide, add: 'hidden' });
      }
      // set top headline
      if (global.pickerView === 'board') {
        // we are creating a board
        structure.boardPickerHeadLine.innerText = global.msg.boardPickerCreateBoard;
        logView({ viewType: 'CREATE_BOARD' });
      } else {
        // we are creating a section
        structure.boardPickerHeadLine.innerText = global.msg.boardPickerCreateSection;
        logView({ viewType: 'BOARD_SECTION_CREATE' });
      }
      // if we are in the empty state, don't allow go-back
      if (!global.boards.length) {
        // remove the Cancel button
        changeClass({ el: structure.boardPickerCreateCancel, add: 'hidden' });
      }
      // this should show the creator and hide whatever else was there previously
      changeClass({ el: structure.boardPicker, add: 'hazCreate' });
    }
  }

  /*
    handle input in board picker
  */

  function inputBoardPicker() {
    let lastInput = '';
    let toSearch;
    function check() {
      const hideMe = [];
      const showMe = [];
      // trim so we can accurately disable the Create button
      const myValue = structure.boardPickerInput.value.trim();
      // if we are looking at sections, search there; otherwise, search boards
      toSearch = global.boards;
      if (global.searchSectionsUnderThisBoard) {
        toSearch = global.sections[global.searchSectionsUnderThisBoard];
      }
      if (myValue) {
        // hide top list and all header
        changeClass({
          el: [structure.boardPickerTopContainer, structure.boardPickerAllHeader],
          add: 'hidden',
        });
        // show or hide the right items
        if (myValue !== lastInput) {
          toSearch.filter((it) => {
            if (it.name.toLowerCase().match(myValue.toLowerCase())) {
              let showThese = document.getElementsByClassName(`save_${it.id}`);
              for (var i = 0; i < showThese.length; i = i + 1) {
                showMe.push(showThese[i]);
              }
            } else {
              let hideThese = document.getElementsByClassName(`save_${it.id}`);
              for (var i = 0; i < hideThese.length; i = i + 1) {
                hideMe.push(hideThese[i]);
              }
            }
          });
          // enable the Create button
          changeClass({
            el: [structure.boardPickerCreateGo],
            remove: 'disabled',
          });
          // is something showing on the list?
          if (showMe.length) {
            // check each visible item
            showMe.filter((it) => {
              const target = (
                it.dataset['sectionTitle'] ||
                it.dataset['boardName'] ||
                // in case something goes wrong, we'll match against nothing
                ''
              ).toLowerCase();
              // is the item's name an exact match for what's in the input box?
              // myValue has already been trimmed so spaces at the beginning or end should not matter
              if (target === myValue.toLowerCase()) {
                // disable the Create button
                changeClass({
                  el: [structure.boardPickerCreateGo],
                  add: 'disabled',
                });
              }
            });
          }
          // hide everything we are supposed to hide
          changeClass({ el: hideMe, add: 'hidden' });
          // show everything we are supposed to show
          changeClass({ el: showMe, remove: 'hidden' });
          lastInput = myValue;
        }
      } else {
        // input box is empty
        // show all the items we hid
        toSearch.filter((it) => {
          let showThese = document.getElementsByClassName(`save_${it.id}`);
          for (var i = 0; i < showThese.length; i = i + 1) {
            showMe.push(showThese[i]);
          }
        });
        // show all the items we hid during search
        changeClass({ el: showMe, remove: 'hidden' });
        // show the Top Choices header and list, and All Boards header
        changeClass({
          el: [structure.boardPickerTopContainer, structure.boardPickerAllHeader],
          remove: 'hidden',
        });
        // disable the Create button
        changeClass({
          el: [structure.boardPickerCreateGo],
          add: 'disabled',
        });
      }
      setTimeout(check, 100);
    }
    check();
  }

  /*
  prevent default scrolling behavior on a DOM element
  {
    el: [an element or list of elements],
  }
  TODO: for Safari, check that passive: false can be set
  https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#improving_scrolling_performance_with_passive_listeners
  */

  function noScroll(me) {
    if (me.el) {
      if (!me.el.length) {
        me.el = [me.el];
      }
      // this is a loop and not a filter because me.el may be a collection
      for (let i = 0; i < me.el.length; i = i + 1) {
        me.el[i].addEventListener(
          'scroll',
          (e) => {
            e.preventDefault();
          },
          { passive: false },
        );
        me.el[i].addEventListener(
          'wheel',
          (e) => {
            e.preventDefault();
          },
          { passive: false },
        );
      }
    }
  }

  /*
    open the board picker
    me: {
      name: [string, must match "click"],
      element: [DOM element],
    }
  */

  function openBoardPicker(me) {
    // we don't want to do this on mouseover
    if (me.name === 'click') {
      // there's going to be some tension here with original hoverboard picker
      global.stayOpen = true;
      let top, left, right;
      // opening from image picker or hoverbutton?
      if (me.fromImagePicker) {
        top = 65;
        right = 20;
        global.hazImagePicker = true;
        changeClass({ el: structure.boardPicker, add: 'fromImagePicker' });
        // show the back-to-image-picker nav
        changeClass({ el: structure.boardPickerHide, remove: 'hidden' });
        // global.boardId is set to the last board we used from hoverboard opener;
        // clear it here or we won't save to the right board
        global.boardId = null;
        logView({ viewType: 'BOARD_PICKER' });
      } else {
        // opening board picker from search, beside results
        if (me.fromSearch) {
          changeClass({ el: structure.boardPicker, add: 'fromSearch' });
          changeClass({ el: structure.boardPickerHeadNav, add: 'back' });
          global.boardId = null;
          logView({ viewType: 'BOARD_PICKER' });
        } else {
          // hoverboard opener; find the right place to open
          top = global.position.top + 50;
          left = global.position.left - 65;
          const height = window.innerHeight,
            width = window.innerWidth;
          // are we too close to the right edge?
          if (left > width - 370) {
            left = width - 370;
          }
          // are we too close to the left edge?
          if (left < 10) {
            left = 10;
          }
          // are we too close to the bottom edge?
          if (top > height - 520) {
            // is the opener too close to the top to render above?
            if (top > 570) {
              // we have enough room
              top = top - 560;
            } else {
              // try to position with opener halfway down
              top = global.position.top - 300;
              // if the top is too high, push it back down
              if (top < 20) {
                top = 20;
              }
              // should we duck left or right?
              if (width - global.position.left < 600) {
                // go left
                left = global.position.left - 370;
              } else {
                // go right
                left = global.position.left + 245;
              }
            }
          }
          logView({ viewType: 'HOVER_BOARD_PICKER' });
        }
      }
      // set location
      structure.boardPicker.style.top = `${top}px`;
      if (typeof left === 'number') {
        structure.boardPicker.style.left = `${left}px`;
      } else {
        if (typeof right === 'number') {
          structure.boardPicker.style.right = `${right}px`;
        }
      }
      // show boardPicker and boardPickerMask
      changeClass({
        el: structure.bg,
        add: 'hazBoardPicker',
      });
      // keep an eye on the input box
      setTimeout(inputBoardPicker, 100);
      // set a global view so we do the right thing on escape
      global.pickerView = 'board';
      // disallow scrolling outside the scrolling list of boards
      noScroll({
        el: [
          structure.boardPickerOpener,
          structure.boardPickerMask,
          structure.boardPickerHead,
          structure.boardPickerFoot,
          structure.boardPickerCreate,
        ],
      });
      // if we have no boards, pop us over to create mode
      if (!global.boards.length) {
        openModeCreate({ name: 'click' });
      }
    }
  }

  /*
    open the board picker inside the image picker
  */

  function openBoardPickerFromImagePicker(me) {
    if (me.name === 'click') {
      openBoardPicker({
        name: 'click',
        fromImagePicker: true,
      });
    }
  }

  /*
    open the section picker
    me: {
      name: [string, must match "click"],
      element: [DOM element],
    }
  */

  function openSectionPicker(me) {
    if (me.name === 'click') {
      if (global.hazImagePicker) {
        // hide the back-to-image-picker nav
        changeClass({ el: structure.boardPickerHide, add: 'hidden' });
      }
      // hide board list
      changeClass({ el: structure.boardPickerBoards, add: 'hidden' });
      // show section list
      changeClass({ el: structure.boardPickerSections, remove: 'hidden' });
      // which section list do we need to show?
      const boardId = get({ el: me.element, att: 'boardId' });
      // tell Search we're going to be looking for section names under this board
      global.searchSectionsUnderThisBoard = boardId;
      // show this board's sections
      changeClass({
        el: structure[global.searchSectionsUnderThisBoard + '_sections'],
        remove: 'hidden',
      });
      // set the nav thingie to back-arrow
      changeClass({ el: structure.boardPickerHeadNav, add: 'back' });
      // set the nav command to close section picker
      set({ el: structure.boardPickerHeadNav, att: 'cmd', string: 'closeSectionPicker' });
      // hide the section list corresponding to this boardId when closing section picker
      set({ el: structure.boardPickerHeadNav, att: 'boardId', string: boardId });
      // set the headline to "choose section"
      structure.boardPickerHeadLine.innerText = global.msg.boardPickerChooseSection;
      // set the footer text to "create section"
      structure.boardPickerSlugLine.innerText = global.msg.boardPickerCreateSection;
      // set a global view so we do the right thing on escape
      global.pickerView = 'section';
      // hide the secret toggle in create panel
      changeClass({
        el: structure.boardPickerCreateSecretLabel,
        add: 'hidden',
      });
      logView({ viewType: 'BOARD_SECTION_PICKER' });
    }
  }

  /*
    someone has clicked Save
    me: {
      name: [string, looking for "click"],
    }
    TODO: update background act.save function to turn a singleton into an array so we don't have to do it here and elsewhere
  */

  function save(me) {
    // we don't want to do this on mouseover
    if (me.name === 'click') {
      // don't allow repeated clicks to start repeated saves
      if (!global.hazPinningNow) {
        // set our flag so other clicks don't break anything
        global.hazPinningNow = true;
        // don't close the board picker while saving
        global.stayOpen = true;
        // pinsToSave needs to always be an array; if it has no length, make it one
        const pinsToSave = global.saveMe.length ? global.saveMe : [global.saveMe];
        // what we're saving and where we're saving it
        const saveMe = {
          act: 'save',
          data: {
            // we really ought to fix this in background so if a singleton shows up it gets converted to an array
            pins: pinsToSave,
            board: global.boardId,
            boardName: global.boardName,
            skipTimeCheck: true,
          },
          replyTo: 'save',
        };
        if (global.sectionId) {
          saveMe.data.section = global.sectionId;
        }
        send(saveMe);
        // start spinning
        changeClass({ el: structure.saveAction, add: 'working' });

        // do we need to spin a Save indicator in search results?
        if (global.openBoardPickerFromSearch) {
          // if we're on a visual search button, spin it
          changeClass({ el: global.openBoardPickerFromSearch, add: 'working' });
        }
      }
    }
  }

  /*
  open the unauthed pop-up pin create or repin create box
  {
    method: [h(default)|r|g],
    id: [pinId],
    description: [string],
    url: [page URL],
    media: [image URL]
  }
  */

  function popCreate(me) {
    // requires ctrl in config.localValuesNeeded
    const unauthed = {
      pinCreate: `https://${global.ctrl.server.www}${global.ctrl.server.domain}/pin/create/extension/`,
      rePinCreate: `https://${global.ctrl.server.www}${global.ctrl.server.domain}/pin/%s/repin/x/`,
    };
    // default our method to hoverbutton if not found
    if (!me.method) {
      me.method = 'h';
    }
    const // icky edge case for dual screen users
      dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left,
      dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top,
      // get total available height and width so we can center up
      height = window.outerHeight
        ? window.outerHeight
        : window.defaultStatus.documentElement.clientHeight
        ? window.defaultStatus.documentElement.clientHeight
        : screen.height,
      width = window.outerHeight
        ? window.outerHeight
        : window.defaultStatus.documentElement.clientHeight
        ? window.defaultStatus.documentElement.clientHeight
        : screen.height,
      // size of unauthed pop-up window
      dimensions = {
        height: 900,
        width: 800,
      };

    // compute top and left for popup window; separate const because we need to handle dual screen edge case first
    const left = (width - dimensions.width) / 2 + dualScreenLeft,
      top = (height - dimensions.height) / 2 + dualScreenTop;
    let query;
    // build our query
    if (me.id) {
      // we are repinning, so insert the existing pin id into /pin/[id]/repin/x/
      query = unauthed.rePinCreate.replace(/%s/, me.id) + '?xv=' + global.xv;
    } else {
      // we are making a new pin, so add the url, media, and other parameters
      query =
        unauthed.pinCreate +
        '?url=' +
        encodeURIComponent(me.url) +
        '&media=' +
        encodeURIComponent(me.media) +
        '&xm=' +
        me.method +
        '&xv=' +
        global.xv +
        '&description=' +
        encodeURIComponent(me.description);
    }
    // open pop-up window
    window.open(
      query,
      'pin' + Date.now(),
      'status=no,resizable=yes,scrollbars=yes,personalbar=no,directories=no,location=no,toolbar=no,menubar=no,height=' +
        dimensions.height +
        ',width=' +
        dimensions.width +
        ',left=' +
        left +
        ',top=' +
        top,
    );
  }

  /*
    open the unauthed board picker with image, url, and description

    me: {
      name: [string, must match "click"],
      element: [DOM element],
    }
  */

  function saveUnauthed(me) {
    if (me.name === 'click') {
      // are we saving from search results?
      if (get({ el: me.element, att: 'pinId' })) {
        // pop /repin/x (media is for preview)
        popCreate({
          media: get({ el: me.element, att: 'media' }),
          id: get({ el: me.element, att: 'pinId' }),
        });
      } else {
        // find the right thumb
        const myIndexString = get({ el: me.element, att: 'index' });
        // if we have an index (which may be zero, hence "index string") make a Pin
        if (myIndexString) {
          // convert to a number
          const myIndex = myIndexString - 0;
          // get the right thumb
          const myThumb = global.pinmarkletData.thumb[myIndex];
          // hide the image picker before we change focus
          changeClass({ el: structure.imagePicker, add: ['hidden'] });
          // pop the unauthed board picker with url, media, description, and ID (if found)
          popCreate({
            url: myThumb.url,
            media: myThumb.media,
            description: myThumb.description,
            id: myThumb.id || '',
          });
        }
      }
      // close the overlay
      global.hazRendered = true;
      closeBoardPicker();
    }
  }

  /*
    update the opener, hide the full picker, and save

    me: {
      name: [string, must match "click"],
      element: [DOM element],
    }
  */

  function saveBoardPicker(me) {
    if (me.name === 'click') {
      // if global.selectedThumbs has length, we are working from the image picker
      if ((global.selectedThumbs || []).length) {
        // allow us to close later
        global.hazRendered = true;
        global.saveMe = [];
        global.selectedThumbs.filter((it) => {
          global.saveMe.push(global.pinmarkletData.thumb[it]);
        });
        // after we make a new section or board it will be passed directly to global
        if (!global.boardId) {
          // set board, section, and board name
          global.boardId = get({ el: me.element, att: 'boardId' });
          global.sectionId = get({ el: me.element, att: 'sectionId' });
          global.boardName = get({
            el: me.element,
            att: 'boardName',
          });
        }
        save({
          name: 'click',
        });
        structure.imagePickerFeedbackBoardCover.style.backgroundImage = `url("${
          // always try converted data:URI first
          global.saveMe[0].dataURI || global.saveMe[0].src
        }")`;
        structure.imagePickerFeedbackBoardName.innerText = global.boardName;
        // hide board picker while we try to save this Pin
        changeClass({ el: structure.boardPicker, add: 'hidden' });
        // turn on image picker so we can see the feedback area start to transition
        changeClass({ el: structure.bg, add: 'hazImagePicker' });
        // small timeout here to give display: block a moment to apply
        window.setTimeout(() => {
          // shrink down to just the feedback area
          changeClass({ el: structure.imagePicker, add: 'hazFeedback' });
        }, 10);
      } else {
        global.boardId = get({ el: me.element, att: 'boardId' });
        global.sectionId = get({ el: me.element, att: 'sectionId' });
        structure.boardPickerOpenerCurrent.innerText = global.boardName = get({
          el: me.element,
          att: 'boardName',
        });
        closeBoardPicker();
        save({
          name: 'click',
        });
      }
    }
  }

  /* 
    create a DOM element with attributes; apply styles if requested
    {
      [a tag name]: {
        [an attribute name]: [a string],
        style: {
          [a valid rule name]: [a string]
        }
      }
    }
  */

  function make(me) {
    const tagName = Object.keys(me)[0],
      instructions = me[tagName],
      el = document.createElement(tagName);
    // iterate through keys
    for (let key in instructions) {
      const value = instructions[key];
      // shall we build a text attribute?
      if (typeof value === 'string') {
        // set will do the right thing for html and data attributes
        set({
          el: el,
          att: key,
          string: value,
        });
      }
      // shall we build an inline style object?
      if (typeof value === 'object' && key === 'style') {
        Object.assign(el.style, value);
      }
    }
    return el;
  }

  /*
    when someone clicks the Help link, open the article about saving
    me: {
      event: [event]
      name: [string, looking for 'click']
    }
  */

  function toggleThumbSelect(me) {
    if (me.name === 'click') {
      // do we have an index?
      const myIndexString = get({ el: me.element, att: 'index' });
      if (myIndexString) {
        // convert to a number
        const myIndex = myIndexString - 0;
        // do we already have this in the selected group?
        let found = false;
        global.selectedThumbs.forEach((it, at) => {
          if (it === myIndex) {
            // remove it from the list of selected thumbs
            global.selectedThumbs.splice(at, 1);
            // have we removed the last preview image?
            if (!global.selectedThumbs.length) {
              // hide the preview rack
              changeClass({
                el: structure.imagePickerHead,
                remove: 'hazImages',
              });
            }
            // find the preview thumb we need to remove
            const myRack = structure.preview.getElementsByTagName('SPAN');
            for (let i = 0; i < myRack.length; i = i + 1) {
              // is this the one we want to remove?
              let testIndex = get({ el: myRack[i], att: 'index' }) - 0;
              if (testIndex === it) {
                myRack[i].parentNode.removeChild(myRack[i]);
                break;
              }
            }
            // remove selected state from the thumb we clicked
            changeClass({
              el: me.element,
              remove: 'selected',
            });
            // we found it, so we don't need to add it later
            found = true;
          }
        });

        // we didn't find it.  Should we add?
        if (!found) {
          if (global.selectedThumbs.length < config.limit.grid.selectedThumbs) {
            // unshift the thumb we selected so it shows on the left side of the display
            global.selectedThumbs.unshift(myIndex);
            const previewThumb = make({
              span: {
                className: 'save_thumb',
                // so we can quickly remove this later
                index: myIndex + '',
                style: {
                  backgroundImage:
                    'url("' +
                    (global.pinmarkletData.thumb[myIndex].dataURI ||
                      global.pinmarkletData.thumb[myIndex].media) +
                    '")',
                },
              },
            });
            // add it to the rack of preview images
            structure.preview.prepend(previewThumb);
            // show the prevew rack
            changeClass({
              el: structure.imagePickerHead,
              add: 'hazImages',
            });
            // show selected state on the thumb we clicked
            changeClass({
              el: me.element,
              add: 'selected',
            });
          }
        }
        // don't hide the footer if we have less than ten images
        if (!global.hazSelectAll) {
          // show or hide the footer as appropriate
          if (global.selectedThumbs.length) {
            changeClass({
              el: structure.imagePicker,
              add: 'hazFooter',
            });
          } else {
            changeClass({
              el: structure.imagePicker,
              remove: 'hazFooter',
            });
          }
        }
        if (!global.selectedThumbs.length) {
          changeClass({
            el: structure.imagePickerFootNext,
            add: 'disabled',
          });
        } else {
          changeClass({
            el: structure.imagePickerFootNext,
            remove: 'disabled',
          });
        }
      }
    }
  }

  /*
    do the right things when someone clicks the Select All button
    me: {
      event: [event]
      name: [string, looking for 'click']
    }
  */

  function selectAllThumbs(me) {
    if (me.name === 'click') {
      let i, check, toggleMe;
      // have we selected all images?
      if (global.selectedThumbs.length === global.imagesInPicker) {
        // deselect all selected
        toggleMe = structure.grid.getElementsByClassName('save_selected');
      } else {
        // get all the thumbnails
        check = structure.grid.getElementsByClassName('save_mask');
        toggleMe = [];
        // only select the ones that are already on
        for (i = 0; i < check.length; i = i + 1) {
          if (!check[i].classList.contains('save_selected')) {
            toggleMe.push(check[i]);
          }
        }
      }
      // run toggleThumbSelect as if we had clicked
      for (i = toggleMe.length - 1; i > -1; i = i - 1) {
        toggleThumbSelect({
          element: toggleMe[i],
          name: 'click',
        });
      }
    }
  }

  /*
    visit pin or Pinner
    me: {
      event: [string, looking for "click"],
      element: [DOM element]: {
        name: [string, optional],
        pinId: [string, optional],
      }
    }
  */

  function visit(me) {
    if (me.name === 'click') {
      const myServer = `https://${global.ctrl.server.www}${global.ctrl.server.domain}/`;
      const userName = get({ el: me.element, att: 'userName' });
      // are we visiting a Pinner?
      if (userName) {
        window.open(`${myServer}${userName}`, '_blank');
      } else {
        const pinId = get({ el: me.element, att: 'pinId' });
        // are we visiting a Pin?
        if (pinId) {
          // log the click
          logView({ eventType: 'CLICK', element: 'VISIT_BUTTON' });
          // visit the Pin in a new tab
          window.open(`${myServer}pin/${pinId}/`, '_blank');
        }
      }
    }
  }

  /*
    open the board picker from a search result
  */

  function openBoardPickerFromSearch(me) {
    if (me.name === 'click') {
      const pinId = me.element.parentNode.dataset.pinId || 0;
      if (pinId) {
        // set an ID
        me.id = `update_me_${pinId}`;
        closeBoardPicker();
        // construct a very simple list of pins to be saved (just one, containing a pin ID only)
        global.saveMe = { id: pinId };
        // we'll update the class name and remove the cmd on this
        global.openBoardPickerFromSearch = me.element;
        openBoardPicker({
          name: 'click',
          fromSearch: true,
        });
      }
    }
  }

  /*
    run visual search
    me: {
      x: [optional, default 0, a number between 0 and 1],
      y: [optional, default 0, a number between 0 and 1],
      w: [optional, default 0, a number between 0 and 1],
      h: [optional, default 0, a number between 0 and 1],
      searchThis: [URL],
    }

    To test, try this:
    me.x = 0.5;
    me.y = 0.5;
    me.h = 0.4;
    me.w = 0.4;
    You should see results for the lower right quadrant of the image
  */

  function runSearch(me) {
    if (me.u) {
      // start a query
      const query = {
        act: 'runSearch',
        data: {
          // if all we get is an image URL, search the whole thing
          x: me.x || 0,
          y: me.y || 0,
          w: me.w || 1,
          h: me.h || 1,
          u: me.u,
        },
      };
      send(query);
    } else {
      debug("Can't run search without an image!");
    }
  }

  /*
    listen for changes in the selected area and re-run search when found
  */

  function observeSearch() {
    // current state of everything
    const state = {
      handleLength: global.searchConfig.handleLength,
    };

    // get our drawing context
    const ctx = structure.searchSelect.getContext('2d');

    // set cursor position, constrained within search area
    function getXY(event) {
      // check every time; rect will move around when we scroll or change search image
      const rect = structure.searchSelect.getBoundingClientRect();
      // if x is negative we are off to the left
      state.x = Math.max(event.clientX - rect.left, 0);
      if (state.x) {
        // if x is greater than rect.width we are off to the right
        state.x = Math.min(event.clientX - rect.left, rect.width);
      }
      // if y is negative we are off the top
      state.y = Math.max(event.clientY - rect.top, 0);
      if (state.y) {
        // if y is greater than rect.height we are off the bottom
        state.y = Math.min(event.clientY - rect.top, rect.height);
      }
    }

    // be sure the starting value is less than the ending value
    function normalize() {
      return {
        sx: Math.min(state.sel.sx, state.sel.ex),
        sy: Math.min(state.sel.sy, state.sel.ey),
        ex: Math.max(state.sel.sx, state.sel.ex),
        ey: Math.max(state.sel.sy, state.sel.ey),
      };
    }

    // wrapper for search
    function search(me) {
      runSearch({
        x: me.x / structure.searchSelect.width,
        y: me.y / structure.searchSelect.height,
        w: me.w / structure.searchSelect.width,
        h: me.h / structure.searchSelect.height,
        u: global.searchMe,
      });
    }

    // draw the selection box
    function draw() {
      // clear the whole thing
      ctx.clearRect(0, 0, structure.searchSelect.width, structure.searchSelect.height);
      // outer translucent shape: draw a line around the entire canvas
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(structure.searchSelect.width, 0);
      ctx.lineTo(structure.searchSelect.width, structure.searchSelect.height);
      ctx.lineTo(0, structure.searchSelect.height);
      // inner transparent shape: only the selected area
      // take a copy of state.sel and normalize it
      const toDraw = normalize();
      // set us up for a thin white line with no dashes
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1;
      ctx.setLineDash([]);
      // construct the white selector line -- we are not using drawRect here because we need to fill outside it
      ctx.moveTo(toDraw.sx, toDraw.sy);
      ctx.lineTo(toDraw.ex, toDraw.sy);
      ctx.lineTo(toDraw.ex, toDraw.ey);
      ctx.lineTo(toDraw.sx, toDraw.ey);
      ctx.lineTo(toDraw.sx, toDraw.sy);
      // stroke will close the path so we can fill outside the selected box with 50% black
      ctx.stroke();
      // set background color to 50% black
      ctx.fillStyle = 'rgba(0,0,0,.50)';
      // fill outside the selected area
      ctx.fill('evenodd');
      // draw the selector corners
      ctx.lineWidth = global.searchConfig.handleWidth;
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#fff';
      // adjust size of handles if needed - needs to be in state so we can tell if we are over a handle later
      state.handleLength = global.searchConfig.handleLength;
      // is our selection narrower than the default handle length?
      if (toDraw.ex - toDraw.sx < global.searchConfig.handleLength) {
        state.handleLength = toDraw.ex - toDraw.sx || 1;
      }
      // is our selection shorter than the default handle length?
      if (toDraw.ey - toDraw.sy < state.handleLength) {
        state.handleLength = toDraw.ey - toDraw.sy || 1;
      }
      // round our corners
      ctx.setLineDash([state.handleLength, global.searchConfig.handleWidth / 2]);
      // start drawing
      ctx.beginPath();
      // top right
      ctx.moveTo(toDraw.ex - state.handleLength, toDraw.sy);
      ctx.lineTo(toDraw.ex, toDraw.sy);
      ctx.lineTo(toDraw.ex, toDraw.sy + state.handleLength);
      // bottom right
      ctx.moveTo(toDraw.ex, toDraw.ey - state.handleLength);
      ctx.lineTo(toDraw.ex, toDraw.ey);
      ctx.lineTo(toDraw.ex - state.handleLength, toDraw.ey);
      // bottom left
      ctx.moveTo(toDraw.sx, toDraw.ey - state.handleLength);
      ctx.lineTo(toDraw.sx, toDraw.ey);
      ctx.lineTo(toDraw.sx + state.handleLength, toDraw.ey);
      // top left
      ctx.moveTo(toDraw.sx, toDraw.sy + state.handleLength);
      ctx.lineTo(toDraw.sx, toDraw.sy);
      ctx.lineTo(toDraw.sx + state.handleLength, toDraw.sy);
      // stroke will draw all four corners at once and close the path
      ctx.stroke();
      // do we have any detected areas?
      if (global.detectedArea) {
        ctx.fillStyle = '#fff';
        // get ready to draw some dots
        global.detectedArea.forEach((it, at) => {
          // don't draw a dot in the selected area
          if (at !== state.selectedHelperDot) {
            ctx.beginPath();
            ctx.arc(it.cx, it.cy, global.searchConfig.dotRadius, 2 * Math.PI, false);
            ctx.fill();
          }
        });
      }
    }

    // mouse down: modify selection, move selection, or start new selection?
    structure.searchSelect.onmousedown = (me) => {
      closeBoardPicker();

      // are we over a helper dot?
      if (typeof state.selectedHelperDot === 'number') {
        // switch selector
        let myArea = global.detectedArea[state.selectedHelperDot];
        // adjust selector
        state.sel.sx = myArea.x;
        state.sel.sy = myArea.y;
        state.sel.ex = myArea.x + myArea.w;
        state.sel.ey = myArea.y + myArea.h;
        // redraw so selected area moves
        draw();
        return;
      }
      // if we're not over a dot, all helper dots and detected areas go away
      delete state.helperDot;
      delete global.detectedArea;
      // are we selecting?
      if (state.overSelection) {
        // start a selection move
        state.over = {
          x: state.x - state.sel.sx,
          y: state.y - state.sel.sy,
        };
      } else {
        // are we adjusting?
        if (state.adjustingSelection) {
          // cursor back to crosshairs
          structure.searchSelect.className = '';
          // swap space
          let t;
          // do we know which corner we're pulling on?
          switch (state.adjustingSelection) {
            case 'ne':
              // swap starting Y with ending Y
              t = state.sel.sy;
              state.sel.sy = state.sel.ey;
              state.sel.ey = t;
              break;
            case 'sw':
              // swap starting X for ending X
              t = state.sel.sx;
              state.sel.sx = state.sel.ex;
              state.sel.ex = t;
              break;
            case 'nw':
              // swap starting X and Y
              t = state.sel.sx;
              state.sel.sx = state.sel.ex;
              state.sel.ex = t;
              t = state.sel.sy;
              state.sel.sy = state.sel.ey;
              state.sel.ey = t;
              break;
          }
        } else {
          // if we have nothing selected, start a selection
          state.sel = {
            sx: state.x,
            sy: state.y,
          };
        }
      }
      state.mouseDown = true;
    };

    // mouse movement must be tracked outside the search area
    document.body.onmousemove = (me) => {
      getXY(me);
      if (state.mouseDown) {
        // mouse is down, we are moving the selector
        if (state.overSelection) {
          // we're moving the selection - get current dimensions
          const w = state.sel.ex - state.sel.sx;
          const h = state.sel.ey - state.sel.sy;
          // avoid taking selection outside canvas
          state.sel.sx = Math.max(state.x - state.over.x, 0);
          state.sel.sy = Math.max(state.y - state.over.y, 0);
          state.sel.ex = Math.min(state.sel.sx + w, structure.searchSelect.width);
          state.sel.ey = Math.min(state.sel.sy + h, structure.searchSelect.height);
        } else {
          // if we are not over the selection, we're starting a new one
          state.sel.ex = state.x;
          state.sel.ey = state.y;
        }
        draw();
      } else {
        // mouse is up; are we over a selected area?
        state.overSelection = false;
        state.adjustingSelection = false;
        structure.searchSelect.className = '';
        if (state.sel) {
          if (state.x > state.sel.sx) {
            if (state.x < state.sel.ex) {
              if (state.y > state.sel.sy) {
                if (state.y < state.sel.ey) {
                  // default: we are not over a hot corner
                  state.overSelection = true;
                  // four-arrow move cursor
                  changeClass({ el: structure.searchSelect, add: 'move' });
                  // are we over the north edge?
                  if (state.y < state.sel.sy + state.handleLength) {
                    // are we over the northwest corner?
                    if (state.x < state.sel.sx + state.handleLength) {
                      changeClass({ el: structure.searchSelect, remove: 'move', add: 'nw' });
                      state.adjustingSelection = 'nw';
                      state.overSelection = false;
                    } else {
                      // are we over the northeast corner?
                      if (state.x > state.sel.ex - state.handleLength) {
                        changeClass({ el: structure.searchSelect, remove: 'move', add: 'ne' });
                        state.adjustingSelection = 'ne';
                        state.overSelection = false;
                      }
                    }
                  } else {
                    // are we over the south edge?
                    if (state.y > state.sel.ey - state.handleLength) {
                      // are we over the southwest corner?
                      if (state.x < state.sel.sx + state.handleLength) {
                        changeClass({ el: structure.searchSelect, remove: 'move', add: 'sw' });
                        state.adjustingSelection = 'sw';
                        state.overSelection = false;
                      } else {
                        // are we over the southeast corner?
                        if (state.x > state.sel.ex - state.handleLength) {
                          changeClass({ el: structure.searchSelect, remove: 'move', add: 'se' });
                          state.adjustingSelection = 'se';
                          state.overSelection = false;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          // if we are not over a selection or a hot corner, check for dots
          if (!state.overSelection && !state.adjustingSelection) {
            if (state.helperDot) {
              state.selectedHelperDot = false;
              state.helperDot.forEach((it, at) => {
                if (state.x > it.sx && state.x < it.ex && state.y > it.sy && state.y < it.ey) {
                  changeClass({ el: structure.searchSelect, remove: 'move', add: 'pointer' });
                  state.selectedHelperDot = at;
                }
              });
            }
          }
        }
      }
    };

    // run search every time we mouse up (timing on this may want some optimization)
    structure.searchSelect.onmouseup = (me) => {
      // normalize our selection, in case our ending X or Y is less than starting
      state.sel = normalize();
      state.mouseDown = false;
      // search the currently-selected area
      search({
        x: state.sel.sx,
        y: state.sel.sy,
        w: state.sel.ex - state.sel.sx,
        h: state.sel.ey - state.sel.sy,
      });
      // don't bubble this event out any further
      me.stopPropagation();
    };

    document.body.onmouseup = (me) => {
      // if we mouse up outside the search area, take note
      state.mouseDown = false;
    };

    // for screenshot searches, detectInterestingThings will try to narrow down the selection
    // because otherwise all we get are a bunch of screenshots in results
    function checkAutoSelect() {
      // detection has been run on the full-sized image so we will need to convert all coordinates to fit inside the search area
      const hmod = structure.searchSelect.width / window.outerWidth;
      const vmod = structure.searchSelect.height / window.outerHeight;
      if (global.detectedArea && global.detectedArea.length) {
        // hard-reset this or the area we're trying to draw will be instantly cleared
        global.shouldClearSearchSelection = false;
        // space for helper dots
        state.helperDot = [];
        // always select the best area
        state.selectedHelperDot = 0;
        // convert absolute values to fit our search area
        global.detectedArea.forEach((it) => {
          if (!it.isFake) {
            it.x = it.x * hmod;
            it.y = it.y * vmod;
            it.w = it.w * hmod;
            it.h = it.h * vmod;
            // center x and y
            it.cx = Math.round(it.x + it.w / 2);
            it.cy = Math.round(it.y + it.h / 2);
            state.helperDot.push({
              // size of dot for mouseover check
              sx: it.cx - global.searchConfig.dotRadius,
              ex: it.cx + global.searchConfig.dotRadius,
              sy: it.cy - global.searchConfig.dotRadius,
              ey: it.cy + global.searchConfig.dotRadius,
              // size of area to be drawn
              x: it.x,
              y: it.y,
              w: it.w,
              h: it.h,
            });
          }
        });
        // default selection is area 0
        state.sel = {
          sx: global.detectedArea[0].x,
          sy: global.detectedArea[0].y,
          ex: global.detectedArea[0].x + global.detectedArea[0].w,
          ey: global.detectedArea[0].y + global.detectedArea[0].h,
        };
        // draw
        draw();
        // search the default area
        search({
          x: state.sel.sx,
          y: state.sel.sy,
          w: state.sel.ex - state.sel.sx,
          h: state.sel.ey - state.sel.sy,
        });
      } else {
        // test this again in 100ms
        window.setTimeout(checkAutoSelect, 100);
      }
    }
    checkAutoSelect();

    // global.kickAutoSelect will be set when a result is clicked
    function kickChecker() {
      if (global.kickAutoSelect) {
        global.kickAutoSelect = false;
        checkAutoSelect();
      }
      // test this again in 100ms
      window.setTimeout(kickChecker, 100);
    }
    kickChecker();
  }

  /*
    detect interesting things in an image
  */

  function detectInterestingThings(me) {
    const detect = {};
    // TODO: call from inside this function and not separately after we load
    function downsample(me) {
      function rgbToHsv(me) {
        // set red, green, and blue to numbers between 0 and 1
        let r = me.r / 255,
          g = me.g / 255,
          b = me.b / 255;
        // find the highest and lowest
        let max = Math.max(r, g, b),
          min = Math.min(r, g, b);
        // find the difference between highest and lowest
        const d = max - min;
        // saturation and value may be set from what we know
        let h,
          s = max == 0 ? 0 : d / max,
          v = max;

        // determine the hue
        if (max == min) {
          h = 0; // achromatic
        } else {
          // which of r, g, or b is highest?
          switch (max) {
            case r:
              h = (g - b) / d + (g < b ? 6 : 0);
              break;
            case g:
              h = (b - r) / d + 2;
              break;
            case b:
              h = (r - g) / d + 4;
              break;
          }
          // get us a number between 0 and 1
          h = h / 6;
        }

        // express as degrees
        h = Math.round(h * 360);
        // express as percentage
        s = Math.round(s * 100);
        v = Math.round(v * 100);
        /*
        // cut down the color space to 14,400 from 3,600,000
        h = Math.round(h / 10) * 10; // 36 possible hues
        s = Math.round(s / 5) * 5; // 20 possible saturations
        v = Math.round(v / 5) * 5; // 20 possible values
        */
        return { h, s, v };
      }
      // when looking at neighbors, apply these to current row and column to get neighbor's row and column
      const mod = {
        r: [-1, 0, 1, 1, 1, 0, -1, -1],
        c: [1, 1, 1, 0, -1, -1, -1, 0],
      };
      // get ready to track our inventory as an object and as an array
      const colorInventoryObject = {},
        colorInventoryArray = [];
      // build a CANVAS tag at the right size, get context
      const canvas = make({ CANVAS: {} });
      canvas.height = me.h;
      canvas.width = me.w;
      const ctx = canvas.getContext('2d');
      // draw our image
      ctx.drawImage(me.img, 0, 0, me.w, me.h);
      // get our image data
      const imageData = ctx.getImageData(0, 0, me.w, me.h).data;
      /*
        We're going to analyze a limited sample of the image; here's how:
        - swatchLimit: what is the square root of the maximum safe number of swatches we can analyze without a call stack size error?
          * for now, let's call it 80 x 80 = 6400
          * note: 71x71 = 5049
        - swatchSize: the larger of image width / swatchLimit and image height / swatchLimit
        - swatchMin: what's the miniumum size of a swatch, in case we have a tiny image to search
      */
      detect.swatchSize = Math.max(
        Math.min(
          Math.floor(me.w / config.detect.swatchLimit),
          Math.floor(me.h / config.detect.swatchLimit),
        ),
        config.detect.swatchMin,
      );
      debug('Swatch size: ' + detect.swatchSize);
      // sample some swatches, counting colors found along the way
      detect.sample = [];
      for (let r = 0; r < me.h; r = r + detect.swatchSize) {
        const tempArray = [];
        for (let c = 0; c < me.w; c = c + detect.swatchSize) {
          const pix = (r * me.w + c) * 4;
          const hex =
            '#' +
            ('00' + imageData[pix].toString(16)).substr(-2, 2) +
            ('00' + imageData[pix + 1].toString(16)).substr(-2, 2) +
            ('00' + imageData[pix + 2].toString(16)).substr(-2, 2);
          const hsv = rgbToHsv({ r: imageData[pix], g: imageData[pix + 1], b: imageData[pix] });
          // do we need to init an inventory object?
          if (!colorInventoryObject[hex]) {
            colorInventoryObject[hex] = { t: 0 };
          }
          // add to count
          colorInventoryObject[hex].t = colorInventoryObject[hex].t + 1;
          // we're pushing an object and not a value here because we will also set flags like isBg on the same array element later
          tempArray.push({ hex: hex, hsv: hsv });
        }
        detect.sample.push(tempArray);
      }
      // push to an array for sorting
      for (let k in colorInventoryObject) {
        colorInventoryArray.push({
          k: k,
          t: colorInventoryObject[k].t,
        });
      }
      // sort so we get the most common colors on top
      colorInventoryArray.sort(function (a, b) {
        if (a.t < b.t) {
          return 1;
        }
        if (a.t > b.t) {
          return -1;
        }
        return 0;
      });
      // get the background color
      const bgHsv = { h: 0, s: 0, v: 0 };
      // tag the top detect.isBackgroundThreshold colors as background
      for (let r = 0; r < detect.sample.length; r = r + 1) {
        for (let c = 0; c < detect.sample[0].length; c = c + 1) {
          const hex = detect.sample[r][c].hex;
          for (let i = 0; i < config.detect.isBackgroundThreshold; i = i + 1) {
            if (hex === colorInventoryArray[i].k) {
              detect.sample[r][c].isBg = true;
              break;
            }
          }
          if (!detect.sample[r][c].isBg) {
            if (detect.sample[r][c].hsv.h === bgHsv.h && detect.sample[r][c].hsv.v === bgHsv.v) {
              detect.sample[r][c].isBg = true;
            }
          }
        }
      }
      // also tag swatches that have config.detect.neighborScanLimit or more background neighbors
      for (let r = 0; r < detect.sample.length; r = r + 1) {
        for (let c = 0; c < detect.sample[0].length; c = c + 1) {
          if (!detect.sample[r][c].isBg) {
            let bgCounter = 0;
            // check neighbors
            for (let i = 0; i < 8; i = i + 1) {
              var tr = r + mod.r[i];
              var tc = c + mod.c[i];
              if (tr > -1 && tc > -1 && tr < detect.sample.length && detect.sample[0].length) {
                if (typeof detect.sample[tr][tc] === 'object') {
                  if (detect.sample[tr][tc].isBg) {
                    bgCounter = bgCounter + 1;
                    // bigger numbers will select smaller rectangles in noisy pages like GitHub
                    if (bgCounter > config.detect.neighborScanLimit) {
                      detect.sample[r][c].isBgNext = true;
                      break;
                    }
                  }
                }
              }
            }
          }
        }
      }
      // add swatches from bgNext array to isBg; must be done on separate pass
      for (let r = 0; r < detect.sample.length; r = r + 1) {
        for (let c = 0; c < detect.sample[0].length; c = c + 1) {
          if (detect.sample[r][c].isBgNext) {
            detect.sample[r][c].isBg = true;
          }
        }
      }
    }

    // minRow and minCol have been set to maximum; maxRow and maxCol have been set to zero
    function flood(r, c) {
      let i, tr, tc;
      if (floodMe[r + '/' + c]) {
        // have we found new min/max row/col values?
        if (r < minRow) {
          minRow = r;
        }
        if (r > maxRow) {
          maxRow = r;
        }
        if (c < minCol) {
          minCol = c;
        }
        if (c > maxCol) {
          maxCol = c;
        }
        // tag this as already having been flooded, so we don't recurse it again later
        floodMe[r + '/' + c] = false;
        // decrease the master count of swatches left to flood
        toGo = toGo - 1;
        // check for neighbors that might need flooding
        for (i = 0; i < 4; i = i + 1) {
          tr = r + mod.r[i];
          tc = c + mod.c[i];
          if (floodMe[tr + '/' + tc] === true) {
            flood(tr, tc);
          }
        }
      }
    }

    // find the next thing we can flood and start flooding it
    function getFloodable() {
      let r, c, k;
      maxRow = 0;
      maxCol = 0;
      minRow = detect.sample.length;
      minCol = detect.sample[0].length;
      // start flooding in the first available swatch
      for (k in floodMe) {
        if (floodMe[k]) {
          r = k.split('/')[0] - 0;
          c = k.split('/')[1] - 0;
          flood(r, c);
          break;
        }
      }
    }

    // Done finding things. what's the best area to show?
    function whatResult() {
      let i, k, th, tw, minSelectSize, skip;
      // we want our minimum size for dot selectors to be 2x handle length
      minSelectSize = (global.searchConfig.handleLength / detect.swatchSize) * 2;
      // apply some pinmarklet-ish logic to discovered areas
      for (i = areaFound.length - 1; i > -1; i = i - 1) {
        k = areaFound[i];
        areaFound[i].score = k.h * k.w;
        // don't select tiny things
        if (k.h < minSelectSize || k.w < minSelectSize) {
          areaFound.splice(i, 1);
        } else {
          th = k.h;
          tw = k.w;
          // don't select ads
          if (tw > th * 3) {
            areaFound.splice(i, 1);
            skip = true;
          }
          if (th > tw * 3) {
            th = tw * 3;
          }
          if (!skip) {
            areaFound[i].score = th * tw;
          }
        }
      }
      // sort by score
      areaFound.sort((a, b) => {
        if (a.score < b.score) {
          return 1;
        }
        if (a.score > b.score) {
          return -1;
        }
        return 0;
      });
      // save an area to global.select
      // observe will be watching for this change and select an area accordingly
      global.detectedArea = [];
      // only return areas that have a score greater than ten per cent of the highest found
      areaFound.forEach((it) => {
        if (it.score > areaFound[0].score * config.detect.minQuality) {
          global.detectedArea.push({
            x: it.c * detect.swatchSize,
            y: it.r * detect.swatchSize,
            h: it.h * detect.swatchSize,
            w: it.w * detect.swatchSize,
          });
        }
      });
      // if we didn't find anything, select most of the page
      if (!global.detectedArea.length) {
        global.detectedArea.push({
          x: 10,
          y: 10,
          w: structure.searchSelect.width - 20,
          h: structure.searchSelect.height - 20,
          // we will not want a selector dot here
          isFake: true,
        });
      }
      return;
    }

    // get the next area and start flooding it
    function getArea() {
      getFloodable();
      // bump to end of execution thread so recursing finishes
      window.setTimeout(() => {
        areaFound.push({
          h: maxRow - minRow,
          w: maxCol - minCol,
          r: minRow,
          c: minCol,
        });
        if (toGo) {
          // lather, rinse, repeat
          getArea();
        } else {
          // return best area
          whatResult();
        }
      }, 10);
    }

    config.detect = {
      // what's the largest number of swatches per side?
      swatchLimit: 64,
      // what's the minimum size per swatch?
      swatchMin: 2,
      // how many neighbors should we look at to determine contiguous areas?
      neighborScanLimit: 1,
      // how many background-colored neighbors shoudl we look for to determine whether a swatch is background?
      isBackgroundThreshold: 3,
      // only return areas if they are greater than this number times the best score found
      minQuality: 0.1,
    };

    function run() {
      // floodMe lets us detect "floodability" without constantly checking if we're on a valid sample swatch
      for (let r = 0; r < detect.sample.length; r = r + 1) {
        for (let c = 0; c < detect.sample[0].length; c = c + 1) {
          if (!detect.sample[r][c].isBg) {
            floodMe[r + '/' + c] = true;
            toGo = toGo + 1;
          }
        }
      }
      // start getting areas
      getArea();
    }

    let minRow,
      minCol,
      maxRow,
      maxCol,
      toGo = 0,
      floodMe = {},
      areaFound = [],
      mod = {
        r: [-1, 0, 1, 0],
        c: [0, 1, 0, -1],
      };

    // reload our image URL
    const img = new Image();
    img.onload = function () {
      downsample({ img: this, h: this.naturalHeight, w: this.naturalWidth });
      run();
    };
    img.src = me.img;
  }

  /*
    render search form with first image
    me: {
      data: {
      }
    }
  */

  function renderSearch(me) {
    // TODO: log the view
    if (me.data) {
      // background and boardPickerOpener are okay to directly manipulate styles
      structure.bg.style.display = 'block';
      structure.boardPickerOpener.style.display = 'none';
      changeClass({
        el: structure.bg,
        // board picker may be up; hide it to be safe
        remove: 'hazBoardPicker',
        add: 'hazSearch',
      });
      // don't automatically close; we've rendered something visible
      window.clearTimeout(global.safetyTimer);
      // don't close if we mouse out of the interface
      structure.bg.dataset.cmd = '';
      // screen captures won't know how big they are
      if (me.data.method === 'r') {
        me.data.width = window.outerWidth;
        me.data.height = window.outerHeight;
      }
      // set the image we're searching as background on searchInside
      structure.searchInside.style.backgroundImage = `url("${me.data.searchMe}")`;
      // pass to global so we can search outside this function
      global.searchMe = me.data.searchMe;
      // scale the searchable area so it is no taller than maxHeight and no wider than maxWidth,
      // so we can show increase the results area for landscape images
      const maxHeight = 360;
      const maxWidth = 360;
      // selector height is the smaller of maxHeight and scaled height
      const scaledHeight = Math.min(
        maxHeight,
        Math.round((maxWidth * me.data.height) / me.data.width),
      );
      // selector width = the width scaled against scaledHeight
      const scaledWidth = Math.round((scaledHeight * me.data.width) / me.data.height);
      // set the main block's height
      structure.searchInside.style.height = `${scaledHeight}px`;
      // set container height
      structure.searchResults.style.height = `${590 - scaledHeight}px`;
      // set the canvas height and width to a number
      structure.searchSelect.height = `${scaledHeight}`;
      structure.searchSelect.width = `${scaledWidth}`;
      // tell the search observer that this is a new set of results, so abandon old search selection
      global.shouldClearSearchSelection = true;
      // method r = right-click, meaning we are searching a screen shot
      if (me.data.method === 'r') {
        // after we detect something interesting, observeSearch will run search
        detectInterestingThings({ img: me.data.searchMe, h: scaledHeight, w: scaledWidth });
      } else {
        // start with a fake detected area for grid or hoverbutton
        global.detectedArea = [
          {
            x: 10,
            y: 10,
            w: structure.searchSelect.width - 20,
            h: structure.searchSelect.height - 20,
            isFake: true,
          },
        ];
        // if this is a refinement from the grid, re-run the bit that draws the selector when results appear
        if (me.data.method === 'g') {
          global.kickAutoSelect = true;
        }
      }

      // log the view once per interface render
      if (!global.hazLoggedSearchView) {
        global.hazLoggedSearchView = true;
        // log the view only once per Save overlay render
        logView({
          viewType: 'VISUAL_SEARCH',
        });
        // limits and settings
        global.searchConfig = {
          // width of hotspot
          handleWidth: 4,
          // maximum handle length
          handleLength: 12,
          // handle padding
          handlePad: 4,
          // dots over selected areas
          dotRadius: 6,
        };
        // only start observing search once per render
        observeSearch();
      }
    }
  }

  /*
    re-render the main image using thumbnail image element and data attributes, in preperation to searching again
    me: {
      element: [DOM element with searchMe, height, and width attributes]
    }
  */

  function refineSearch(me) {
    if (me.name === 'click') {
      structure.searchResultsGrid.innerHTML = '';
      renderSearch({
        data: {
          searchMe: me.element.parentNode.dataset.searchMe,
          // g: this search originated with the grid of results from pinmarklet or a previous search
          method: 'g',
          height: me.element.parentNode.dataset.height,
          width: me.element.parentNode.dataset.width,
        },
      });
    }
  }

  /*
    functions listed under cmd are called by user actions such as click or hover
  */

  const cmd = {
    allowClose,
    close,
    closeImagePicker,
    closeModeCreate,
    closeSectionPicker,
    getAuthHelp,
    getSaveHelp,
    backToImagePicker,
    makeBoardOrSection,
    openBoardPickerFromImagePicker,
    openModeCreate,
    openSectionPicker,
    save,
    saveBoardPicker,
    saveUnauthed,
    selectAllThumbs,
    toggleThumbSelect,
    visit,
    openBoardPickerFromSearch,
    refineSearch,
  };

  /*
    take an event, the event's name, and fire off a command if found
    me : {
      event: event,
      name: [click, move, over, etc]
    }
  */

  function getCmd(me) {
    // what did we just click on?
    let el = seek(me.event);
    // does it have an associated command?
    let command = get({ el: el, att: 'cmd' });
    // do we have a command ready to run?
    if (typeof cmd[command] === 'function') {
      // pass the element and event name to the command
      cmd[command]({ element: el, name: me.name });
    }
  }

  /*
    handle click
    me: {
      event: [an event]
    }
  */

  function click(me) {
    // pass the click event over to getCmd with the name "click"
    getCmd({ event: me, name: 'click' });
  }

  /*
    handle keystrokes
    me: {
      event: [an event]
    }
  */

  function keydown(me) {
    // in the future we may pass the keydown event over to getCmd
    // for now we're going to close on escape
    if (me.keyCode === 27) {
      // if we've opened from search, only close the board picker and not the whole UI
      if (global.openBoardPickerFromSearch) {
        global.openBoardPickerFromSearch = false;
        closeBoardPicker();
      } else {
        global.hazRendered = true;
        doClose();
      }
    }
  }

  /*
    handle pointer move
    me: {
      event: [an event]
    }
  */

  function move(me) {
    // pass the move event over to getCmd with the name "move"
    getCmd({ event: me, name: 'move' });
  }

  /*
    handle mouse over
    me: {
      event: [an event]
    }
  */

  function over(me) {
    // pass the event over to getCmd with the name "over"
    getCmd({ event: me, name: 'over' });
  }

  /*
    using a DOM parser, clean troublesome characters and extra whitespace from strings
    me: {
      str: [string]
    }
  */

  function filterWhiteSpace(me) {
    // note: this won't work for the background process if we switch to a service worker
    return new DOMParser()
      .parseFromString(me.str, 'text/html')
      .documentElement.textContent.replace(/(\n|\r)/g, '')
      .replace(/ +(?= )/g, '');
  }

  /*
  build HTML structure from a JSON template and add it to a parent node
  {
    template: {
      hd: {
        hdMsg: {},
        x: {
          cmd: "close"
        }
      },
      grid: {}
    },
    addTo: document.body,
    prepend: [bool],
  }
  */

  function addFromTemplate(me) {
    for (const key in me.template) {
      const value = me.template[key];
      if (value) {
        //  4.1.114: values can be numbers as well as strings
        if (typeof value === 'string' || typeof value === 'number') {
          // do we need to add some class names?
          if (key === 'addClass') {
            const classNames = value.split(' ');
            // class names will be [config.me]_[theClassName]
            classNames.map((name) => {
              me.addTo.className = `${me.addTo.className} ${config.me}_${name}`;
            });
          } else {
            // we needed a way to create non-SPAN tags
            if (key === 'text') {
              me.addTo.innerText = filterWhiteSpace({ str: value });
            } else {
              if (key !== 'tag') {
                set({
                  el: me.addTo,
                  att: key,
                  // if we get a number here, turn it into a string
                  string: `${value}`,
                });
              }
            }
          }
        } else {
          // shall we bulk-assign all style rules?
          if (key === 'style') {
            Object.assign(me.addTo.style, value);
          } else {
            // create a new container template
            const container = {
              [value.tag || 'SPAN']: {
                className: `${config.me}_${key}`,
              },
            };
            // build the container
            const child = make(container);
            // add it to the parent
            if (me.prepend) {
              me.addTo.prepend(child);
            } else {
              me.addTo.appendChild(child);
            }
            // add this to our global structure object if it does not already exist
            if (!structure[key]) {
              structure[key] = child;
              // fill with translated text if needed
              if (global.msg[key]) {
                const text = global.msg[key];
                if (child.tagName === 'INPUT') {
                  // placeholder
                  child.placeholder = text;
                } else {
                  // string in non-input element
                  child.innerText = filterWhiteSpace({ str: text });
                }
              }
            }
            // recurse until done
            addFromTemplate({ template: value, addTo: child });
          }
        }
      }
    }
  }

  /*
    build a stylesheet from a SASS-like JSON object:
    {
      body: {
        background: "#fff",
        margin: "0",
        padding: "0"
      }
    }
  */

  function buildStyleFrom(me) {
    // rules will go here
    let css = '';
    // recurse through an object
    const buildRulesFrom = (input) => {
      // start with an empty ruleset
      let ruleset = '';
      // inventory keys in object we are crawling
      for (let key in input.obj) {
        // got an object? seek its children
        if (typeof input.obj[key] === 'object') {
          // append this key to existing selector for the next set of children
          let nextSelector = input.selector + ' ' + key;
          // apply selectors that start with ampersands to their parents
          nextSelector = nextSelector.replace(/ &/g, '');
          // replicate this selector to all elements separated by commas
          nextSelector = nextSelector.replace(/,/g, ', ' + input.selector);
          // recurse the children
          buildRulesFrom({
            obj: input.obj[key],
            selector: nextSelector,
          });
        } else {
          // this is a key-value pair so make a rule
          if (!ruleset) {
            // do we need to start a new ruleset?
            ruleset = ' {\n';
          }
          // add this rule
          ruleset = ruleset + '  ' + key + ': ' + input.obj[key] + ';\n';
        }
      }
      // we are done looking at this object.
      // If we started a ruleset, finish it and add it to our CSS.
      if (ruleset) {
        ruleset = ruleset + '}\n';
        css = css + input.selector + ruleset;
      }
    };
    // usually our main object in config but could be
    // something else from an experiment
    buildRulesFrom({ obj: me, selector: '' });
    // start our styleshseet
    const style = document.createElement('style');
    // set the type
    style.setAttribute('type', 'text/css');
    // find the vendor prefix
    // moz = firefox, webkit = chrome, ms = ie / edge
    // note: we are NOT doing anything special for -o-, which is pre-webkit Opera
    const vendorPrefixPattern = /^(moz|webkit|ms)(?=[A-Z])/i;
    let vendorPrefix = '';
    // loop through all existing style rules on document.body
    for (let rule in document.body.style) {
      // did you find one?
      if (vendorPrefixPattern.test(rule)) {
        // return -ms- or -webkit- or -moz-
        vendorPrefix = '-' + rule.match(vendorPrefixPattern)[0].toLowerCase() + '-';
        // got it, we're done
        break;
      }
    }
    // each rule gets our global key at its root
    css = css.replace(/\._/g, '.' + config.me + '_');
    // apply vendor prefix anywhere we have specified it in our input object
    css = css.replace(/%prefix%/g, vendorPrefix);
    // add rules to style node
    style.appendChild(document.createTextNode(css));
    // add style node to page
    document.head.appendChild(style);
  }

  /*
    a new board has been successfully created
    me: {
      data: [object; API reply],
    }
  */

  function newBoardWin(me) {
    // update opener button with our new board ID
    global.boardId = me.data.id;
    global.boardName = me.data.name;
    // hint to Pinner: we are saving to your new board
    structure.boardPickerOpenerCurrent.innerText = me.data.name;
    // close the board picker
    closeBoardPicker();
    if ((global.selectedThumbs || []).length) {
      // update the image picker
      saveBoardPicker({
        name: 'click',
      });
    } else {
      // update the inline board opener
      save({
        name: 'click',
      });
    }

    // close create mode (in case we have a persistent board picker such as Search)
    closeModeCreate({ name: 'click' });
    // show or hide the secret helper
    const isSecret = {
      secret: { addClass: 'hidden' },
    };
    if (me.data.privacy === 'secret') {
      isSecret.secret = {};
    }
    // add new board to the top of Top Choices in case we are persisting the board picker
    const myBoardList = document.getElementsByClassName('save_boardPickerTopList')[0];
    addFromTemplate({
      addTo: myBoardList,
      prepend: true,
      template: {
        [me.data.id]: {
          addClass: 'item',
          boardName: me.data.name.toLowerCase(),
          cover: {},
          info: {
            text: me.data.name,
          },
          helpers: {
            isSecret,
          },
          saveButton: {
            addClass: 'button save',
            text: global.msg.saveAction,
          },
          mask: {
            cmd: 'saveBoardPicker',
            boardId: me.data.id,
            boardName: me.data.name,
          },
        },
      },
    });
    // remove last board from top list so there are only three
    myBoardList.removeChild(myBoardList.lastChild);
  }

  /*
    Show sad message on save failure, with link to Help article
    me: {
      data: {
        message: [details from API],
        message_detail: [details from API],
      }
    }
  */

  function newPinFail(me) {
    set({
      el: structure.afterSave,
      att: 'cmd',
      string: 'getSaveHelp',
    });
    structure.afterSave.innerText = global.msg.help;
    structure.boardPickerOpenerLabel.innerText = (me.data || {}).message || global.msg.msgOops;
    structure.boardPickerOpenerCurrent.innerText =
      (me.data || {}).message_detail || global.msg.msgPinFail;
    changeClass({ el: structure.boardPickerOpener, add: ['feedback', 'fail'] });
    // the user can now dismiss the save iframe
    window.setTimeout(() => {
      global.stayOpen = false;
    }, config.delayAfterSave);
  }

  /*
    show happy message on save success, with link to see new Pin
    me: {
      data: {
        id: [number]
      }
    }
  */

  function newPinWin(me) {
    // hoverboard opener: update visit button
    structure.afterSave.innerText = global.msg.visitButton;
    set({ el: structure.afterSave, att: 'pinId', string: me.data.id });
    // hoverboard opener: start twirling
    changeClass({ el: structure.saveAction, add: 'done', remove: 'working' });
    // image picker: set new pin ID in visit button
    set({ el: structure.imagePickerFeedbackVisitButton, att: 'pinId', string: me.data.id });
    // image picker: enable visit button
    changeClass({ el: structure.imagePickerFeedbackVisitButton, remove: 'disabled' });
    logView({ viewType: 'PIN_CREATE_SUCCESS' });

    // did we save from visual search?
    if (global.openBoardPickerFromSearch) {
      changeClass({ el: global.openBoardPickerFromSearch, remove: 'working', add: 'done' });
      global.openBoardPickerFromSearch.dataset.cmd = 'visit';
      // experiment: browser_extension_share_after_save
      global.openBoardPickerFromSearch.dataset.canShare = 'true';
      global.openBoardPickerFromSearch.dataset.pinId = me.data.id;
      global.openBoardPickerFromSearch = false;
      // allow more pins to happen
      global.hazPinningNow = false;
    } else {
      // update hoverboard opener
      window.setTimeout(() => {
        // hoverboard opener: show "saved to" in hoverboard opener
        structure.boardPickerOpenerLabel.innerText = global.msg.boardPickerSuccessLabel;
        // hoverboard opener: show red checkbox instead of Pinterest logo
        changeClass({ el: structure.boardPickerOpener, add: 'feedback' });
        // get ready to listen for mouse move on background to close whole overlay
        window.setTimeout(() => {
          // any mouse move on background will now close the overlay
          global.stayOpen = false;
          global.hazRendered = true;
          // short pause to see results
        }, config.delayAfterSave);
        // short pause to see spinner
      }, config.delayAfterPinResults);
    }
  }

  /*
    a new section has been successfully created
    me: {
      [object; data from API]
    }
  */

  function newSectionWin(me) {
    // update opener button with our board and new section ID
    global.boardId = me.data.board.id;
    // yes, this is the section name, not the board name
    global.boardName = me.data.title;
    global.sectionId = me.data.id;
    // hint to Pinner: we are saving to your new section
    structure.boardPickerOpenerCurrent.innerText = me.data.title;
    // close the full picker while we're working
    closeBoardPicker();
    if ((global.selectedThumbs || []).length) {
      // update the image picker
      saveBoardPicker({
        name: 'click',
      });
    } else {
      // update the inline board opener
      save({
        name: 'click',
      });
    }

    // close create mode (in case we have a persistent board picker)
    closeModeCreate({ name: 'click' });

    // add new section to picker
    const mySectionList = document.getElementsByClassName(
      'save_' + me.data.board.id + '_sections',
    )[0];
    addFromTemplate({
      prepend: true,
      template: {
        [me.data.board.id]: {
          addClass: 'item',
          sectionTitle: me.data.title,
          info: {
            addClass: 'isSectionName',
            text: me.data.title,
          },
          saveButton: {
            addClass: 'button save',
            text: global.msg.saveAction,
            cmd: 'saveBoardPicker',
            boardId: me.data.board.id,
            boardName: me.data.title,
            sectionId: me.data.id,
          },
        },
      },
      addTo: mySectionList,
    });

    // reorder so the section list starts with the board name
    const kids = mySectionList.children;
    // clone to move
    const tempBoardCopy = kids[1].cloneNode(true);
    // move clone
    kids[0].parentNode.insertBefore(tempBoardCopy, kids[0]);
    // remove original
    kids[2].parentNode.removeChild(kids[2]);
  }

  /*
    render small image picker
    me: {
      data: {
        rich: {
          url: [string],
          ...
        },
        auth: [bool],
        thumb: [ {
            url: [string],
            media: [string],
            description: [string],
            id: [string]
        } ],
        funnel_uuid: [string],
        funnel_url: [string],
      }
    }
  */

  function renderPinmarkletData(me) {
    if (me.data) {
      global.pinmarkletData = me.data;
      global.selectedThumbs = [];
      global.imagesInPicker = 0;
      // background and boardPickerOpener are okay to directly manipulate styles
      structure.bg.style.display = 'block';
      structure.boardPickerOpener.style.display = 'none';
      // board picker may be up frmo hoverboard opener, so hide it to be safe
      changeClass({
        el: structure.bg,
        remove: 'hazBoardPicker',
      });
      // don't automatically close; we've rendered something visible
      window.clearTimeout(global.safetyTimer);
      if (me.data.thumb.length > 1 || !me.data.auth) {
        // we have two or more images, so we will need to show the image picker
        for (let i = 0; i < 3; i = i + 1) {
          addFromTemplate({
            template: {
              col: {
                id: 'column_' + i,
              },
            },
            addTo: structure.grid,
          });
        }
        let cc = 0;
        me.data.thumb.forEach((it, at) => {
          // only add a thumb if we have a source attribute
          if (it.src) {
            const template = {
              thumb: {
                image: {
                  tag: 'img',
                  // img src takes dataURI so it will show
                  src: it.dataURI || it.src,
                },
                checkbox: {
                  checkmark: {
                    addClass: 'checkmark',
                  },
                },
                mask: {
                  // add the index number
                  index: '' + at,
                  cmd: 'toggleThumbSelect',
                },
              },
            };
            // on click we're going to open the pop-up pin builder
            if (!me.data.auth) {
              template.thumb.mask.cmd = 'saveUnauthed';
            }
            addFromTemplate({
              template,
              addTo: document.getElementById(`column_${cc}`),
            });
            // add to our count
            global.imagesInPicker++;
            // set next column
            cc = (cc + 1) % 3;
          }
        });
        // if we have ten or less, show the footer and light up Select All
        if (global.imagesInPicker <= config.limit.grid.selectedThumbs) {
          global.hazSelectAll = true;
          changeClass({ el: structure.imagePicker, add: 'hazFooter' });
          changeClass({ el: structure.imagePickerFoot, add: 'hazSelectAll' });
        }
        changeClass({
          el: structure.bg,
          add: ['fromImagePicker', 'hazImagePicker'],
        });
        if (!me.data.auth) {
          // hide the subheader and footer
          changeClass({
            el: structure.imagePicker,
            remove: ['hazFooter'],
            add: ['hideSubCaption'],
          });
        }
        logView({ viewType: 'IMAGE_PICKER' });
      } else {
        // we have zero or one images and we are authed
        // show board picker and image picker (so board picker has a background) but hide the actual image picker
        changeClass({
          el: structure.bg,
          add: ['hazBoardPicker', 'hazImagePicker', 'hazOnlyOneImage'],
        });
        // push thumb zero onto the selectedThumbs stack
        global.selectedThumbs.push(0);
        // run the command that normally runs when we click the Next arrow
        openBoardPickerFromImagePicker({ name: 'click' });
      }
    }
  }

  /* 
    build our structure
    me: {
      data: {
        url: [page url],
        media: [media URL],
        id: [exsting pin ID],
        description: [string],
        top: [number],
        left: [number],
        boards: [array],
      }
    }
    TODO: build a "restyle" utility so we don't have to repeatedly say structure.me.style = something?
  */

  function renderStructure(me) {
    // if we're opening because of visual search, disable the closing listener
    if (me.data?.searchMe) {
      global.stayOpen = true;
    }
    // hold off rendering until we're sure our structure is in place
    const checkStructure = () => {
      if (structure.me) {
        // persist the image, url, id, and description for later
        global.saveMe = {
          ...me.data,
          url: me.data.url,
          media: me.data.media,
          // if there's a data-pin-id this is going to be a repin
          id: me.data.id || 0,
          // descriptions still need to silently pass through in case we change our minds about showing them
          description: me.data.description || '',
        };
        // save position of opening button so we can render full board picker later
        global.position = {
          top: me.data.top,
          left: me.data.left,
        };
        // visible picker position should match button position
        structure.me.style.top = global.position.top + 'px';
        structure.me.style.left = global.position.left + 'px';
        structure.me.style.display = 'block';
        // set our flag so we don't accidentally close if structure takes a while to arrive
        global.hazRendered = true;
        // don't automatically close; we've rendered something visible
        window.clearTimeout(global.safetyTimer);
        // disallow scrolling outside the opener
        noScroll({
          el: [structure.me],
        });
        structure.bg.style.display = 'block';
        logView({ viewType: 'HOVER_BOARD_OPENER' });
      } else {
        window.setTimeout(checkStructure, 10);
      }
    };
    checkStructure();
  }

  /*
    render search form with first image
    me: {
      data: {
      }
    }
  */

  function showResults(me) {
    let data = me.data.data;
    if (data.length) {
      // clear results box
      structure.searchResultsGrid.innerHTML = '';
      // a place to store column references
      const col = [];
      // how many columns will we render?
      const colCount = 2;
      // set this live so we can experiment
      structure.searchResultsGrid.className = `save_searchResultsGrid save_cols_${colCount}`;
      // add columns
      for (let i = 0; i < colCount; i = i + 1) {
        addFromTemplate({
          template: {
            col: {
              id: 'search_column_' + i,
            },
          },
          addTo: structure.searchResultsGrid,
        });
        col.push(document.getElementById(`search_column_${i}`));
      }
      // column to start with
      let cc = 0;
      // scroll our search results space back to the top
      structure.searchResultsGrid.scrollIntoView(true);
      // loop through results
      data.forEach((it) => {
        // only add a thumb if we have a source attribute
        if (it.image_medium_url) {
          const myResult = {
            thumb: {
              image: {
                tag: 'img',
                src: it.image_medium_url,
              },
              mask: {
                cmd: 'visit',
                pinId: it.id,
                name: 'click',
                height: it.image_medium_size_pixels.height,
                width: it.image_medium_size_pixels.width,
                searchMe: it.image_medium_url,
                refine: {
                  name: 'click',
                  cmd: 'refineSearch',
                },
                openBoardPickerFromSearch: {
                  cmd: 'openBoardPickerFromSearch',
                },
              },
              footer: {
                avatar: {
                  tag: 'img',
                  src: it.pinner.image_small_url,
                  cmd: 'visit',
                  userName: it.pinner.username,
                },
                title: {
                  text: it.title.trim() || it.description.trim() || it.pinner.full_name,
                },
              },
            },
          };
          // if we are not authed, redirect save attempts to saveUnauthed pop-up
          if (!me.data.auth) {
            myResult.thumb.mask.openBoardPickerFromSearch.name = 'click';
            myResult.thumb.mask.openBoardPickerFromSearch.cmd = 'saveUnauthed';
            myResult.thumb.mask.openBoardPickerFromSearch.pinId = it.id;
            myResult.thumb.mask.openBoardPickerFromSearch.media = it.image_medium_url;
          }
          addFromTemplate({
            template: myResult,
            addTo: col[cc],
          });
          cc = (cc + 1) % colCount;
        }
      });
      // log a view of results
      logView({
        viewType: 'VISUAL_SEARCH_RESULTS',
      });
    }
  }

  /*
    functions listed under act are called remotely by the background process
  */
  const act = {
    newBoardWin,
    newPinFail,
    newPinWin,
    newSectionWin,
    renderStructure,
    renderPinmarkletData,
    renderSearch,
    runSearch,
    showResults,
  };

  /* 
    listen for messages from outside our process
    { 
      to: [should match config.me],
      act: [may match something we're watching for in our act object],
      request: [pass to act[me.act]]
    }
  */

  function handleRemoteActions() {
    browser.runtime.onMessage.addListener((request, sender) => {
      // is it for us?
      if (request.to === config.me) {
        debug('Message received');
        debug(request);
        // do we have a handler?
        if (request.act && typeof act[request.act] === 'function') {
          // see if we can tell what tab the message came from
          if (((sender || {}).tab || {}).id) {
            // add the tabId to the request so we can specify it if needed
            request.tabId = sender.tab.id;
          }
          // run it, passing the entire object in
          act[request.act](request);
        } else {
          // someone is sending us a message asking for a handler that doesn't exist
          debug('No handler found for ' + request.act, 1);
        }
      }
    });
  }

  /*
    initialize the board picker and have it ready to show
  */

  function initBoardPicker() {
    // if we don't have boards, don't init full picker
    if (!global.boards.length) {
      debug('No boards found, exiting browser_extension_full_picker');
      return;
    }
    // pointer to structure location
    const boardPicker = config.structure.bg.boardPicker;

    // update some strings
    boardPicker.boardPickerHead.boardPickerHeadLine.text = global.msg.boardPickerChooseBoard;
    boardPicker.boardPickerChoose.boardPickerFoot.boardPickerSlugLine.text =
      global.msg.boardPickerCreateBoard;
    // build a section list item
    function buildSectionItem(me) {
      // if no sectionId is sent we are building the item that allows you to save to the main board
      boardPicker.boardPickerChoose.boardPickerSections[me.board + '_sections'][
        me.section || me.board
      ] = {
        addClass: 'item',
        info: {
          addClass: 'isSectionName',
          // look for section title first, fall back to board name
          text: me.title || me.name,
        },
        saveButton: {
          addClass: 'button save',
          text: global.msg.saveAction,
          cmd: 'saveBoardPicker',
          boardId: me.board,
          boardName: me.name,
        },
      };
      // add our section ID if found; otherwise this is the main board
      if (me.section) {
        // add section title so we can disable the Create button reliably
        boardPicker.boardPickerChoose.boardPickerSections[me.board + '_sections'][
          me.section
        ].sectionTitle = me.title;
        boardPicker.boardPickerChoose.boardPickerSections[me.board + '_sections'][
          me.section
        ].saveButton.sectionId = me.section;
      }
    }
    // build a section list
    function buildSectionList(me) {
      boardPicker.boardPickerChoose.boardPickerSections[me.board + '_sections'] = {
        addClass: 'hidden',
      };
      // make a container for sections
      buildPickerItem(
        { image_cover_url: me.image_cover_url, id: me.board, board: me.board, name: me.name },
        boardPicker.boardPickerChoose.boardPickerSections[me.board + '_sections'],
      );

      // make a list of sections under this board
      global.sections[me.board] = [];
      me.sections.filter((it) => {
        // yes, we are converting the "title" object name to "name" so search will run
        global.sections[me.board].push({ id: it.id, name: it.title });
        buildSectionItem({ board: me.board, name: me.name, section: it.id, title: it.title });
      });
    }
    // build main board picker item
    function buildPickerItem(item, list) {
      list[item.id] = {
        addClass: 'item',
        boardName: item.name.toLowerCase(),
        cover: {
          style: {
            backgroundImage: `url(${item.image_cover_url})`,
          },
        },
        info: {
          text: item.name,
        },
        helpers: {
          collaborative: {},
          secret: {},
          opener: {},
        },
        saveButton: {
          addClass: 'button save',
          text: global.msg.saveAction,
        },
        mask: {
          cmd: 'saveBoardPicker',
          boardId: item.id,
          boardName: item.name,
        },
      };
      // helpers
      if (!item.is_collaborative) {
        // hide the collaborator indicator
        list[item.id].helpers.collaborative.addClass = 'hidden';
      }
      if (item.privacy !== 'secret') {
        // hide the secret board indicator
        list[item.id].helpers.secret.addClass = 'hidden';
      }
      if (item.section_count) {
        // caution: we may not have all sections for all boards loaded yet
        if (item.sections && item.sections.length) {
          // found sections, go build a list
          list[item.id].addClass = 'item hazSection';
          list[item.id].mask.cmd = 'openSectionPicker';
          list[item.id].mask.boardId = item.id;
          list[item.id].mask.boardName = item.name;
          buildSectionList({
            board: item.id,
            name: item.name,
            sections: item.sections,
            image_cover_url: item.image_cover_url,
          });
        }
      } else {
        // no sections were found, so hide the sections opener
        list[item.id].helpers.opener.addClass = 'hidden';
      }
    }
    // make a copy so we don't hose order of global.boards
    const boardPickerBoards = [...global.boards];
    // boards should come in last_pinned_to order
    boardPickerBoards.filter((it, index) => {
      if (index < 3) {
        buildPickerItem(
          it,
          boardPicker.boardPickerChoose.boardPickerBoards.boardPickerTopContainer
            .boardPickerTopList,
        );
      }
    });
    // sort by name for lower list
    boardPickerBoards.sort((a, b) => {
      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      return 0;
    });
    // build full lower list
    boardPickerBoards.filter((it) => {
      buildPickerItem(it, boardPicker.boardPickerChoose.boardPickerBoards.boardPickerAllList);
    });

    // add a mask to prevent most background scrolling
    config.structure.bg.boardPickerMask = {
      cmd: 'close',
    };
    // add structure
    config.structure.bg.boardPicker = boardPicker;
    // wire up the import as a member of cmd
    cmd.openBoardPicker = openBoardPicker;
  }

  /*
    housekeeping is complete; start listeners; build presentation and structure
  */
  function init() {
    // build the full board picker from information we found in local storage
    initBoardPicker();
    // listen for clicks
    document.body.addEventListener('click', click);
    // we will use mouseOver to close
    document.addEventListener('mouseover', over);
    // we will use mouseMove to close
    document.addEventListener('mousemove', move);
    // listen for keystrokes
    document.addEventListener('keydown', keydown);
    // don't allow right-click menus unless we are in debug mode
    if (!global.debug) {
      document.addEventListener('contextmenu', (event) => event.preventDefault());
    }
    // document.body is hidden by default in style, so build this before we add structure
    buildStyleFrom(config.presentation);
    // build our structure and land it in document.body
    addFromTemplate({
      template: config.structure,
      addTo: document.body,
    });

    // don't populate hoverboard opener or set default board if we don't have any boards
    if (global.boards.length) {
      // render our default board name and set global.boardId and global.boardName
      // default board name will be board 0
      structure.boardPickerOpenerCurrent.innerText = global.boards[0].name;
      // this is the board we'll save to if we click the default Save button
      global.boardId = global.boards[0].id;
      global.boardName = global.boards[0].name;
    }

    // start listening for messages that trigger act.functionName
    handleRemoteActions();
    // set a global timeout that will close if nothing renders within a reasonable amount of time
    global.safetyTimer = window.setTimeout(() => {
      // ask the background process to close our overlay
      send({ act: 'closeSave' });
    }, config.safetyTimeout);
  }

  /* 
    load contents of localStorage and then initialize
    if the first param is null, get everything
  */

  browser.storage.local.get(config.localValuesNeeded || null, (me) => {
    // anything in local storage is now available in global
    for (let i in me) {
      global[i] = me[i];
    }
    // do we have a message set?
    if (global.msg) {
      // Copy some messages to other keys. Why?
      // - Some strings like saveAction are used in several places in this overlay
      // - Some strings like visitButton might be used in this overlay or in logic
      // - Some strings like outerAddFormOpener to be renamed next platform upgrade
      const copyThese = {
        boardPickerSaveAction: 'saveAction',
        boardPickerChooseBoard: 'chooseBoard',
        boardPickerChooseSection: 'chooseSection',
        boardPickerTopHeader: 'topChoices',
        boardPickerAllHeader: 'allBoards',
        boardPickerCreateBoard: 'createBoard',
        boardPickerCreateSection: 'addSection',
        boardPickerCreateSecretLabel: 'addFormSecretLabel',
        boardPickerCreateSecretYes: 'optYes',
        boardPickerCreateSecretNo: 'optNo',
        boardPickerCreateCancel: 'closeAddForm',
        boardPickerCreateGo: 'submitAddForm',
        imagePickerHeadMainCaption: 'choosePinMultiSelectHeader',
        imagePickerHeadSubCaption: 'choosePinSelectAllSubHeader',
        imagePickerFootSelectAll: 'selectAll',
        imagePickerFootNext: 'nextAction',
        imagePickerFeedbackVisitButton: 'visitButton',
      };
      for (let k in copyThese) {
        if (global.msg[copyThese[k]]) {
          // copy saveAction to boardPickerSaveAction,
          // leaving saveAction present in case we need it again
          // for something like searchResultSaveAction in future
          global.msg[k] = global.msg[copyThese[k]];
        }
      }
    }
    // fire it off
    init();
  });
})();
