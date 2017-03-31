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
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/map");
var mydance_1 = require("../mydance");
var Song = (function () {
    function Song() {
    }
    return Song;
}());
var UserComponent = (function () {
    function UserComponent(http) {
        var _this = this;
        this.interval = 2000;
        this.list = [];
        this.http = http;
        this.getData();
        this.now = new Song();
        Rx_1.Observable
            .interval(this.interval)
            .subscribe(function () { return _this.getData(); });
    }
    UserComponent.prototype.getData = function () {
        var _this = this;
        this.data = this.http.get('https://itpointlab.cafe24.com/mydance/playlist')
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { return _this.data = data; }, function (err) { return console.log(err); }, function () { return _this.update(); });
    };
    UserComponent.prototype.update = function () {
        this.club = this.data.info.club;
        //this.nickname = this.data.info.nickname;
        this.nickname = mydance_1.MyDance.id;
        for (var i = 0; i < this.data.list.length; i++) {
            this.data.list[i].length = this.prettyTime(this.data.list[i].length);
        }
        this.now = this.data.list[0];
        this.list = this.data.list.slice(1, this.data.list.length);
    };
    UserComponent.prototype.prettyTime = function (sec) {
        var date = new Date(null);
        date.setSeconds(sec); // specify value for SECONDS here
        return date.toISOString().substr(14, 5);
    };
    return UserComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], UserComponent.prototype, "propertyName", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], UserComponent.prototype, "entity", void 0);
UserComponent = __decorate([
    core_1.Component({
        selector: 'user-component',
        template: "\n    <p></p>\n<h2 class=\"ui header\">{{club}}</h2>\n<div class=\"ui horizontal list\">\n    <div class=\"item\" >\n        <img src=\"/templates/images/avatar2/small/elyse.png\" class=\"ui mini circular image\">\n        <div class=\"content\">\n            <div class=\"ui sub header\">{{nickname}}</div>\n        </div>\n    </div>\n</div>\n<h4 class=\"ui horizontal divider blue header\">\n    Now\n</h4>\n<div class=\"ui items\" >\n    <div class=\"item\" >\n        <div class=\"content\" >\n            <div class=\"header\"><h1>{{now.title}}</h1></div>\n            <div class=\"meta\"><i class=\"user icon\"></i> {{now.artist}}</div>\n            <div class=\"meta\"><i class=\"browser icon\"></i> {{now.album}}</div>\n            <div class=\"meta\"><i class=\"sound icon\"></i> {{now.length}}</div>\n            <div class=\"meta\"><i class=\"heartbeat icon\"></i> {{now.bitrate}}</div>\n        </div>\n    </div>\n</div>\n\n<h4 class=\"ui horizontal divider header\">\n    Next\n</h4>\n\n<div class=\"ui divided items\" >\n    <div class=\"item\" *ngFor=\"let el of list; let i = index;\">\n         <div class=\"middle aligned content\">\n            <div class=\"ui grey header\">{{el.title}}</div>\n            <div class=\"meta\">\n                {{el.artist}}\n            </div>\n        </div>\n    </div>\n</div>\n\n<h4 class=\"ui horizontal hidden header\"></h4>\n\n<div class=\"ui center aligned container\">\n    <p style=\"color: #bbb\">Present by WEIRD</p>\n</div>\n<br/>\n    ",
        providers: [],
    }),
    __metadata("design:paramtypes", [http_1.Http])
], UserComponent);
exports.UserComponent = UserComponent;
//# sourceMappingURL=user.component.js.map