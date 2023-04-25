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
exports.id = "pages/index";
exports.ids = ["pages/index"];
exports.modules = {

/***/ "./src/styles/Home.module.scss":
/*!*************************************!*\
  !*** ./src/styles/Home.module.scss ***!
  \*************************************/
/***/ ((module) => {

eval("// Exports\nmodule.exports = {\n\t\"wrapper\": \"Home_wrapper__f55fl\"\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc3R5bGVzL0hvbWUubW9kdWxlLnNjc3MuanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jaW5lbWF0ZS8uL3NyYy9zdHlsZXMvSG9tZS5tb2R1bGUuc2Nzcz81MGZiIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIEV4cG9ydHNcbm1vZHVsZS5leHBvcnRzID0ge1xuXHRcIndyYXBwZXJcIjogXCJIb21lX3dyYXBwZXJfX2Y1NWZsXCJcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/styles/Home.module.scss\n");

/***/ }),

/***/ "./src/pages/index.tsx":
/*!*****************************!*\
  !*** ./src/pages/index.tsx ***!
  \*****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _styles_Home_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../styles/Home.module.scss */ \"./src/styles/Home.module.scss\");\n/* harmony import */ var _styles_Home_module_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_Home_module_scss__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ \"axios\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_2__]);\naxios__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n// 메인 페이지\n\n\n\n\nconst Home = ()=>{\n    const [popularList, setPopularList] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    // 실시간 인기 순위 영화 리스트 목록 조회\n    const fnGetPopularMovie = async ()=>{\n        await axios__WEBPACK_IMPORTED_MODULE_2__[\"default\"].get(\"http://localhost:8080/api/v1/movie/popular\").then((res)=>{\n            try {\n                setPopularList(res.data.results);\n            } catch (err) {\n                alert(`${err.response.data.errorMessage ? err.response.data.errorMessage : err.response.data.message}`);\n            }\n        });\n    };\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        fnGetPopularMovie();\n    }, []);\n    return popularList.length > 0 ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: (_styles_Home_module_scss__WEBPACK_IMPORTED_MODULE_3___default().wrapper),\n        style: {\n            background: `url(${popularList[0].backdrop_path}) no-repeat center`,\n            backgroundSize: \"100%\"\n        },\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h4\", {\n                children: popularList[0].title\n            }, void 0, false, {\n                fileName: \"D:\\\\dy\\\\cinemate\\\\src\\\\pages\\\\index.tsx\",\n                lineNumber: 44,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                children: popularList[0].overview\n            }, void 0, false, {\n                fileName: \"D:\\\\dy\\\\cinemate\\\\src\\\\pages\\\\index.tsx\",\n                lineNumber: 45,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"D:\\\\dy\\\\cinemate\\\\src\\\\pages\\\\index.tsx\",\n        lineNumber: 43,\n        columnNumber: 5\n    }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: \"err\"\n    }, void 0, false);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Home);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvaW5kZXgudHN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsU0FBUzs7QUFFdUM7QUFDSDtBQUNwQjtBQW1CekIsTUFBTUssT0FBaUIsSUFBTTtJQUMzQixNQUFNLENBQUNDLGFBQWFDLGVBQWUsR0FBR0wsK0NBQVFBLENBQWdCLEVBQUU7SUFFaEUseUJBQXlCO0lBQ3pCLE1BQU1NLG9CQUFvQixVQUFZO1FBQ3BDLE1BQU1KLGlEQUFTLENBQUMsOENBQThDTSxJQUFJLENBQUNDLENBQUFBLE1BQU87WUFDeEUsSUFBSTtnQkFDRkosZUFBZUksSUFBSUMsSUFBSSxDQUFDQyxPQUFPO1lBQ2pDLEVBQUUsT0FBT0MsS0FBSztnQkFDWkMsTUFBTSxDQUFDLEVBQUVELElBQUlFLFFBQVEsQ0FBQ0osSUFBSSxDQUFDSyxZQUFZLEdBQUdILElBQUlFLFFBQVEsQ0FBQ0osSUFBSSxDQUFDSyxZQUFZLEdBQUdILElBQUlFLFFBQVEsQ0FBQ0osSUFBSSxDQUFDTSxPQUFPLENBQUMsQ0FBQztZQUN4RztRQUNGO0lBQ0Y7SUFFQWpCLGdEQUFTQSxDQUFDLElBQU07UUFDZE87SUFDRixHQUFFLEVBQUU7SUFFSixPQUFPRixZQUFZYSxNQUFNLEdBQUcsa0JBQzFCLDhEQUFDQztRQUFJQyxXQUFXbEIseUVBQVk7UUFBRW9CLE9BQU87WUFBQ0MsWUFBWSxDQUFDLElBQUksRUFBRWxCLFdBQVcsQ0FBQyxFQUFFLENBQUNtQixhQUFhLENBQUMsa0JBQWtCLENBQUM7WUFBRUMsZ0JBQWdCO1FBQU07OzBCQUMvSCw4REFBQ0M7MEJBQUlyQixXQUFXLENBQUMsRUFBRSxDQUFDc0IsS0FBSzs7Ozs7OzBCQUN6Qiw4REFBQ0M7MEJBQUd2QixXQUFXLENBQUMsRUFBRSxDQUFDd0IsUUFBUTs7Ozs7Ozs7Ozs7a0NBRTNCO2tCQUFFO3FCQUFNO0FBQ2Q7QUFFQSxpRUFBZXpCLElBQUlBLEVBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jaW5lbWF0ZS8uL3NyYy9wYWdlcy9pbmRleC50c3g/MTlhMCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyDrqZTsnbgg7Y6Y7J207KeAXHJcbmltcG9ydCB0eXBlIHsgTmV4dFBhZ2UgfSBmcm9tICduZXh0J1xyXG5pbXBvcnQgUmVhY3QsIHt1c2VFZmZlY3QsIHVzZVN0YXRlfSBmcm9tICdyZWFjdCdcclxuaW1wb3J0IGhvbWUgZnJvbSAnLi4vc3R5bGVzL0hvbWUubW9kdWxlLnNjc3MnXHJcbmltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIlxyXG5cclxuaW50ZXJmYWNlIFBvcHVsYXJMaXN0IHtcclxuICBhZHVsdDogYm9vbGVhbjtcclxuICBiYWNrZHJvcF9wYXRoOiBzdHJpbmc7XHJcbiAgZ2VucmVfaWRzOiBbXTtcclxuICBpZDogbnVtYmVyO1xyXG4gIG9yaWdpbmFsX2xhbmd1YWdlOiBzdHJpbmc7XHJcbiAgb3JpZ2luYWxfdGl0bGU6IHN0cmluZztcclxuICBvdmVydmlldzogc3RyaW5nO1xyXG4gIHBvcHVsYXJpdHk6IG51bWJlcjtcclxuICBwb3N0ZXJfcGF0aDogc3RyaW5nO1xyXG4gIHJlbGVhc2VfZGF0ZTogc3RyaW5nO1xyXG4gIHRpdGxlOiBzdHJpbmc7XHJcbiAgdmlkZW86IGJvb2xlYW47XHJcbiAgdm90ZV9hdmVyYWdlOiBudW1iZXI7XHJcbiAgdm90ZV9jb3VudDogbnVtYmVyO1xyXG59XHJcblxyXG5jb25zdCBIb21lOiBOZXh0UGFnZSA9ICgpID0+IHtcclxuICBjb25zdCBbcG9wdWxhckxpc3QsIHNldFBvcHVsYXJMaXN0XSA9IHVzZVN0YXRlPFBvcHVsYXJMaXN0W10+KFtdKVxyXG5cclxuICAvLyDsi6Tsi5zqsIQg7J246riwIOyInOychCDsmIHtmZQg66as7Iqk7Yq4IOuqqeuhnSDsobDtmoxcclxuICBjb25zdCBmbkdldFBvcHVsYXJNb3ZpZSA9IGFzeW5jICgpID0+IHtcclxuICAgIGF3YWl0IGF4aW9zLmdldCgnaHR0cDovL2xvY2FsaG9zdDo4MDgwL2FwaS92MS9tb3ZpZS9wb3B1bGFyJykudGhlbihyZXMgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHNldFBvcHVsYXJMaXN0KHJlcy5kYXRhLnJlc3VsdHMpXHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGFsZXJ0KGAke2Vyci5yZXNwb25zZS5kYXRhLmVycm9yTWVzc2FnZSA/IGVyci5yZXNwb25zZS5kYXRhLmVycm9yTWVzc2FnZSA6IGVyci5yZXNwb25zZS5kYXRhLm1lc3NhZ2V9YClcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBmbkdldFBvcHVsYXJNb3ZpZSgpXHJcbiAgfSxbXSlcclxuXHJcbiAgcmV0dXJuIHBvcHVsYXJMaXN0Lmxlbmd0aCA+IDAgPyAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT17aG9tZS53cmFwcGVyfSBzdHlsZT17e2JhY2tncm91bmQ6IGB1cmwoJHtwb3B1bGFyTGlzdFswXS5iYWNrZHJvcF9wYXRofSkgbm8tcmVwZWF0IGNlbnRlcmAsIGJhY2tncm91bmRTaXplOiAnMTAwJSd9fT5cclxuICAgICAgPGg0Pntwb3B1bGFyTGlzdFswXS50aXRsZX08L2g0PlxyXG4gICAgICA8cD57cG9wdWxhckxpc3RbMF0ub3ZlcnZpZXd9PC9wPlxyXG4gICAgPC9kaXY+XHJcbiAgKSA6IDw+ZXJyPC8+XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEhvbWVcclxuIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJob21lIiwiYXhpb3MiLCJIb21lIiwicG9wdWxhckxpc3QiLCJzZXRQb3B1bGFyTGlzdCIsImZuR2V0UG9wdWxhck1vdmllIiwiZ2V0IiwidGhlbiIsInJlcyIsImRhdGEiLCJyZXN1bHRzIiwiZXJyIiwiYWxlcnQiLCJyZXNwb25zZSIsImVycm9yTWVzc2FnZSIsIm1lc3NhZ2UiLCJsZW5ndGgiLCJkaXYiLCJjbGFzc05hbWUiLCJ3cmFwcGVyIiwic3R5bGUiLCJiYWNrZ3JvdW5kIiwiYmFja2Ryb3BfcGF0aCIsImJhY2tncm91bmRTaXplIiwiaDQiLCJ0aXRsZSIsInAiLCJvdmVydmlldyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/pages/index.tsx\n");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = import("axios");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./src/pages/index.tsx"));
module.exports = __webpack_exports__;

})();