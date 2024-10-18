"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./api/build-client.js":
/*!*****************************!*\
  !*** ./api/build-client.js ***!
  \*****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   BuildClient: () => (/* binding */ BuildClient)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_0__]);\naxios__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\nconst BuildClient = async ({ req })=>{\n    if (true) {\n        return axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].create({\n            baseURL: \"http://ingress-nginx-controller.ingress-nginx.svc.cluster.local\",\n            headers: req.headers\n        });\n    } else {}\n};\n\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9hcGkvYnVpbGQtY2xpZW50LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQTBCO0FBRTFCLE1BQU1DLGNBQWMsT0FBTyxFQUFFQyxHQUFHLEVBQUU7SUFDOUIsSUFBSSxJQUFrQixFQUFhO1FBQy9CLE9BQU9GLG9EQUFZLENBQUM7WUFDaEJJLFNBQ0k7WUFDSkMsU0FBU0gsSUFBSUcsT0FBTztRQUN4QjtJQUNKLE9BQU8sRUFJTjtBQUNMO0FBRXVCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2xpZW50Ly4vYXBpL2J1aWxkLWNsaWVudC5qcz9jNmYwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XHJcblxyXG5jb25zdCBCdWlsZENsaWVudCA9IGFzeW5jICh7IHJlcSB9KSA9PiB7XHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICByZXR1cm4gYXhpb3MuY3JlYXRlKHtcclxuICAgICAgICAgICAgYmFzZVVSTDpcclxuICAgICAgICAgICAgICAgICdodHRwOi8vaW5ncmVzcy1uZ2lueC1jb250cm9sbGVyLmluZ3Jlc3Mtbmdpbnguc3ZjLmNsdXN0ZXIubG9jYWwnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiByZXEuaGVhZGVycyxcclxuICAgICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGF4aW9zLmNyZWF0ZSh7XHJcbiAgICAgICAgICAgIGJhc2VVUkw6ICcvJyxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCB7IEJ1aWxkQ2xpZW50IH07XHJcbiJdLCJuYW1lcyI6WyJheGlvcyIsIkJ1aWxkQ2xpZW50IiwicmVxIiwiY3JlYXRlIiwiYmFzZVVSTCIsImhlYWRlcnMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./api/build-client.js\n");

/***/ }),

/***/ "./component/Header.js":
/*!*****************************!*\
  !*** ./component/Header.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst Header = ({ currentUser })=>{\n    console.log(\"HEADER COMPONENT RENDERED\");\n    const links = [\n        !currentUser && {\n            label: \"Sign Up\",\n            href: \"/auth/signup\"\n        },\n        !currentUser && {\n            label: \"Sign In\",\n            href: \"/auth/signin\"\n        },\n        currentUser && {\n            label: \"Sign Out\",\n            href: \"/auth/signout\"\n        }\n    ].filter((linkConfig)=>linkConfig).map(({ label, href })=>{\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n            className: \"nav-items\",\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                href: href,\n                children: label\n            }, void 0, false, {\n                fileName: \"D:\\\\micro-services-project\\\\client\\\\component\\\\Header.js\",\n                lineNumber: 22,\n                columnNumber: 21\n            }, undefined)\n        }, href, false, {\n            fileName: \"D:\\\\micro-services-project\\\\client\\\\component\\\\Header.js\",\n            lineNumber: 21,\n            columnNumber: 17\n        }, undefined);\n    });\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"nav\", {\n        className: \"navbar navbar-light bg-light p-1\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                href: \"/\",\n                className: \"navbar-brand\",\n                children: \"GitTix\"\n            }, void 0, false, {\n                fileName: \"D:\\\\micro-services-project\\\\client\\\\component\\\\Header.js\",\n                lineNumber: 28,\n                columnNumber: 13\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"d-flex justify-content-end\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"ul\", {\n                    className: \"nav d-flex align-items-center\",\n                    children: links\n                }, void 0, false, {\n                    fileName: \"D:\\\\micro-services-project\\\\client\\\\component\\\\Header.js\",\n                    lineNumber: 32,\n                    columnNumber: 17\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"D:\\\\micro-services-project\\\\client\\\\component\\\\Header.js\",\n                lineNumber: 31,\n                columnNumber: 13\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"D:\\\\micro-services-project\\\\client\\\\component\\\\Header.js\",\n        lineNumber: 27,\n        columnNumber: 9\n    }, undefined);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Header);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnQvSGVhZGVyLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUE2QjtBQUM3QixNQUFNQyxTQUFTLENBQUMsRUFBRUMsV0FBVyxFQUFFO0lBQzNCQyxRQUFRQyxHQUFHLENBQUM7SUFDWixNQUFNQyxRQUFRO1FBQ1YsQ0FBQ0gsZUFBZTtZQUNaSSxPQUFPO1lBQ1BDLE1BQU07UUFDVjtRQUNBLENBQUNMLGVBQWU7WUFDWkksT0FBTztZQUNQQyxNQUFNO1FBQ1Y7UUFDQUwsZUFBZTtZQUNYSSxPQUFPO1lBQ1BDLE1BQU07UUFDVjtLQUNILENBQ0lDLE1BQU0sQ0FBQyxDQUFDQyxhQUFlQSxZQUN2QkMsR0FBRyxDQUFDLENBQUMsRUFBRUosS0FBSyxFQUFFQyxJQUFJLEVBQUU7UUFDakIscUJBQ0ksOERBQUNJO1lBQWNDLFdBQVU7c0JBQ3JCLDRFQUFDWixrREFBSUE7Z0JBQUNPLE1BQU1BOzBCQUFPRDs7Ozs7O1dBRGRDOzs7OztJQUlqQjtJQUNKLHFCQUNJLDhEQUFDTTtRQUFJRCxXQUFVOzswQkFDWCw4REFBQ1osa0RBQUlBO2dCQUFDTyxNQUFNO2dCQUFLSyxXQUFVOzBCQUFlOzs7Ozs7MEJBRzFDLDhEQUFDRTtnQkFBSUYsV0FBVTswQkFDWCw0RUFBQ0c7b0JBQUdILFdBQVU7OEJBQWlDUDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJL0Q7QUFFQSxpRUFBZUosTUFBTUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2NsaWVudC8uL2NvbXBvbmVudC9IZWFkZXIuanM/YmNmZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTGluayBmcm9tICduZXh0L2xpbmsnO1xyXG5jb25zdCBIZWFkZXIgPSAoeyBjdXJyZW50VXNlciB9KSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZygnSEVBREVSIENPTVBPTkVOVCBSRU5ERVJFRCcpO1xyXG4gICAgY29uc3QgbGlua3MgPSBbXHJcbiAgICAgICAgIWN1cnJlbnRVc2VyICYmIHtcclxuICAgICAgICAgICAgbGFiZWw6ICdTaWduIFVwJyxcclxuICAgICAgICAgICAgaHJlZjogJy9hdXRoL3NpZ251cCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICAhY3VycmVudFVzZXIgJiYge1xyXG4gICAgICAgICAgICBsYWJlbDogJ1NpZ24gSW4nLFxyXG4gICAgICAgICAgICBocmVmOiAnL2F1dGgvc2lnbmluJyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGN1cnJlbnRVc2VyICYmIHtcclxuICAgICAgICAgICAgbGFiZWw6ICdTaWduIE91dCcsXHJcbiAgICAgICAgICAgIGhyZWY6ICcvYXV0aC9zaWdub3V0JyxcclxuICAgICAgICB9LFxyXG4gICAgXVxyXG4gICAgICAgIC5maWx0ZXIoKGxpbmtDb25maWcpID0+IGxpbmtDb25maWcpXHJcbiAgICAgICAgLm1hcCgoeyBsYWJlbCwgaHJlZiB9KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8bGkga2V5PXtocmVmfSBjbGFzc05hbWU9XCJuYXYtaXRlbXNcIj5cclxuICAgICAgICAgICAgICAgICAgICA8TGluayBocmVmPXtocmVmfT57bGFiZWx9PC9MaW5rPlxyXG4gICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPG5hdiBjbGFzc05hbWU9XCJuYXZiYXIgbmF2YmFyLWxpZ2h0IGJnLWxpZ2h0IHAtMVwiPlxyXG4gICAgICAgICAgICA8TGluayBocmVmPXsnLyd9IGNsYXNzTmFtZT1cIm5hdmJhci1icmFuZFwiPlxyXG4gICAgICAgICAgICAgICAgR2l0VGl4XHJcbiAgICAgICAgICAgIDwvTGluaz5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkLWZsZXgganVzdGlmeS1jb250ZW50LWVuZFwiPlxyXG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cIm5hdiBkLWZsZXggYWxpZ24taXRlbXMtY2VudGVyXCI+e2xpbmtzfTwvdWw+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvbmF2PlxyXG4gICAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEhlYWRlcjtcclxuIl0sIm5hbWVzIjpbIkxpbmsiLCJIZWFkZXIiLCJjdXJyZW50VXNlciIsImNvbnNvbGUiLCJsb2ciLCJsaW5rcyIsImxhYmVsIiwiaHJlZiIsImZpbHRlciIsImxpbmtDb25maWciLCJtYXAiLCJsaSIsImNsYXNzTmFtZSIsIm5hdiIsImRpdiIsInVsIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./component/Header.js\n");

/***/ }),

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bootstrap/dist/css/bootstrap.css */ \"./node_modules/bootstrap/dist/css/bootstrap.css\");\n/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _api_build_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../api/build-client */ \"./api/build-client.js\");\n/* harmony import */ var _component_Header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../component/Header */ \"./component/Header.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_api_build_client__WEBPACK_IMPORTED_MODULE_2__]);\n_api_build_client__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n\nconst AppComponent = ({ Component, pageProps, ...props })=>{\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_component_Header__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                currentUser: props.data?.currentUser\n            }, void 0, false, {\n                fileName: \"D:\\\\micro-services-project\\\\client\\\\pages\\\\_app.js\",\n                lineNumber: 8,\n                columnNumber: 13\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                ...pageProps,\n                currentUser: props.data?.currentUser\n            }, void 0, false, {\n                fileName: \"D:\\\\micro-services-project\\\\client\\\\pages\\\\_app.js\",\n                lineNumber: 9,\n                columnNumber: 13\n            }, undefined),\n            \";\"\n        ]\n    }, void 0, true, {\n        fileName: \"D:\\\\micro-services-project\\\\client\\\\pages\\\\_app.js\",\n        lineNumber: 7,\n        columnNumber: 9\n    }, undefined);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AppComponent);\nAppComponent.getInitialProps = async (context)=>{\n    try {\n        const client = await (0,_api_build_client__WEBPACK_IMPORTED_MODULE_2__.BuildClient)(context.ctx);\n        const response = await client.get(\"/api/users/currentuser\");\n        console.log(response.data);\n        /**\r\n         * This will call the page level getInitialProps Function\r\n         */ let pageProps = {};\n        if (context.Component.getInitialProps) pageProps = await context.Component.getInitialProps(context.ctx);\n        return {\n            pageProps,\n            data: response.data\n        };\n    } catch (err) {\n        return {\n            err\n        };\n    }\n};\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQTBDO0FBQ1E7QUFDVDtBQUV6QyxNQUFNRSxlQUFlLENBQUMsRUFBRUMsU0FBUyxFQUFFQyxTQUFTLEVBQUUsR0FBR0MsT0FBTztJQUNwRCxxQkFDSSw4REFBQ0M7OzBCQUNHLDhEQUFDTCx5REFBTUE7Z0JBQUNNLGFBQWFGLE1BQU1HLElBQUksRUFBRUQ7Ozs7OzswQkFDakMsOERBQUNKO2dCQUFXLEdBQUdDLFNBQVM7Z0JBQUVHLGFBQWFGLE1BQU1HLElBQUksRUFBRUQ7Ozs7OztZQUFlOzs7Ozs7O0FBRzlFO0FBRUEsaUVBQWVMLFlBQVlBLEVBQUM7QUFFNUJBLGFBQWFPLGVBQWUsR0FBRyxPQUFPQztJQUNsQyxJQUFJO1FBQ0EsTUFBTUMsU0FBUyxNQUFNWCw4REFBV0EsQ0FBQ1UsUUFBUUUsR0FBRztRQUM1QyxNQUFNQyxXQUFXLE1BQU1GLE9BQU9HLEdBQUcsQ0FBQztRQUNsQ0MsUUFBUUMsR0FBRyxDQUFDSCxTQUFTTCxJQUFJO1FBQ3pCOztTQUVDLEdBQ0QsSUFBSUosWUFBWSxDQUFDO1FBQ2pCLElBQUlNLFFBQVFQLFNBQVMsQ0FBQ00sZUFBZSxFQUNqQ0wsWUFBWSxNQUFNTSxRQUFRUCxTQUFTLENBQUNNLGVBQWUsQ0FBQ0MsUUFBUUUsR0FBRztRQUVuRSxPQUFPO1lBQ0hSO1lBQ0FJLE1BQU1LLFNBQVNMLElBQUk7UUFDdkI7SUFDSixFQUFFLE9BQU9TLEtBQUs7UUFDVixPQUFPO1lBQUVBO1FBQUk7SUFDakI7QUFDSiIsInNvdXJjZXMiOlsid2VicGFjazovL2NsaWVudC8uL3BhZ2VzL19hcHAuanM/ZTBhZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ2Jvb3RzdHJhcC9kaXN0L2Nzcy9ib290c3RyYXAuY3NzJztcclxuaW1wb3J0IHsgQnVpbGRDbGllbnQgfSBmcm9tICcuLi9hcGkvYnVpbGQtY2xpZW50JztcclxuaW1wb3J0IEhlYWRlciBmcm9tICcuLi9jb21wb25lbnQvSGVhZGVyJztcclxuXHJcbmNvbnN0IEFwcENvbXBvbmVudCA9ICh7IENvbXBvbmVudCwgcGFnZVByb3BzLCAuLi5wcm9wcyB9KSA9PiB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIDxIZWFkZXIgY3VycmVudFVzZXI9e3Byb3BzLmRhdGE/LmN1cnJlbnRVc2VyfSAvPlxyXG4gICAgICAgICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IGN1cnJlbnRVc2VyPXtwcm9wcy5kYXRhPy5jdXJyZW50VXNlcn0gLz47XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXBwQ29tcG9uZW50O1xyXG5cclxuQXBwQ29tcG9uZW50LmdldEluaXRpYWxQcm9wcyA9IGFzeW5jIChjb250ZXh0KSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IEJ1aWxkQ2xpZW50KGNvbnRleHQuY3R4KTtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNsaWVudC5nZXQoJy9hcGkvdXNlcnMvY3VycmVudHVzZXInKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZS5kYXRhKTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUaGlzIHdpbGwgY2FsbCB0aGUgcGFnZSBsZXZlbCBnZXRJbml0aWFsUHJvcHMgRnVuY3Rpb25cclxuICAgICAgICAgKi9cclxuICAgICAgICBsZXQgcGFnZVByb3BzID0ge307XHJcbiAgICAgICAgaWYgKGNvbnRleHQuQ29tcG9uZW50LmdldEluaXRpYWxQcm9wcylcclxuICAgICAgICAgICAgcGFnZVByb3BzID0gYXdhaXQgY29udGV4dC5Db21wb25lbnQuZ2V0SW5pdGlhbFByb3BzKGNvbnRleHQuY3R4KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcGFnZVByb3BzLFxyXG4gICAgICAgICAgICBkYXRhOiByZXNwb25zZS5kYXRhLFxyXG4gICAgICAgIH07XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICByZXR1cm4geyBlcnIgfTtcclxuICAgIH1cclxufTtcclxuIl0sIm5hbWVzIjpbIkJ1aWxkQ2xpZW50IiwiSGVhZGVyIiwiQXBwQ29tcG9uZW50IiwiQ29tcG9uZW50IiwicGFnZVByb3BzIiwicHJvcHMiLCJkaXYiLCJjdXJyZW50VXNlciIsImRhdGEiLCJnZXRJbml0aWFsUHJvcHMiLCJjb250ZXh0IiwiY2xpZW50IiwiY3R4IiwicmVzcG9uc2UiLCJnZXQiLCJjb25zb2xlIiwibG9nIiwiZXJyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/_app.js\n");

/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = import("axios");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc","vendor-chunks/bootstrap"], () => (__webpack_exec__("./pages/_app.js")));
module.exports = __webpack_exports__;

})();