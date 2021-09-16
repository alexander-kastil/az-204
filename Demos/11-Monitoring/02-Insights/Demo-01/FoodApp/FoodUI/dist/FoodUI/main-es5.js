(function () {
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  (self["webpackChunkfood_ui"] = self["webpackChunkfood_ui"] || []).push([["main"], {
    /***/
    98255: function _(module) {
      function webpackEmptyAsyncContext(req) {
        // Here Promise.resolve().then() is used instead of new Promise() to prevent
        // uncaught exception popping up in devtools
        return Promise.resolve().then(function () {
          var e = new Error("Cannot find module '" + req + "'");
          e.code = 'MODULE_NOT_FOUND';
          throw e;
        });
      }

      webpackEmptyAsyncContext.keys = function () {
        return [];
      };

      webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
      webpackEmptyAsyncContext.id = 98255;
      module.exports = webpackEmptyAsyncContext;
      /***/
    },

    /***/
    26698: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AboutComponent": function AboutComponent() {
          return (
            /* binding */
            _AboutComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _angular_material_card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/material/card */
      42118);

      var _AboutComponent = /*#__PURE__*/function () {
        function _AboutComponent() {
          _classCallCheck(this, _AboutComponent);
        }

        _createClass(_AboutComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }]);

        return _AboutComponent;
      }();

      _AboutComponent.ɵfac = function AboutComponent_Factory(t) {
        return new (t || _AboutComponent)();
      };

      _AboutComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: _AboutComponent,
        selectors: [["app-about"]],
        decls: 9,
        vars: 0,
        consts: [["matCardAvatar", "", "src", "https://avatars3.githubusercontent.com/u/16348023?s=460&v=4"]],
        template: function AboutComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-card");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-card-header");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "img", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-card-title");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Food App");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "mat-card-subtitle");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "By alexander.pajer@integrations.at");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "mat-card-content");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, " Sample App used for ngDev, ngAdvDev, AZ-400 & AZ-204 ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
        },
        directives: [_angular_material_card__WEBPACK_IMPORTED_MODULE_1__.MatCard, _angular_material_card__WEBPACK_IMPORTED_MODULE_1__.MatCardHeader, _angular_material_card__WEBPACK_IMPORTED_MODULE_1__.MatCardAvatar, _angular_material_card__WEBPACK_IMPORTED_MODULE_1__.MatCardTitle, _angular_material_card__WEBPACK_IMPORTED_MODULE_1__.MatCardSubtitle, _angular_material_card__WEBPACK_IMPORTED_MODULE_1__.MatCardContent],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhYm91dC5jb21wb25lbnQuc2NzcyJ9 */"]
      });
      /***/
    },

    /***/
    90158: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AppRoutingModule": function AppRoutingModule() {
          return (
            /* binding */
            _AppRoutingModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/router */
      71258);
      /* harmony import */


      var _home_home_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./home/home.component */
      45067);
      /* harmony import */


      var _food_food_container_food_container_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./food/food-container/food-container.component */
      59917);
      /* harmony import */


      var _about_about_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./about/about.component */
      26698);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var routes = [{
        path: "",
        component: _home_home_component__WEBPACK_IMPORTED_MODULE_0__.HomeComponent
      }, {
        path: "food",
        component: _food_food_container_food_container_component__WEBPACK_IMPORTED_MODULE_1__.FoodContainerComponent
      }, {
        path: "about",
        component: _about_about_component__WEBPACK_IMPORTED_MODULE_2__.AboutComponent
      }];

      var _AppRoutingModule = function _AppRoutingModule() {
        _classCallCheck(this, _AppRoutingModule);
      };

      _AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) {
        return new (t || _AppRoutingModule)();
      };

      _AppRoutingModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
        type: _AppRoutingModule
      });
      _AppRoutingModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
        imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forRoot(routes, {
          relativeLinkResolution: 'legacy'
        })], _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](_AppRoutingModule, {
          imports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule],
          exports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule]
        });
      })();
      /***/

    },

    /***/
    55041: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AppComponent": function AppComponent() {
          return (
            /* binding */
            _AppComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _shared_app_insights_app_insights_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./shared/app-insights/app-insights.service */
      18443);
      /* harmony import */


      var _angular_flex_layout_grid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/flex-layout/grid */
      57896);
      /* harmony import */


      var _shared_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./shared/navbar/navbar.component */
      54696);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/router */
      71258);
      /* harmony import */


      var _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/flex-layout/extended */
      89460);
      /* harmony import */


      var _shared_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./shared/sidebar/sidebar.component */
      17500);
      /* harmony import */


      var _shared_footer_footer_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./shared/footer/footer.component */
      45227);

      var _AppComponent = function _AppComponent(appInsights) {
        _classCallCheck(this, _AppComponent);

        this.appInsights = appInsights;
        this.title = "Passion for Food!";
      };

      _AppComponent.ɵfac = function AppComponent_Factory(t) {
        return new (t || _AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_shared_app_insights_app_insights_service__WEBPACK_IMPORTED_MODULE_0__.AppInsightsService));
      };

      _AppComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
        type: _AppComponent,
        selectors: [["app-root"]],
        decls: 9,
        vars: 0,
        consts: [["gdAreas", "navbar navbar |  sidemenu main | footer footer", "gdAreas.lt-md", "navbar  | main  | footer ", "gdGap", "0.3rem", "gdRows", "70px auto 70px", "gdColumns", "200px auto", "gdColumns.lt-md", "100%", 1, "grid"], ["gdArea", "navbar"], ["gdArea", "main", 1, "main"], ["gdArea", "sidemenu", "fxHide.lt-md", "", 1, "sidebar"], ["gdArea", "footer"]],
        template: function AppComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](2, "app-navbar");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "div", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](4, "router-outlet");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "div", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](6, "app-sidebar");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "div", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](8, "app-footer");

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          }
        },
        directives: [_angular_flex_layout_grid__WEBPACK_IMPORTED_MODULE_5__["ɵgrid_privateo"], _angular_flex_layout_grid__WEBPACK_IMPORTED_MODULE_5__["ɵgrid_privateba"], _angular_flex_layout_grid__WEBPACK_IMPORTED_MODULE_5__["ɵgrid_privatebg"], _angular_flex_layout_grid__WEBPACK_IMPORTED_MODULE_5__["ɵgrid_privatex"], _angular_flex_layout_grid__WEBPACK_IMPORTED_MODULE_5__["ɵgrid_privatel"], _shared_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_1__.NavbarComponent, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterOutlet, _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_7__.DefaultShowHideDirective, _shared_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_2__.SidebarComponent, _shared_footer_footer_component__WEBPACK_IMPORTED_MODULE_3__.FooterComponent],
        styles: [".grid[_ngcontent-%COMP%] {\n  height: 100vh;\n}\n\n.sidebar[_ngcontent-%COMP%] {\n  background-color: darkgrey;\n}\n\n.main[_ngcontent-%COMP%] {\n  margin: 0 2rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQUE7QUFDRjs7QUFFQTtFQUNFLDBCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxjQUFBO0FBQ0YiLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmdyaWQge1xyXG4gIGhlaWdodDogMTAwdmg7XHJcbn1cclxuXHJcbi5zaWRlYmFyIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiBkYXJrZ3JleTtcclxufVxyXG5cclxuLm1haW4ge1xyXG4gIG1hcmdpbjogMCAycmVtO1xyXG59XHJcbiJdfQ== */"]
      });
      /***/
    },

    /***/
    36747: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "appInit": function appInit() {
          return (
            /* binding */
            _appInit
          );
        },

        /* harmony export */
        "AppModule": function AppModule() {
          return (
            /* binding */
            _AppModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! @angular/platform-browser */
      71570);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
      /*! @angular/common/http */
      53882);
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
      /*! @angular/forms */
      1707);
      /* harmony import */


      var _app_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./app-routing.module */
      90158);
      /* harmony import */


      var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./app.component */
      55041);
      /* harmony import */


      var _shared_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./shared/navbar/navbar.component */
      54696);
      /* harmony import */


      var _shared_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./shared/sidebar/sidebar.component */
      17500);
      /* harmony import */


      var _main_main_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ./main/main.component */
      12284);
      /* harmony import */


      var _home_home_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./home/home.component */
      45067);
      /* harmony import */


      var _about_about_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./about/about.component */
      26698);
      /* harmony import */


      var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
      /*! @angular/platform-browser/animations */
      20718);
      /* harmony import */


      var _material_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ./material.module */
      63806);
      /* harmony import */


      var _ngrx_store__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(
      /*! @ngrx/store */
      70797);
      /* harmony import */


      var _store__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! ./store */
      12322);
      /* harmony import */


      var _ngrx_effects__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(
      /*! @ngrx/effects */
      99964);
      /* harmony import */


      var src_environments_environment__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! src/environments/environment */
      92340);
      /* harmony import */


      var _ngrx_store_devtools__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(
      /*! @ngrx/store-devtools */
      63219);
      /* harmony import */


      var _food_food_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! ./food/food.module */
      55717);
      /* harmony import */


      var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(
      /*! @angular/flex-layout */
      78662);
      /* harmony import */


      var _shared_footer_footer_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! ./shared/footer/footer.component */
      45227);
      /* harmony import */


      var _shared_config_config_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! ./shared/config/config.service */
      1203);

      function _appInit(configsrv) {
        return function () {
          return configsrv.init();
        };
      }

      var _AppModule = function _AppModule() {
        _classCallCheck(this, _AppModule);
      };

      _AppModule.ɵfac = function AppModule_Factory(t) {
        return new (t || _AppModule)();
      };

      _AppModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineNgModule"]({
        type: _AppModule,
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent]
      });
      _AppModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineInjector"]({
        providers: [_shared_config_config_service__WEBPACK_IMPORTED_MODULE_12__.ConfigService, {
          provide: _angular_core__WEBPACK_IMPORTED_MODULE_13__.APP_INITIALIZER,
          useFactory: _appInit,
          multi: true,
          deps: [_shared_config_config_service__WEBPACK_IMPORTED_MODULE_12__.ConfigService]
        }],
        imports: [[_angular_platform_browser__WEBPACK_IMPORTED_MODULE_14__.BrowserModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_15__.HttpClientModule, _angular_forms__WEBPACK_IMPORTED_MODULE_16__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_16__.ReactiveFormsModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_17__.BrowserAnimationsModule, _material_module__WEBPACK_IMPORTED_MODULE_7__.MaterialModule, _angular_flex_layout__WEBPACK_IMPORTED_MODULE_18__.FlexLayoutModule, _food_food_module__WEBPACK_IMPORTED_MODULE_10__.FoodModule, _ngrx_store__WEBPACK_IMPORTED_MODULE_19__.StoreModule.forRoot(_store__WEBPACK_IMPORTED_MODULE_8__.reducers, {
          metaReducers: _store__WEBPACK_IMPORTED_MODULE_8__.metaReducers,
          runtimeChecks: {
            strictStateImmutability: true,
            strictActionImmutability: true
          }
        }), _ngrx_effects__WEBPACK_IMPORTED_MODULE_20__.EffectsModule.forRoot([]), !src_environments_environment__WEBPACK_IMPORTED_MODULE_9__.environment.production ? _ngrx_store_devtools__WEBPACK_IMPORTED_MODULE_21__.StoreDevtoolsModule.instrument() : []]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵsetNgModuleScope"](_AppModule, {
          declarations: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent, _shared_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_2__.NavbarComponent, _shared_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_3__.SidebarComponent, _main_main_component__WEBPACK_IMPORTED_MODULE_4__.MainComponent, _home_home_component__WEBPACK_IMPORTED_MODULE_5__.HomeComponent, _about_about_component__WEBPACK_IMPORTED_MODULE_6__.AboutComponent, _shared_footer_footer_component__WEBPACK_IMPORTED_MODULE_11__.FooterComponent],
          imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_14__.BrowserModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_15__.HttpClientModule, _angular_forms__WEBPACK_IMPORTED_MODULE_16__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_16__.ReactiveFormsModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_17__.BrowserAnimationsModule, _material_module__WEBPACK_IMPORTED_MODULE_7__.MaterialModule, _angular_flex_layout__WEBPACK_IMPORTED_MODULE_18__.FlexLayoutModule, _food_food_module__WEBPACK_IMPORTED_MODULE_10__.FoodModule, _ngrx_store__WEBPACK_IMPORTED_MODULE_19__.StoreRootModule, _ngrx_effects__WEBPACK_IMPORTED_MODULE_20__.EffectsRootModule, _ngrx_store_devtools__WEBPACK_IMPORTED_MODULE_21__.StoreDevtoolsModule]
        });
      })();
      /***/

    },

    /***/
    59917: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "FoodContainerComponent": function FoodContainerComponent() {
          return (
            /* binding */
            _FoodContainerComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _store_facades_food_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../store/facades/food.service */
      91488);
      /* harmony import */


      var _food_list_food_list_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../food-list/food-list.component */
      30465);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _food_edit_food_edit_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../food-edit/food-edit.component */
      30868);

      function FoodContainerComponent_app_food_edit_2_Template(rf, ctx) {
        if (rf & 1) {
          var _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "app-food-edit", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("onSaveFood", function FoodContainerComponent_app_food_edit_2_Template_app_food_edit_onSaveFood_0_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r3);

            var ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();

            return ctx_r2.ff.saveFood($event);
          })("onMailFood", function FoodContainerComponent_app_food_edit_2_Template_app_food_edit_onMailFood_0_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r3);

            var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();

            return ctx_r4.ff.mailFood($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var selected_r1 = ctx.ngIf;

          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("food", selected_r1);
        }
      }

      var _FoodContainerComponent = /*#__PURE__*/function () {
        function _FoodContainerComponent(ff) {
          _classCallCheck(this, _FoodContainerComponent);

          this.ff = ff;
          this.food$ = this.ff.getFood();
          this.selected$ = this.ff.getSelected();
        }

        _createClass(_FoodContainerComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            this.ff.initFood();
          }
        }]);

        return _FoodContainerComponent;
      }();

      _FoodContainerComponent.ɵfac = function FoodContainerComponent_Factory(t) {
        return new (t || _FoodContainerComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_store_facades_food_service__WEBPACK_IMPORTED_MODULE_0__.FoodFacade));
      };

      _FoodContainerComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
        type: _FoodContainerComponent,
        selectors: [["app-food-container"]],
        decls: 4,
        vars: 6,
        consts: [[3, "food", "onEditSelected", "onDeleteSelected"], [3, "food", "onSaveFood", "onMailFood", 4, "ngIf"], [3, "food", "onSaveFood", "onMailFood"]],
        template: function FoodContainerComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "app-food-list", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("onEditSelected", function FoodContainerComponent_Template_app_food_list_onEditSelected_0_listener($event) {
              return ctx.ff.selectFood($event);
            })("onDeleteSelected", function FoodContainerComponent_Template_app_food_list_onDeleteSelected_0_listener($event) {
              return ctx.ff.deleteFood($event);
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](1, "async");

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, FoodContainerComponent_app_food_edit_2_Template, 1, 1, "app-food-edit", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](3, "async");
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("food", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](1, 2, ctx.food$));

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](3, 4, ctx.selected$));
          }
        },
        directives: [_food_list_food_list_component__WEBPACK_IMPORTED_MODULE_1__.FoodListComponent, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _food_edit_food_edit_component__WEBPACK_IMPORTED_MODULE_2__.FoodEditComponent],
        pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.AsyncPipe],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJmb29kLWNvbnRhaW5lci5jb21wb25lbnQuc2NzcyJ9 */"]
      });
      /***/
    },

    /***/
    30868: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "FoodEditComponent": function FoodEditComponent() {
          return (
            /* binding */
            _FoodEditComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/forms */
      1707);
      /* harmony import */


      var _angular_material_card__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/material/card */
      42118);
      /* harmony import */


      var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/flex-layout/flex */
      30582);
      /* harmony import */


      var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/material/form-field */
      65788);
      /* harmony import */


      var _angular_material_input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/material/input */
      64742);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/material/button */
      70781);

      function FoodEditComponent_em_5_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "em");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Name is required & must be more than 3 chars ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      }

      function FoodEditComponent_em_8_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "em");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Price must be greater than 1\u20AC ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      }

      var _FoodEditComponent = /*#__PURE__*/function () {
        function _FoodEditComponent(fb) {
          _classCallCheck(this, _FoodEditComponent);

          this.fb = fb;
          this.onSaveFood = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
          this.onMailFood = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
          this.form = this.fb.group({
            id: 0,
            name: ["", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.Validators.minLength(3)]],
            price: [0, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.Validators.min(1)],
            calories: 0
          });
        }

        _createClass(_FoodEditComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "ngOnChanges",
          value: function ngOnChanges(changes) {
            if (changes.food != undefined) {
              console.log("receiving food", changes.food.currentValue);
              this.form.setValue(changes.food.currentValue);
            }
          }
        }, {
          key: "saveForm",
          value: function saveForm(form) {
            console.log("food to save", form.value);
            this.onSaveFood.emit(form.value);
          }
        }, {
          key: "mailTo",
          value: function mailTo() {
            this.onMailFood.emit(this.form.value);
          }
        }]);

        return _FoodEditComponent;
      }();

      _FoodEditComponent.ɵfac = function FoodEditComponent_Factory(t) {
        return new (t || _FoodEditComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormBuilder));
      };

      _FoodEditComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: _FoodEditComponent,
        selectors: [["app-food-edit"]],
        inputs: {
          food: "food"
        },
        outputs: {
          onSaveFood: "onSaveFood",
          onMailFood: "onMailFood"
        },
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]],
        decls: 16,
        vars: 3,
        consts: [["novalidate", "", 3, "formGroup", "ngSubmit"], ["fxLayout", "column", "fxLayoutAlign", "center start"], ["matInput", "", "type", "text", "placeholder", "Name", "formControlName", "name"], [4, "ngIf"], ["matInput", "", "type", "number", "placeholder", "Price", "formControlName", "price"], ["matInput", "", "type", "number", "placeholder", "Calories", "formControlName", "calories"], ["align", "end"], ["mat-raised-button", "", "color", "primary", "type", "submit"], ["mat-raised-button", "", "color", "primary", 3, "click"]],
        template: function FoodEditComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "form", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngSubmit", function FoodEditComponent_Template_form_ngSubmit_0_listener() {
              return ctx.saveForm(ctx.form);
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-card");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-card-content", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-form-field");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "input", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, FoodEditComponent_em_5_Template, 2, 0, "em", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "mat-form-field");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "input", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, FoodEditComponent_em_8_Template, 2, 0, "em", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "mat-form-field");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "input", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "mat-card-actions", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "button", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, " Save ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "button", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function FoodEditComponent_Template_button_click_14_listener() {
              return ctx.mailTo();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, " Mail to ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formGroup", ctx.form);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.form.controls["name"].touched && ctx.form.controls["name"].errors != undefined);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.form.controls["price"].touched && ctx.form.controls["price"].errors != undefined);
          }
        },
        directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormGroupDirective, _angular_material_card__WEBPACK_IMPORTED_MODULE_2__.MatCard, _angular_material_card__WEBPACK_IMPORTED_MODULE_2__.MatCardContent, _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_3__.DefaultLayoutDirective, _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_3__.DefaultLayoutAlignDirective, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__.MatFormField, _angular_material_input__WEBPACK_IMPORTED_MODULE_5__.MatInput, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormControlName, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NumberValueAccessor, _angular_material_card__WEBPACK_IMPORTED_MODULE_2__.MatCardActions, _angular_material_button__WEBPACK_IMPORTED_MODULE_7__.MatButton],
        styles: ["form[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\nmat-card-actions[_ngcontent-%COMP%] {\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvb2QtZWRpdC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFdBQUE7QUFDRjs7QUFFQTtFQUNFLFdBQUE7QUFDRiIsImZpbGUiOiJmb29kLWVkaXQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJmb3JtIHtcclxuICB3aWR0aDogMTAwJTtcclxufVxyXG5cclxubWF0LWNhcmQtYWN0aW9ucyB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbn1cclxuIl19 */"]
      });
      /***/
    },

    /***/
    30465: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "FoodListComponent": function FoodListComponent() {
          return (
            /* binding */
            _FoodListComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _angular_material_table__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/material/table */
      54302);
      /* harmony import */


      var src_app_shared_app_insights_app_insights_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! src/app/shared/app-insights/app-insights.service */
      18443);
      /* harmony import */


      var _angular_material_card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/material/card */
      42118);
      /* harmony import */


      var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/flex-layout/flex */
      30582);
      /* harmony import */


      var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/material/form-field */
      65788);
      /* harmony import */


      var _angular_material_input__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/material/input */
      64742);
      /* harmony import */


      var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/material/button */
      70781);
      /* harmony import */


      var _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @angular/material/icon */
      52529);
      /* harmony import */


      var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @angular/material/tooltip */
      50298);

      function FoodListComponent_th_12_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "th", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Id");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }
      }

      function FoodListComponent_td_13_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "td", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var element_r18 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](element_r18.id);
        }
      }

      function FoodListComponent_th_15_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "th", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Name");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }
      }

      function FoodListComponent_td_16_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "td", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var element_r19 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](element_r19.name);
        }
      }

      function FoodListComponent_th_18_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "th", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Price");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }
      }

      function FoodListComponent_td_19_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "td", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var element_r20 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](element_r20.price);
        }
      }

      function FoodListComponent_th_21_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "th", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Calories");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }
      }

      function FoodListComponent_td_22_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "td", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var element_r21 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](element_r21.calories);
        }
      }

      function FoodListComponent_th_24_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "th", 17);
        }
      }

      function FoodListComponent_td_25_Template(rf, ctx) {
        if (rf & 1) {
          var _r24 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "td", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "a", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function FoodListComponent_td_25_Template_a_click_1_listener() {
            var restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r24);

            var element_r22 = restoredCtx.$implicit;

            var ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

            return ctx_r23.addItemToCart(element_r22);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "mat-icon", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "add");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }
      }

      function FoodListComponent_th_27_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "th", 17);
        }
      }

      function FoodListComponent_td_28_Template(rf, ctx) {
        if (rf & 1) {
          var _r27 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "td", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "a", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function FoodListComponent_td_28_Template_a_click_1_listener() {
            var restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r27);

            var element_r25 = restoredCtx.$implicit;

            var ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

            return ctx_r26.addItemToCart(element_r25);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "mat-icon", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "remove");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }
      }

      function FoodListComponent_th_30_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "th", 17);
        }
      }

      function FoodListComponent_td_31_Template(rf, ctx) {
        if (rf & 1) {
          var _r30 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "td", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "a", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function FoodListComponent_td_31_Template_a_click_1_listener() {
            var restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r30);

            var element_r28 = restoredCtx.$implicit;

            var ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

            return ctx_r29.deleteFood(element_r28);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "mat-icon", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "delete");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }
      }

      function FoodListComponent_th_33_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "th", 17);
        }
      }

      function FoodListComponent_td_34_Template(rf, ctx) {
        if (rf & 1) {
          var _r33 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "td", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "a", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function FoodListComponent_td_34_Template_a_click_1_listener() {
            var restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r33);

            var element_r31 = restoredCtx.$implicit;

            var ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

            return ctx_r32.selectFood(element_r31);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "mat-icon", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "edit");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }
      }

      function FoodListComponent_tr_35_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "tr", 24);
        }
      }

      function FoodListComponent_tr_36_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "tr", 25);
        }
      }

      var _FoodListComponent = /*#__PURE__*/function () {
        function _FoodListComponent(ai) {
          _classCallCheck(this, _FoodListComponent);

          this.ai = ai;
          this.onEditSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
          this.onDeleteSelected = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
          this.onAddToCart = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
          this.onDeleteFromCart = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
          this.displayedColumns = ["name", "price", "calories", "addItemToCart", "removeItemFromCart", "deleteItem", "editItem"];
          this.dataSource = new _angular_material_table__WEBPACK_IMPORTED_MODULE_2__.MatTableDataSource([]);
        }

        _createClass(_FoodListComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "ngOnChanges",
          value: function ngOnChanges(changes) {
            console.log(changes.food.currentValue);
            this.dataSource = new _angular_material_table__WEBPACK_IMPORTED_MODULE_2__.MatTableDataSource(changes.food.currentValue);
          }
        }, {
          key: "applyFilter",
          value: function applyFilter(filterValue) {
            this.dataSource.filter = filterValue.trim().toLowerCase();
          }
        }, {
          key: "addFood",
          value: function addFood() {
            console.log(this.getNextId());
            this.onEditSelected.emit({
              id: this.getNextId(),
              name: "",
              price: 0,
              calories: 0
            });
          }
        }, {
          key: "getNextId",
          value: function getNextId() {
            return this.food.reduce(function (acc, f) {
              return acc = acc > f.id ? acc : f.id;
            }, 0) + 1;
          }
        }, {
          key: "selectFood",
          value: function selectFood(f) {
            this.ai.logEvent("food-selected", f);
            this.onEditSelected.emit(f);
          }
        }, {
          key: "deleteFood",
          value: function deleteFood(f) {
            this.ai.logEvent("food-deleted", f);
            this.onDeleteSelected.emit(f);
          }
        }, {
          key: "addItemToCart",
          value: function addItemToCart(f) {
            this.ai.logEvent("food-to-cart", f);
          }
        }]);

        return _FoodListComponent;
      }();

      _FoodListComponent.ɵfac = function FoodListComponent_Factory(t) {
        return new (t || _FoodListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_shared_app_insights_app_insights_service__WEBPACK_IMPORTED_MODULE_0__.AppInsightsService));
      };

      _FoodListComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
        type: _FoodListComponent,
        selectors: [["app-food-list"]],
        inputs: {
          food: "food"
        },
        outputs: {
          onEditSelected: "onEditSelected",
          onDeleteSelected: "onDeleteSelected",
          onAddToCart: "onAddToCart",
          onDeleteFromCart: "onDeleteFromCart"
        },
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵNgOnChangesFeature"]],
        decls: 37,
        vars: 3,
        consts: [["fxLayout", "row", "fxLayoutAlign", "space-between center"], ["matInput", "", "placeholder", "Filter", 3, "keyup"], ["mat-raised-button", "", 3, "click"], ["mat-table", "", 3, "dataSource"], ["matColumnDef", "id"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "name"], ["matColumnDef", "price"], ["matColumnDef", "calories"], ["matColumnDef", "addItemToCart"], ["mat-cell", "", "class", "icon-cell", 4, "matCellDef"], ["matColumnDef", "removeItemFromCart"], ["matColumnDef", "deleteItem"], ["matColumnDef", "editItem"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", ""], ["mat-cell", ""], ["mat-cell", "", 1, "icon-cell"], ["mat-icon-button", "", 3, "click"], ["matTooltip", "Hinzuf\xFCgen", 1, "mat-18"], ["matTooltip", "L\xF6schen", 1, "mat-18"], ["matTooltip", "Bearbeiten", 1, "mat-18"], ["mat-header-row", ""], ["mat-row", ""]],
        template: function FoodListComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-card");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "mat-card-content", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "mat-form-field");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "input", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("keyup", function FoodListComponent_Template_input_keyup_3_listener($event) {
              return ctx.applyFilter($event.target.value);
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "button", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function FoodListComponent_Template_button_click_4_listener() {
              return ctx.addFood();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "mat-icon");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "add_circle");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "span");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "Add item");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "mat-card");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "table", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](11, 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](12, FoodListComponent_th_12_Template, 2, 0, "th", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](13, FoodListComponent_td_13_Template, 2, 1, "td", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](14, 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](15, FoodListComponent_th_15_Template, 2, 0, "th", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](16, FoodListComponent_td_16_Template, 2, 1, "td", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](17, 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](18, FoodListComponent_th_18_Template, 2, 0, "th", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](19, FoodListComponent_td_19_Template, 2, 1, "td", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](20, 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](21, FoodListComponent_th_21_Template, 2, 0, "th", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](22, FoodListComponent_td_22_Template, 2, 1, "td", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](23, 10);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](24, FoodListComponent_th_24_Template, 1, 0, "th", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](25, FoodListComponent_td_25_Template, 4, 0, "td", 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](26, 12);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](27, FoodListComponent_th_27_Template, 1, 0, "th", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](28, FoodListComponent_td_28_Template, 4, 0, "td", 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](29, 13);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](30, FoodListComponent_th_30_Template, 1, 0, "th", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](31, FoodListComponent_td_31_Template, 4, 0, "td", 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](32, 14);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](33, FoodListComponent_th_33_Template, 1, 0, "th", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](34, FoodListComponent_td_34_Template, 4, 0, "td", 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](35, FoodListComponent_tr_35_Template, 1, 0, "tr", 15);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](36, FoodListComponent_tr_36_Template, 1, 0, "tr", 16);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](10);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("dataSource", ctx.dataSource);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](25);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("matHeaderRowDef", ctx.displayedColumns);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("matRowDefColumns", ctx.displayedColumns);
          }
        },
        directives: [_angular_material_card__WEBPACK_IMPORTED_MODULE_3__.MatCard, _angular_material_card__WEBPACK_IMPORTED_MODULE_3__.MatCardContent, _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_4__.DefaultLayoutDirective, _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_4__.DefaultLayoutAlignDirective, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__.MatFormField, _angular_material_input__WEBPACK_IMPORTED_MODULE_6__.MatInput, _angular_material_button__WEBPACK_IMPORTED_MODULE_7__.MatButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__.MatIcon, _angular_material_table__WEBPACK_IMPORTED_MODULE_2__.MatTable, _angular_material_table__WEBPACK_IMPORTED_MODULE_2__.MatColumnDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_2__.MatHeaderCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_2__.MatCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_2__.MatHeaderRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_2__.MatRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_2__.MatHeaderCell, _angular_material_table__WEBPACK_IMPORTED_MODULE_2__.MatCell, _angular_material_button__WEBPACK_IMPORTED_MODULE_7__.MatAnchor, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_9__.MatTooltip, _angular_material_table__WEBPACK_IMPORTED_MODULE_2__.MatHeaderRow, _angular_material_table__WEBPACK_IMPORTED_MODULE_2__.MatRow],
        styles: ["mat-card[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n\ntable[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.icon-cell[_ngcontent-%COMP%] {\n  cursor: pointer;\n  text-align: right;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvb2QtbGlzdC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLG1CQUFBO0FBQ0Y7O0FBRUE7RUFDRSxXQUFBO0FBQ0Y7O0FBRUE7RUFDRSxlQUFBO0VBQ0EsaUJBQUE7QUFDRiIsImZpbGUiOiJmb29kLWxpc3QuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJtYXQtY2FyZCB7XHJcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcclxufVxyXG5cclxudGFibGUge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG4uaWNvbi1jZWxsIHtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XHJcbn1cclxuIl19 */"]
      });
      /***/
    },

    /***/
    55717: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "FoodModule": function FoodModule() {
          return (
            /* binding */
            _FoodModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _food_container_food_container_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./food-container/food-container.component */
      59917);
      /* harmony import */


      var _food_list_food_list_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./food-list/food-list.component */
      30465);
      /* harmony import */


      var _food_edit_food_edit_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./food-edit/food-edit.component */
      30868);
      /* harmony import */


      var _material_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../material.module */
      63806);
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @angular/forms */
      1707);
      /* harmony import */


      var _ngrx_store__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! @ngrx/store */
      70797);
      /* harmony import */


      var _store_reducers_food_reducer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ./store/reducers/food.reducer */
      99449);
      /* harmony import */


      var _ngrx_effects__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! @ngrx/effects */
      99964);
      /* harmony import */


      var _store_effects_food_effects__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./store/effects/food.effects */
      27214);
      /* harmony import */


      var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @angular/flex-layout */
      78662);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var comps = [_food_container_food_container_component__WEBPACK_IMPORTED_MODULE_0__.FoodContainerComponent, _food_list_food_list_component__WEBPACK_IMPORTED_MODULE_1__.FoodListComponent, _food_edit_food_edit_component__WEBPACK_IMPORTED_MODULE_2__.FoodEditComponent];

      var _FoodModule = function _FoodModule() {
        _classCallCheck(this, _FoodModule);
      };

      _FoodModule.ɵfac = function FoodModule_Factory(t) {
        return new (t || _FoodModule)();
      };

      _FoodModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({
        type: _FoodModule
      });
      _FoodModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({
        imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule, _material_module__WEBPACK_IMPORTED_MODULE_3__.MaterialModule, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.ReactiveFormsModule, _angular_flex_layout__WEBPACK_IMPORTED_MODULE_9__.FlexLayoutModule, _ngrx_store__WEBPACK_IMPORTED_MODULE_10__.StoreModule.forFeature(_store_reducers_food_reducer__WEBPACK_IMPORTED_MODULE_4__.foodFeatureKey, _store_reducers_food_reducer__WEBPACK_IMPORTED_MODULE_4__.FoodReducer), _ngrx_effects__WEBPACK_IMPORTED_MODULE_11__.EffectsModule.forFeature([_store_effects_food_effects__WEBPACK_IMPORTED_MODULE_5__.FoodEffects])]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](_FoodModule, {
          declarations: [_food_container_food_container_component__WEBPACK_IMPORTED_MODULE_0__.FoodContainerComponent, _food_list_food_list_component__WEBPACK_IMPORTED_MODULE_1__.FoodListComponent, _food_edit_food_edit_component__WEBPACK_IMPORTED_MODULE_2__.FoodEditComponent],
          imports: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule, _material_module__WEBPACK_IMPORTED_MODULE_3__.MaterialModule, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.ReactiveFormsModule, _angular_flex_layout__WEBPACK_IMPORTED_MODULE_9__.FlexLayoutModule, _ngrx_store__WEBPACK_IMPORTED_MODULE_10__.StoreFeatureModule, _ngrx_effects__WEBPACK_IMPORTED_MODULE_11__.EffectsFeatureModule],
          exports: [_food_container_food_container_component__WEBPACK_IMPORTED_MODULE_0__.FoodContainerComponent, _food_list_food_list_component__WEBPACK_IMPORTED_MODULE_1__.FoodListComponent, _food_edit_food_edit_component__WEBPACK_IMPORTED_MODULE_2__.FoodEditComponent]
        });
      })();
      /***/

    },

    /***/
    14720: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "FoodService": function FoodService() {
          return (
            /* binding */
            _FoodService
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/common/http */
      53882);
      /* harmony import */


      var _shared_config_config_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../shared/config/config.service */
      1203);

      var _FoodService = /*#__PURE__*/function () {
        function _FoodService(httpClient, cs) {
          _classCallCheck(this, _FoodService);

          this.httpClient = httpClient;
          this.cs = cs;
        }

        _createClass(_FoodService, [{
          key: "getFood",
          value: function getFood() {
            return this.httpClient.get("".concat(this.cs.api, "food"));
          }
        }]);

        return _FoodService;
      }();

      _FoodService.ɵfac = function FoodService_Factory(t) {
        return new (t || _FoodService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_shared_config_config_service__WEBPACK_IMPORTED_MODULE_0__.ConfigService));
      };

      _FoodService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
        token: _FoodService,
        factory: _FoodService.ɵfac,
        providedIn: "root"
      });
      /***/
    },

    /***/
    30051: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "FoodActionTypes": function FoodActionTypes() {
          return (
            /* binding */
            _FoodActionTypes
          );
        },

        /* harmony export */
        "LoadFood": function LoadFood() {
          return (
            /* binding */
            _LoadFood
          );
        },

        /* harmony export */
        "LoadFood_Success": function LoadFood_Success() {
          return (
            /* binding */
            _LoadFood_Success
          );
        },

        /* harmony export */
        "LoadFood_Error": function LoadFood_Error() {
          return (
            /* binding */
            _LoadFood_Error
          );
        },

        /* harmony export */
        "SelectFood": function SelectFood() {
          return (
            /* binding */
            _SelectFood
          );
        }
        /* harmony export */

      });

      var _FoodActionTypes;

      (function (FoodActionTypes) {
        FoodActionTypes["LoadFood"] = "[Food] Load Foods";
        FoodActionTypes["LoadFood_Success"] = "[Food] LoadFood_Success";
        FoodActionTypes["LoadFood_Error"] = "[Food] LoadFood_Error";
        FoodActionTypes["SelectFood"] = "[Food] SelectFood";
      })(_FoodActionTypes || (_FoodActionTypes = {}));

      var _LoadFood = function _LoadFood() {
        _classCallCheck(this, _LoadFood);

        this.type = _FoodActionTypes.LoadFood;
      };

      var _LoadFood_Success = function _LoadFood_Success(payload) {
        _classCallCheck(this, _LoadFood_Success);

        this.payload = payload;
        this.type = _FoodActionTypes.LoadFood_Success;
      };

      var _LoadFood_Error = function _LoadFood_Error(payload) {
        _classCallCheck(this, _LoadFood_Error);

        this.payload = payload;
        this.type = _FoodActionTypes.LoadFood_Error;
      };

      var _SelectFood = function _SelectFood(payload) {
        _classCallCheck(this, _SelectFood);

        this.payload = payload;
        this.type = _FoodActionTypes.SelectFood;
      };
      /***/

    },

    /***/
    27214: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "FoodEffects": function FoodEffects() {
          return (
            /* binding */
            _FoodEffects
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! tslib */
      3786);
      /* harmony import */


      var _ngrx_effects__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @ngrx/effects */
      99964);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! rxjs */
      81134);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! rxjs/operators */
      85816);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! rxjs/operators */
      33927);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! rxjs/operators */
      18293);
      /* harmony import */


      var _actions_food_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../actions/food.actions */
      30051);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _food_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../food.service */
      14720);

      var _FoodEffects = function _FoodEffects(actions$, fs) {
        var _this = this;

        _classCallCheck(this, _FoodEffects);

        this.actions$ = actions$;
        this.fs = fs;
        this.loadFood$ = this.actions$.pipe((0, _ngrx_effects__WEBPACK_IMPORTED_MODULE_2__.ofType)(_actions_food_actions__WEBPACK_IMPORTED_MODULE_0__.FoodActionTypes.LoadFood), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (action) {
          return _this.fs.getFood().pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)(function (food) {
            return new _actions_food_actions__WEBPACK_IMPORTED_MODULE_0__.LoadFood_Success(food);
          }), (0, rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(function (err) {
            return (0, rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(new _actions_food_actions__WEBPACK_IMPORTED_MODULE_0__.LoadFood_Error(err));
          }));
        }));
      };

      _FoodEffects.ɵfac = function FoodEffects_Factory(t) {
        return new (t || _FoodEffects)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_ngrx_effects__WEBPACK_IMPORTED_MODULE_2__.Actions), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_food_service__WEBPACK_IMPORTED_MODULE_1__.FoodService));
      };

      _FoodEffects.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
        token: _FoodEffects,
        factory: _FoodEffects.ɵfac
      });
      (0, tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([(0, _ngrx_effects__WEBPACK_IMPORTED_MODULE_2__.Effect)()], _FoodEffects.prototype, "loadFood$", void 0);
      /***/
    },

    /***/
    91488: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "FoodFacade": function FoodFacade() {
          return (
            /* binding */
            _FoodFacade
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _selectors_food_selectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../selectors/food.selectors */
      10883);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! rxjs/operators */
      98636);
      /* harmony import */


      var _actions_food_actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../actions/food.actions */
      30051);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _ngrx_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @ngrx/store */
      70797);
      /* harmony import */


      var src_app_shared_app_insights_app_insights_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! src/app/shared/app-insights/app-insights.service */
      18443);

      var _FoodFacade = /*#__PURE__*/function () {
        function _FoodFacade(store, ai) {
          _classCallCheck(this, _FoodFacade);

          this.store = store;
          this.ai = ai;
        }

        _createClass(_FoodFacade, [{
          key: "initFood",
          value: function initFood() {
            this.store.dispatch(new _actions_food_actions__WEBPACK_IMPORTED_MODULE_1__.LoadFood());
          }
        }, {
          key: "getFood",
          value: function getFood() {
            return this.store.select(_selectors_food_selectors__WEBPACK_IMPORTED_MODULE_0__.getAllFood).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(function (data) {
              return console.log("data received from store", data);
            }));
          }
        }, {
          key: "getSelected",
          value: function getSelected() {
            return this.store.select(_selectors_food_selectors__WEBPACK_IMPORTED_MODULE_0__.getSelected);
          }
        }, {
          key: "selectFood",
          value: function selectFood(f) {
            this.store.dispatch(new _actions_food_actions__WEBPACK_IMPORTED_MODULE_1__.SelectFood(f));
          }
        }, {
          key: "deleteFood",
          value: function deleteFood(f) {
            console.log("deleting ", f);
            this.ai.logEvent("Deleting", f);
          }
        }, {
          key: "saveFood",
          value: function saveFood(f) {
            console.log("saving ", f);
            this.ai.logEvent("Saving", f);
          }
        }, {
          key: "mailFood",
          value: function mailFood(f) {
            console.log("saving ", f);
            this.ai.logEvent("Saving", f);
          }
        }]);

        return _FoodFacade;
      }();

      _FoodFacade.ɵfac = function FoodFacade_Factory(t) {
        return new (t || _FoodFacade)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_ngrx_store__WEBPACK_IMPORTED_MODULE_5__.Store), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](src_app_shared_app_insights_app_insights_service__WEBPACK_IMPORTED_MODULE_2__.AppInsightsService));
      };

      _FoodFacade.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
        token: _FoodFacade,
        factory: _FoodFacade.ɵfac,
        providedIn: "root"
      });
      /***/
    },

    /***/
    99449: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "foodFeatureKey": function foodFeatureKey() {
          return (
            /* binding */
            _foodFeatureKey
          );
        },

        /* harmony export */
        "foodAdapter": function foodAdapter() {
          return (
            /* binding */
            _foodAdapter
          );
        },

        /* harmony export */
        "defaultFoodState": function defaultFoodState() {
          return (
            /* binding */
            _defaultFoodState
          );
        },

        /* harmony export */
        "initialState": function initialState() {
          return (
            /* binding */
            _initialState
          );
        },

        /* harmony export */
        "FoodReducer": function FoodReducer() {
          return (
            /* binding */
            _FoodReducer
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _ngrx_entity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @ngrx/entity */
      20391);
      /* harmony import */


      var _actions_food_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../actions/food.actions */
      30051);

      var _foodFeatureKey = "food";

      var _foodAdapter = (0, _ngrx_entity__WEBPACK_IMPORTED_MODULE_1__.createEntityAdapter)();

      var _defaultFoodState = {
        ids: [],
        entities: {},
        selected: null
      };

      var _initialState = _foodAdapter.getInitialState(_defaultFoodState);

      function _FoodReducer() {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _initialState;
        var action = arguments.length > 1 ? arguments[1] : undefined;

        switch (action.type) {
          case _actions_food_actions__WEBPACK_IMPORTED_MODULE_0__.FoodActionTypes.LoadFood:
            {
              return state;
            }

          case _actions_food_actions__WEBPACK_IMPORTED_MODULE_0__.FoodActionTypes.LoadFood_Success:
            {
              return _foodAdapter.addAll(action.payload, Object.assign({}, state));
            }

          case _actions_food_actions__WEBPACK_IMPORTED_MODULE_0__.FoodActionTypes.LoadFood_Error:
            {
              return Object.assign({}, state);
            }

          case _actions_food_actions__WEBPACK_IMPORTED_MODULE_0__.FoodActionTypes.SelectFood:
            {
              return Object.assign(Object.assign({}, state), {
                selected: action.payload
              });
            }

          default:
            return state;
        }
      }
      /***/

    },

    /***/
    10883: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "getFoodState": function getFoodState() {
          return (
            /* binding */
            _getFoodState
          );
        },

        /* harmony export */
        "getFoodEntities": function getFoodEntities() {
          return (
            /* binding */
            _getFoodEntities
          );
        },

        /* harmony export */
        "getAllFood": function getAllFood() {
          return (
            /* binding */
            _getAllFood
          );
        },

        /* harmony export */
        "getSelected": function getSelected() {
          return (
            /* binding */
            _getSelected
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _reducers_food_reducer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../reducers/food.reducer */
      99449);
      /* harmony import */


      var _ngrx_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @ngrx/store */
      70797);

      var _getFoodState = (0, _ngrx_store__WEBPACK_IMPORTED_MODULE_1__.createFeatureSelector)(_reducers_food_reducer__WEBPACK_IMPORTED_MODULE_0__.foodFeatureKey);

      var _getFoodEntities = (0, _ngrx_store__WEBPACK_IMPORTED_MODULE_1__.createSelector)(_getFoodState, _reducers_food_reducer__WEBPACK_IMPORTED_MODULE_0__.foodAdapter.getSelectors().selectAll);

      var _getAllFood = (0, _ngrx_store__WEBPACK_IMPORTED_MODULE_1__.createSelector)(_getFoodEntities, function (entities) {
        return Object.keys(entities).map(function (id) {
          return entities[parseInt(id, 10)];
        });
      });

      var _getSelected = (0, _ngrx_store__WEBPACK_IMPORTED_MODULE_1__.createSelector)(_getFoodState, function (state) {
        return state.selected;
      });
      /***/

    },

    /***/
    45067: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "HomeComponent": function HomeComponent() {
          return (
            /* binding */
            _HomeComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/flex-layout/flex */
      30582);

      var _HomeComponent = /*#__PURE__*/function () {
        function _HomeComponent() {
          _classCallCheck(this, _HomeComponent);
        }

        _createClass(_HomeComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }]);

        return _HomeComponent;
      }();

      _HomeComponent.ɵfac = function HomeComponent_Factory(t) {
        return new (t || _HomeComponent)();
      };

      _HomeComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: _HomeComponent,
        selectors: [["app-home"]],
        decls: 3,
        vars: 0,
        consts: [["fxLayoutAlign", "center start", 1, "imgEntry"], ["src", "assets/burger.png", "alt", ""]],
        template: function HomeComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "img", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
        },
        directives: [_angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_1__.DefaultLayoutAlignDirective],
        styles: [".imgEntry[_ngcontent-%COMP%] {\n  height: 100%;\n  padding-top: 5rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxZQUFBO0VBQ0EsaUJBQUE7QUFDRiIsImZpbGUiOiJob21lLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmltZ0VudHJ5IHtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgcGFkZGluZy10b3A6IDVyZW07XHJcbn1cclxuIl19 */"]
      });
      /***/
    },

    /***/
    12284: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "MainComponent": function MainComponent() {
          return (
            /* binding */
            _MainComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var _MainComponent = /*#__PURE__*/function () {
        function _MainComponent() {
          _classCallCheck(this, _MainComponent);
        }

        _createClass(_MainComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }]);

        return _MainComponent;
      }();

      _MainComponent.ɵfac = function MainComponent_Factory(t) {
        return new (t || _MainComponent)();
      };

      _MainComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: _MainComponent,
        selectors: [["app-main"]],
        decls: 2,
        vars: 0,
        template: function MainComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "main works!");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
        },
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJtYWluLmNvbXBvbmVudC5zY3NzIn0= */"]
      });
      /***/
    },

    /***/
    63806: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "MaterialModule": function MaterialModule() {
          return (
            /* binding */
            _MaterialModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/cdk/drag-drop */
      80395);
      /* harmony import */


      var _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(
      /*! @angular/cdk/scrolling */
      42791);
      /* harmony import */


      var _angular_cdk_table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/cdk/table */
      72306);
      /* harmony import */


      var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/material/autocomplete */
      65924);
      /* harmony import */


      var _angular_material_badge__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/material/badge */
      90330);
      /* harmony import */


      var _angular_material_bottom_sheet__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/material/bottom-sheet */
      76322);
      /* harmony import */


      var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/material/button */
      70781);
      /* harmony import */


      var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/material/button-toggle */
      53894);
      /* harmony import */


      var _angular_material_card__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @angular/material/card */
      42118);
      /* harmony import */


      var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @angular/material/checkbox */
      74058);
      /* harmony import */


      var _angular_material_chips__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! @angular/material/chips */
      79243);
      /* harmony import */


      var _angular_material_core__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(
      /*! @angular/material/core */
      32220);
      /* harmony import */


      var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! @angular/material/datepicker */
      42937);
      /* harmony import */


      var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! @angular/material/dialog */
      22213);
      /* harmony import */


      var _angular_material_divider__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! @angular/material/divider */
      1124);
      /* harmony import */


      var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
      /*! @angular/material/expansion */
      22323);
      /* harmony import */


      var _angular_material_icon__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
      /*! @angular/material/icon */
      52529);
      /* harmony import */


      var _angular_material_input__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
      /*! @angular/material/input */
      64742);
      /* harmony import */


      var _angular_material_menu__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(
      /*! @angular/material/menu */
      80221);
      /* harmony import */


      var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(
      /*! @angular/material/paginator */
      38021);
      /* harmony import */


      var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(
      /*! @angular/material/progress-bar */
      365);
      /* harmony import */


      var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(
      /*! @angular/material/progress-spinner */
      80181);
      /* harmony import */


      var _angular_material_radio__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(
      /*! @angular/material/radio */
      15644);
      /* harmony import */


      var _angular_material_select__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(
      /*! @angular/material/select */
      37007);
      /* harmony import */


      var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(
      /*! @angular/material/sidenav */
      86608);
      /* harmony import */


      var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(
      /*! @angular/material/slide-toggle */
      32080);
      /* harmony import */


      var _angular_material_slider__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(
      /*! @angular/material/slider */
      53616);
      /* harmony import */


      var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(
      /*! @angular/material/snack-bar */
      68456);
      /* harmony import */


      var _angular_material_sort__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(
      /*! @angular/material/sort */
      45381);
      /* harmony import */


      var _angular_material_stepper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! @angular/material/stepper */
      48210);
      /* harmony import */


      var _angular_material_table__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(
      /*! @angular/material/table */
      54302);
      /* harmony import */


      var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(
      /*! @angular/material/tabs */
      9348);
      /* harmony import */


      var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(
      /*! @angular/material/toolbar */
      64106);
      /* harmony import */


      var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(
      /*! @angular/material/tooltip */
      50298);
      /* harmony import */


      var _angular_material_list__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(
      /*! @angular/material/list */
      28417);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var _MaterialModule = function _MaterialModule() {
        _classCallCheck(this, _MaterialModule);
      };

      _MaterialModule.ɵfac = function MaterialModule_Factory(t) {
        return new (t || _MaterialModule)();
      };

      _MaterialModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
        type: _MaterialModule
      });
      _MaterialModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
        imports: [_angular_cdk_table__WEBPACK_IMPORTED_MODULE_1__.CdkTableModule, _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_2__.DragDropModule, _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_3__.MatAutocompleteModule, _angular_material_badge__WEBPACK_IMPORTED_MODULE_4__.MatBadgeModule, _angular_material_bottom_sheet__WEBPACK_IMPORTED_MODULE_5__.MatBottomSheetModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButtonModule, _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_7__.MatButtonToggleModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_8__.MatCardModule, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_9__.MatCheckboxModule, _angular_material_chips__WEBPACK_IMPORTED_MODULE_10__.MatChipsModule, _angular_material_stepper__WEBPACK_IMPORTED_MODULE_11__.MatStepperModule, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_12__.MatDatepickerModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_13__.MatDialogModule, _angular_material_divider__WEBPACK_IMPORTED_MODULE_14__.MatDividerModule, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_15__.MatExpansionModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_16__.MatIconModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_17__.MatInputModule, _angular_material_menu__WEBPACK_IMPORTED_MODULE_18__.MatMenuModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_19__.MatNativeDateModule, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_20__.MatPaginatorModule, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_21__.MatProgressBarModule, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_22__.MatProgressSpinnerModule, _angular_material_radio__WEBPACK_IMPORTED_MODULE_23__.MatRadioModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_19__.MatRippleModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_24__.MatSelectModule, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_25__.MatSidenavModule, _angular_material_slider__WEBPACK_IMPORTED_MODULE_26__.MatSliderModule, _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_27__.MatSlideToggleModule, _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_28__.MatSnackBarModule, _angular_material_sort__WEBPACK_IMPORTED_MODULE_29__.MatSortModule, _angular_material_table__WEBPACK_IMPORTED_MODULE_30__.MatTableModule, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_31__.MatTabsModule, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_32__.MatToolbarModule, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_33__.MatTooltipModule, _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_34__.ScrollingModule, _angular_material_list__WEBPACK_IMPORTED_MODULE_35__.MatListModule]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](_MaterialModule, {
          exports: [_angular_cdk_table__WEBPACK_IMPORTED_MODULE_1__.CdkTableModule, _angular_cdk_drag_drop__WEBPACK_IMPORTED_MODULE_2__.DragDropModule, _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_3__.MatAutocompleteModule, _angular_material_badge__WEBPACK_IMPORTED_MODULE_4__.MatBadgeModule, _angular_material_bottom_sheet__WEBPACK_IMPORTED_MODULE_5__.MatBottomSheetModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButtonModule, _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_7__.MatButtonToggleModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_8__.MatCardModule, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_9__.MatCheckboxModule, _angular_material_chips__WEBPACK_IMPORTED_MODULE_10__.MatChipsModule, _angular_material_stepper__WEBPACK_IMPORTED_MODULE_11__.MatStepperModule, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_12__.MatDatepickerModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_13__.MatDialogModule, _angular_material_divider__WEBPACK_IMPORTED_MODULE_14__.MatDividerModule, _angular_material_expansion__WEBPACK_IMPORTED_MODULE_15__.MatExpansionModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_16__.MatIconModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_17__.MatInputModule, _angular_material_menu__WEBPACK_IMPORTED_MODULE_18__.MatMenuModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_19__.MatNativeDateModule, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_20__.MatPaginatorModule, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_21__.MatProgressBarModule, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_22__.MatProgressSpinnerModule, _angular_material_radio__WEBPACK_IMPORTED_MODULE_23__.MatRadioModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_19__.MatRippleModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_24__.MatSelectModule, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_25__.MatSidenavModule, _angular_material_slider__WEBPACK_IMPORTED_MODULE_26__.MatSliderModule, _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_27__.MatSlideToggleModule, _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_28__.MatSnackBarModule, _angular_material_sort__WEBPACK_IMPORTED_MODULE_29__.MatSortModule, _angular_material_table__WEBPACK_IMPORTED_MODULE_30__.MatTableModule, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_31__.MatTabsModule, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_32__.MatToolbarModule, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_33__.MatTooltipModule, _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_34__.ScrollingModule, _angular_material_list__WEBPACK_IMPORTED_MODULE_35__.MatListModule]
        });
      })();
      /***/

    },

    /***/
    18443: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AppInsightsService": function AppInsightsService() {
          return (
            /* binding */
            _AppInsightsService
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _microsoft_applicationinsights_web__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @microsoft/applicationinsights-web */
      1940);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/router */
      71258);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! rxjs/operators */
      9170);
      /* harmony import */


      var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! src/environments/environment */
      92340);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var _AppInsightsService = /*#__PURE__*/function () {
        function _AppInsightsService(router) {
          var _this2 = this;

          _classCallCheck(this, _AppInsightsService);

          this.router = router;
          this.appInsights = new _microsoft_applicationinsights_web__WEBPACK_IMPORTED_MODULE_1__.Initialization({
            config: {
              instrumentationKey: src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.appInsights.instrumentationKey,
              autoTrackPageVisitTime: true
            }
          });
          this.appInsights.loadAppInsights();
          this.routerSubscription = this.router.events.pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.filter)(function (event) {
            return event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_3__.ResolveEnd;
          })).subscribe(function (event) {
            var activatedComponent = _this2.getActivatedComponent(event.state.root);

            if (activatedComponent) {
              _this2.logPageView("".concat(activatedComponent.name, " ").concat(_this2.getRouteTemplate(event.state.root)), event.urlAfterRedirects);
            }
          });
        }

        _createClass(_AppInsightsService, [{
          key: "ngOnDestroy",
          value: function ngOnDestroy() {
            this.routerSubscription.unsubscribe();
          }
        }, {
          key: "setUserId",
          value: function setUserId(userId) {
            this.appInsights.setAuthenticatedUserContext(userId);
          }
        }, {
          key: "clearUserId",
          value: function clearUserId() {
            this.appInsights.clearAuthenticatedUserContext();
          }
        }, {
          key: "logPageView",
          value: function logPageView(name, uri) {
            this.appInsights.trackPageView({
              name: name,
              uri: uri
            });
          }
        }, {
          key: "getActivatedComponent",
          value: function getActivatedComponent(snapshot) {
            if (snapshot.firstChild) {
              return this.getActivatedComponent(snapshot.firstChild);
            }

            return snapshot.component;
          }
        }, {
          key: "getRouteTemplate",
          value: function getRouteTemplate(snapshot) {
            var path = "";

            if (snapshot.routeConfig) {
              path += snapshot.routeConfig.path;
            }

            if (snapshot.firstChild) {
              return path + this.getRouteTemplate(snapshot.firstChild);
            }

            return path;
          }
        }, {
          key: "logEvent",
          value: function logEvent(name, data) {
            this.appInsights.trackEvent({
              name: name,
              properties: data
            });
            this.appInsights.stopTrackEvent(name);
            this.appInsights.flush();
          }
        }]);

        return _AppInsightsService;
      }();

      _AppInsightsService.ɵfac = function AppInsightsService_Factory(t) {
        return new (t || _AppInsightsService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router));
      };

      _AppInsightsService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
        token: _AppInsightsService,
        factory: _AppInsightsService.ɵfac,
        providedIn: "root"
      });
      /***/
    },

    /***/
    1203: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "ConfigService": function ConfigService() {
          return (
            /* binding */
            _ConfigService
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/common/http */
      53882);

      var _ConfigService = /*#__PURE__*/function () {
        function _ConfigService(client) {
          _classCallCheck(this, _ConfigService);

          this.client = client;
          this.api = "";
        }

        _createClass(_ConfigService, [{
          key: "init",
          value: function init() {
            var _this3 = this;

            this.client.get("assets/apiconfig.json").subscribe(function (val) {
              _this3.api = val.url;
              console.log("url loaded", _this3.api);
            });
          }
        }]);

        return _ConfigService;
      }();

      _ConfigService.ɵfac = function ConfigService_Factory(t) {
        return new (t || _ConfigService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpClient));
      };

      _ConfigService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
        token: _ConfigService,
        factory: _ConfigService.ɵfac,
        providedIn: "root"
      });
      /***/
    },

    /***/
    45227: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "FooterComponent": function FooterComponent() {
          return (
            /* binding */
            _FooterComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/material/toolbar */
      64106);

      var _FooterComponent = /*#__PURE__*/function () {
        function _FooterComponent() {
          _classCallCheck(this, _FooterComponent);
        }

        _createClass(_FooterComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }]);

        return _FooterComponent;
      }();

      _FooterComponent.ɵfac = function FooterComponent_Factory(t) {
        return new (t || _FooterComponent)();
      };

      _FooterComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: _FooterComponent,
        selectors: [["app-footer"]],
        decls: 2,
        vars: 0,
        consts: [["color", "primary"]],
        template: function FooterComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-toolbar", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Fake Footer\n");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
        },
        directives: [_angular_material_toolbar__WEBPACK_IMPORTED_MODULE_1__.MatToolbar],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJmb290ZXIuY29tcG9uZW50LnNjc3MifQ== */"]
      });
      /***/
    },

    /***/
    54696: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "NavbarComponent": function NavbarComponent() {
          return (
            /* binding */
            _NavbarComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/material/toolbar */
      64106);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/router */
      71258);

      var _c0 = function _c0() {
        return ["/"];
      };

      var _c1 = function _c1() {
        return ["/food"];
      };

      var _c2 = function _c2() {
        return ["/about"];
      };

      var _NavbarComponent = /*#__PURE__*/function () {
        function _NavbarComponent() {
          _classCallCheck(this, _NavbarComponent);
        }

        _createClass(_NavbarComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            this.items = [{
              title: "Home",
              url: "/"
            }, {
              title: "Products",
              url: "/products"
            }, {
              title: "About",
              url: "/about"
            }];
          }
        }]);

        return _NavbarComponent;
      }();

      _NavbarComponent.ɵfac = function NavbarComponent_Factory(t) {
        return new (t || _NavbarComponent)();
      };

      _NavbarComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: _NavbarComponent,
        selectors: [["app-navbar"]],
        decls: 8,
        vars: 6,
        consts: [["color", "primary"], [3, "routerLink"]],
        template: function NavbarComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-toolbar", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-toolbar-row");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Home");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Food");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "About");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](3, _c0));

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](4, _c1));

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](5, _c2));
          }
        },
        directives: [_angular_material_toolbar__WEBPACK_IMPORTED_MODULE_1__.MatToolbar, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_1__.MatToolbarRow, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterLink],
        styles: ["mat-toolbar[_ngcontent-%COMP%] {\n  margin-bottom: 0.8rem;\n}\n\nmat-toolbar-row[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  margin: 0.5rem;\n  cursor: pointer;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hdmJhci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLHFCQUFBO0FBQ0Y7O0FBR0U7RUFDRSxjQUFBO0VBQ0EsZUFBQTtBQUFKIiwiZmlsZSI6Im5hdmJhci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIm1hdC10b29sYmFyIHtcclxuICBtYXJnaW4tYm90dG9tOiAwLjhyZW07XHJcbn1cclxuXHJcbm1hdC10b29sYmFyLXJvdyB7XHJcbiAgZGl2IHtcclxuICAgIG1hcmdpbjogMC41cmVtO1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIH1cclxufVxyXG4iXX0= */"]
      });
      /***/
    },

    /***/
    17500: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "SidebarComponent": function SidebarComponent() {
          return (
            /* binding */
            _SidebarComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/material/toolbar */
      64106);
      /* harmony import */


      var _angular_material_list__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/material/list */
      28417);

      var _SidebarComponent = /*#__PURE__*/function () {
        function _SidebarComponent() {
          _classCallCheck(this, _SidebarComponent);
        }

        _createClass(_SidebarComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }]);

        return _SidebarComponent;
      }();

      _SidebarComponent.ɵfac = function SidebarComponent_Factory(t) {
        return new (t || _SidebarComponent)();
      };

      _SidebarComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: _SidebarComponent,
        selectors: [["app-sidebar"]],
        decls: 9,
        vars: 0,
        consts: [["role", "list", "color", "accent"], ["role", "listitem"]],
        template: function SidebarComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-toolbar");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Mock Submenu\n");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-list", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-list-item", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Item 1");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "mat-list-item", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Item 2");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "mat-list-item", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Item 3");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
        },
        directives: [_angular_material_toolbar__WEBPACK_IMPORTED_MODULE_1__.MatToolbar, _angular_material_list__WEBPACK_IMPORTED_MODULE_2__.MatList, _angular_material_list__WEBPACK_IMPORTED_MODULE_2__.MatListItem],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzaWRlYmFyLmNvbXBvbmVudC5zY3NzIn0= */"]
      });
      /***/
    },

    /***/
    12322: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "reducers": function reducers() {
          return (
            /* binding */
            _reducers
          );
        },

        /* harmony export */
        "metaReducers": function metaReducers() {
          return (
            /* binding */
            _metaReducers
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../environments/environment */
      92340);
      /* harmony import */


      var _food_store_reducers_food_reducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../food/store/reducers/food.reducer */
      99449);

      var _reducers = {
        food: _food_store_reducers_food_reducer__WEBPACK_IMPORTED_MODULE_1__.FoodReducer
      };

      var _metaReducers = !_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.production ? [] : [];
      /***/

    },

    /***/
    92340: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "environment": function environment() {
          return (
            /* binding */
            _environment
          );
        }
        /* harmony export */

      });

      var _environment = {
        production: false,
        apiurl: "https://localhost:5001/api/",
        appInsights: {
          instrumentationKey: "05cfdd0c-ffb8-46de-854d-a2a29e7c39cc"
        }
      };
      /***/
    },

    /***/
    14431: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony import */


      var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/platform-browser */
      71570);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./app/app.module */
      36747);
      /* harmony import */


      var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./environments/environment */
      92340);

      if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) {
        (0, _angular_core__WEBPACK_IMPORTED_MODULE_2__.enableProdMode)();
      }

      _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule)["catch"](function (err) {
        return console.error(err);
      });
      /***/

    }
  },
  /******/
  function (__webpack_require__) {
    // webpackRuntimeModules

    /******/
    var __webpack_exec__ = function __webpack_exec__(moduleId) {
      return __webpack_require__(__webpack_require__.s = moduleId);
    };
    /******/


    __webpack_require__.O(0, ["vendor"], function () {
      return __webpack_exec__(14431);
    });
    /******/


    var __webpack_exports__ = __webpack_require__.O();
    /******/

  }]);
})();
//# sourceMappingURL=main-es5.js.map