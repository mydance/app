import { Component, Input } from "@angular/core";
import { Http, URLSearchParams } from '@angular/http';
import { Router, NavigationCancel } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Component({
    selector:'list-component',
    template: `
    <p></p>
<h2 class="ui header">List</h2>
    `,
    providers:[],
})
export class ListComponent {
    @Input()  public propertyName: string;
    @Input()  public entity: any;
    
    interval = 2000;
    club;
    nickname;
    data;
    http;
    list:Object[] = [];
    now:Song;
    
    constructor(http:Http) {
        this.http = http;
        
    }
    
}