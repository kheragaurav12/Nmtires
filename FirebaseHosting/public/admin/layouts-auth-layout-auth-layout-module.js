(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["layouts-auth-layout-auth-layout-module"],{

/***/ "D8EZ":
/*!************************************************!*\
  !*** ./src/app/pages/login/login.component.ts ***!
  \************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _raw_loader_login_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! raw-loader!./login.component.html */ "ywSW");
/* harmony import */ var _login_component_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login.component.scss */ "KEbp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/fire/auth */ "UbJi");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/fire/firestore */ "I/3d");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/auth.service */ "lGQG");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var LoginComponent = /** @class */ (function () {
    function LoginComponent(authService, afAuth, router, db) {
        this.authService = authService;
        this.afAuth = afAuth;
        this.router = router;
        this.db = db;
        this.loader = false;
        this.loginForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormGroup"]({
            email: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](null),
            password: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](null)
        });
        this.errorMsg = "";
    }
    LoginComponent.prototype.ngOnInit = function () {
        // this.errorMsg = "";
        this.loginInProcess = false;
    };
    LoginComponent.prototype.loginFormSubmit = function (form) {
        var context = this;
        context.loginInProcess = true;
        // this.errorMsg = "";
        var loginPromise = this.authService.login(form.value.email.trim(), form.value.password);
        loginPromise.then(function (suc) {
            context.loginInProcess = false;
        }).catch(function (err) {
            console.log(err);
            context.loginInProcess = false;
            if (err.code === 'auth/user-not-found') {
                context.errorMsg = 'user does not exist, please check email !';
            }
            else if (err.code === 'auth/user-disabled') {
                context.errorMsg = 'user is disabled, please contact admin !';
            }
            else if (err.code === 'auth/wrong-password') {
                context.errorMsg = 'Incorrect password !!!';
            }
            else {
                context.errorMsg = 'Error Occurred, please try again !';
            }
        });
    };
    LoginComponent.prototype.ngOnDestroy = function () { };
    LoginComponent.ctorParameters = function () { return [
        { type: src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_7__["AuthService"] },
        { type: _angular_fire_auth__WEBPACK_IMPORTED_MODULE_3__["AngularFireAuth"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"] },
        { type: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_4__["AngularFirestore"] }
    ]; };
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: "app-login",
            template: _raw_loader_login_component_html__WEBPACK_IMPORTED_MODULE_0__["default"],
            styles: [_login_component_scss__WEBPACK_IMPORTED_MODULE_1__["default"]]
        }),
        __metadata("design:paramtypes", [src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_7__["AuthService"],
            _angular_fire_auth__WEBPACK_IMPORTED_MODULE_3__["AngularFireAuth"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"],
            _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_4__["AngularFirestore"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "Eq68":
/*!************************************************************!*\
  !*** ./src/app/layouts/auth-layout/auth-layout.routing.ts ***!
  \************************************************************/
/*! exports provided: AuthLayoutRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthLayoutRoutes", function() { return AuthLayoutRoutes; });
/* harmony import */ var _pages_login_login_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../pages/login/login.component */ "D8EZ");

var AuthLayoutRoutes = [
    { path: "login", component: _pages_login_login_component__WEBPACK_IMPORTED_MODULE_0__["LoginComponent"] },
];


/***/ }),

/***/ "KEbp":
/*!**************************************************!*\
  !*** ./src/app/pages/login/login.component.scss ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("@import url(\"https://fonts.googleapis.com/css2?family=PT+Serif:wght@400;700&display=swap\");\n#bg {\n  background: linear-gradient(to bottom right, #0575e6, #021b79);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvbG9naW4vbG9naW4uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQVEsMEZBQUE7QUFFUjtFQUNFLDhEQUFBO0FBQUYiLCJmaWxlIjoic3JjL2FwcC9wYWdlcy9sb2dpbi9sb2dpbi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIkBpbXBvcnQgdXJsKCdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVBUK1NlcmlmOndnaHRANDAwOzcwMCZkaXNwbGF5PXN3YXAnKTtcclxuXHJcbiNiZyB7XHJcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KFxyXG4gICAgdG8gYm90dG9tIHJpZ2h0LFxyXG4gICAgIzA1NzVlNixcclxuICAgICMwMjFiNzlcclxuICApO1xyXG59XHJcbiJdfQ== */");

/***/ }),

/***/ "PTPi":
/*!***********************************************************!*\
  !*** ./src/app/layouts/auth-layout/auth-layout.module.ts ***!
  \***********************************************************/
/*! exports provided: AuthLayoutModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthLayoutModule", function() { return AuthLayoutModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _auth_layout_routing__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./auth-layout.routing */ "Eq68");
/* harmony import */ var _pages_login_login_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../pages/login/login.component */ "D8EZ");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var AuthLayoutModule = /** @class */ (function () {
    function AuthLayoutModule() {
    }
    AuthLayoutModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(_auth_layout_routing__WEBPACK_IMPORTED_MODULE_4__["AuthLayoutRoutes"]),
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"]
                // NgbModule
            ],
            declarations: [
                _pages_login_login_component__WEBPACK_IMPORTED_MODULE_5__["LoginComponent"]
            ]
        })
    ], AuthLayoutModule);
    return AuthLayoutModule;
}());



/***/ }),

/***/ "ywSW":
/*!****************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/login/login.component.html ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container-fluid vh-100\">\n  <div class=\"row\" style=\"height: inherit;\">\n    <div class=\"col-12 col-sm-6 d-flex flex-column justify-content-center align-items-center px-4\" id=\"bg\">\n      <img src=\"assets/img/logo.png\" class=\"img-fluid\" width=\"128px\" height=\"128px\" alt=\"\">\n      <h1 class=\"text-white text-uppercase m-0 mb-1 mt-3\">NM Tires</h1>\n      <p class=\"m-0 text-white h4\">Admin Dashboard</p>\n    </div>\n    <div class=\"col-12 col-sm-6 d-flex flex-column justify-content-center align-items-center\">\n      <div class=\"card w-75 border border-danger\">\n        <div class=\"card-header bg-white border-0\">\n          <h3 class=\"text-center m-0\">Login</h3>\n        </div>\n        <div class=\"card-body\">\n          <form [formGroup]=\"loginForm\" (ngSubmit)=\"loginFormSubmit(loginForm)\">\n            <div class=\"form-group col-12 mt-2\">\n              <label for=\"email\" class=\"text-sm\">Email</label>\n              <input class=\"form-control\" placeholder=\"eg: abc@example.com\" formControlName=\"email\" name=\"email\"\n                type=\"email\" required>\n            </div>\n            <div class=\"form-group col-12 mt-2\">\n              <label for=\"password\" class=\"text-sm\">Password</label>\n              <input class=\"form-control\" placeholder=\"********\" formControlName=\"password\" name=\"password\"\n                type=\"password\" required>\n            </div>\n\n            <p class=\"alert alert-danger text-center h6 mt-2\" *ngIf=\"errorMsg !== ''\">\n              {{ errorMsg }}\n            </p>\n\n            <button type=\"submit\" class=\"btn btn-danger col-12 mt-4\" [disabled]=\"loader\">\n              Sign In\n              <span *ngIf=\"loader\">&nbsp;</span>\n              <div *ngIf=\"loader\" class=\"spinner-border spinner-border-sm text-light\" role=\"status\">\n                <span class=\"sr-only\">Loading...</span>\n              </div>\n            </button>\n          </form>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n<!-- <div class=\"container mt--1\">\n  <div class=\"row w-100 m-0\">\n    <div class=\"col-12 col-sm\">\n      <div class=\"d-flex flex-column justify-content-center align-items-start\" style=\"height: 100%;\">\n        <img src=\"assets/img/logo.png\" alt=\"\" class=\"img-fluid\" height=\"300px\" width=\"300px\">\n        <h1 class=\"text-white font-weight-bold m-0 mt-4\"\n          style=\"font-size: 34px; letter-spacing: 2px; font-family: 'PT Serif', serif;\">NM Tires </h1>\n        <h2 class=\"text-white\">Admin Backend</h2>\n      </div>\n    </div>\n    <div class=\"col-12 col-sm-4\">\n      <div class=\"card shadow bg-secondary border-0\">\n        <div class=\"card-header bg-secondary\">\n          <h3 class=\"mb-0 text-center\">Admin Login</h3>\n        </div>\n        <form [formGroup]=\"loginForm\" (ngSubmit)=\"loginFormSubmit(loginForm)\">\n          <div class=\"card-body\">\n            <div class=\"form-group mb-3\">\n              <div class=\"input-group input-group-alternative\">\n                <div class=\"input-group-prepend\">\n                  <span class=\"input-group-text\"><i class=\"ni ni-email-83\"></i></span>\n                </div>\n                <input class=\"form-control\" placeholder=\"Email\" type=\"email\" formControlName=\"email\">\n              </div>\n            </div>\n            <div class=\"form-group\">\n              <div class=\"input-group input-group-alternative\">\n                <div class=\"input-group-prepend\">\n                  <span class=\"input-group-text\"><i class=\"ni ni-lock-circle-open\"></i></span>\n                </div>\n                <input class=\"form-control\" placeholder=\"Password\" type=\"password\" formControlName=\"password\">\n              </div>\n            </div>\n            <div class=\"alert alert-danger text-center m-0\" role=\"alert\" *ngIf=\"errorMsg !== ''\">\n              <small>{{ errorMsg }}</small>\n            </div>\n          </div>\n          <div class=\"card-footer bg-secondary border-0 mt-4\">\n            <div class=\"d-flex justify-content-between align-items-center\">\n              <a href=\"mailto:bedding.bazzar2021@gmail.com\" class=\"btn btn-link align-middle text-primary p-0\">Contact\n                US</a>\n              <button type=\"submit\" class=\"btn btn-primary\" [disabled]=\"loader\">\n                Sign in\n                <span *ngIf=\"loader\">&nbsp;</span>\n                <div *ngIf=\"loader\" class=\"spinner-border spinner-border-sm text-light\" role=\"status\">\n                  <span class=\"sr-only\">Loading...</span>\n                </div>\n              </button>\n            </div>\n          </div>\n        </form>\n      </div>\n    </div>\n  </div>\n</div> -->\n");

/***/ })

}]);
//# sourceMappingURL=layouts-auth-layout-auth-layout-module.js.map