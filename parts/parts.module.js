"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// make all parts as one DYNAMIC_DIRECTIVES 
var core_1 = require("@angular/core");
var user_component_1 = require("./user.component");
var list_component_1 = require("./list.component");
exports.DYNAMIC_DIRECTIVES = [
    core_1.forwardRef(function () { return list_component_1.ListComponent; }),
    core_1.forwardRef(function () { return user_component_1.UserComponent; })
];
// module itself
var core_2 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var PartsModule = PartsModule_1 = (function () {
    function PartsModule() {
    }
    PartsModule.forRoot = function () {
        return {
            ngModule: PartsModule_1,
            providers: [],
        };
    };
    return PartsModule;
}());
PartsModule = PartsModule_1 = __decorate([
    core_2.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule
        ],
        declarations: [
            exports.DYNAMIC_DIRECTIVES
        ],
        exports: [
            exports.DYNAMIC_DIRECTIVES,
            common_1.CommonModule,
            forms_1.FormsModule
        ]
    })
], PartsModule);
exports.PartsModule = PartsModule;
var PartsModule_1;
//# sourceMappingURL=parts.module.js.map