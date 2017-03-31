"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var compiler_1 = require("@angular/compiler");
var parts_module_1 = require("../parts/parts.module");
var DynamicTypeBuilder = (function () {
    // wee need Dynamic component builder
    function DynamicTypeBuilder(compiler) {
        this.compiler = compiler;
        // this object is singleton - so we can use this as a cache
        this._cacheOfFactories = {};
    }
    DynamicTypeBuilder.prototype.createComponentFactory = function (template) {
        var _this = this;
        var factory = this._cacheOfFactories[template];
        if (factory) {
            console.log("Module and Type are returned from cache");
            return new Promise(function (resolve) {
                resolve(factory);
            });
        }
        // unknown template ... let's create a Type for it
        var type = this.createNewComponent(template);
        var module = this.createComponentModule(type);
        return new Promise(function (resolve) {
            _this.compiler
                .compileModuleAndAllComponentsAsync(module)
                .then(function (moduleWithFactories) {
                factory = _.find(moduleWithFactories.componentFactories, { componentType: type });
                _this._cacheOfFactories[template] = factory;
                resolve(factory);
            });
        });
    };
    DynamicTypeBuilder.prototype.createNewComponent = function (tmpl) {
        var CustomDynamicComponent = (function () {
            function CustomDynamicComponent() {
            }
            return CustomDynamicComponent;
        }());
        __decorate([
            core_1.Input(),
            __metadata("design:type", Object)
        ], CustomDynamicComponent.prototype, "entity", void 0);
        CustomDynamicComponent = __decorate([
            core_1.Component({
                selector: 'dynamic-component',
                template: tmpl,
            })
        ], CustomDynamicComponent);
        ;
        // a component for this particular template
        return CustomDynamicComponent;
    };
    DynamicTypeBuilder.prototype.createComponentModule = function (componentType) {
        var RuntimeComponentModule = (function () {
            function RuntimeComponentModule() {
            }
            return RuntimeComponentModule;
        }());
        RuntimeComponentModule = __decorate([
            core_1.NgModule({
                imports: [
                    parts_module_1.PartsModule,
                ],
                declarations: [
                    componentType
                ],
            })
        ], RuntimeComponentModule);
        // a module for just this Type
        return RuntimeComponentModule;
    };
    return DynamicTypeBuilder;
}());
DynamicTypeBuilder = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [compiler_1.JitCompiler])
], DynamicTypeBuilder);
exports.DynamicTypeBuilder = DynamicTypeBuilder;
//# sourceMappingURL=type.builder.js.map