import { Component, Input } from "@angular/core";
import { Http, URLSearchParams } from '@angular/http';
import { Router, NavigationCancel } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {MyDance} from "../mydance";

class Song  {
    public album;
    public artist;
    public title;
    public tracknumber;
    public length;
    public genere;
    public date;
    public bitrate;
    public codec;
}

@Component({
    selector:'user-component',
    template: `
    <p></p>
<h2 class="ui header">{{club}}</h2>
<div class="ui horizontal list">
    <div class="item" >
        <img src="/templates/images/avatar2/small/elyse.png" class="ui mini circular image">
        <div class="content">
            <div class="ui sub header">{{nickname}}</div>
        </div>
    </div>
</div>
<h4 class="ui horizontal divider blue header">
    Now
</h4>
<div class="ui items" >
    <div class="item" >
        <div class="content" >
            <div class="header"><h1>{{now.title}}</h1></div>
            <div class="meta"><i class="user icon"></i> {{now.artist}}</div>
            <div class="meta"><i class="browser icon"></i> {{now.album}}</div>
            <div class="meta"><i class="sound icon"></i> {{now.length}}</div>
            <div class="meta"><i class="heartbeat icon"></i> {{now.bitrate}}</div>
        </div>
    </div>
</div>

<h4 class="ui horizontal divider header">
    Next
</h4>

<div class="ui divided items" >
    <div class="item" *ngFor="let el of list; let i = index;">
         <div class="middle aligned content">
            <div class="ui grey header">{{el.title}}</div>
            <div class="meta">
                {{el.artist}}
            </div>
        </div>
    </div>
</div>

<h4 class="ui horizontal hidden header"></h4>

<div class="ui center aligned container">
    <p style="color: #bbb">Present by WEIRD</p>
</div>
<br/>
    `,
    providers:[],
})
export class UserComponent {
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
        this.getData();
        this.now = new Song();
        
        Observable
            .interval(this.interval)
            .subscribe(() =>this.getData());
    }
    
    getData(){
        this.data = this.http.get('https://itpointlab.cafe24.com/mydance/playlist')
            .map(res => res.json())
            .subscribe(data => this.data = data,
                        err => console.log(err),
                        () => this.update());
    }
    
    update(){
        this.club = this.data.info.club;
        //this.nickname = this.data.info.nickname;
        this.nickname = MyDance.id;
        
        for (let i = 0; i < this.data.list.length; i++) {
            this.data.list[i].length = this.prettyTime(this.data.list[i].length);
        }
        this.now = this.data.list[0];
        this.list = this.data.list.slice(1,this.data.list.length);
    }
    
    prettyTime(sec){
        var date = new Date(null);
        date.setSeconds(sec); // specify value for SECONDS here
        return date.toISOString().substr(14, 5);
    }
    
}