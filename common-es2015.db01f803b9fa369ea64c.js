(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{"3ROY":function(t,e,s){"use strict";s.d(e,"a",(function(){return i}));var r=s("tk/3"),n=s("AytR"),o=s("fXoL");let i=(()=>{class t{constructor(t){this.http=t,this.baseURL=n.a.baseURLv2+"/Tourism/Activity"}getActivities(t){const e=new r.d({fromObject:t});return this.http.get(`${this.baseURL}?${e.toString()}`)}getCityActivities(t,e){const s=new r.d({fromObject:e});return this.http.get(`${this.baseURL}/${t}?${s.toString()}`)}getActivityTopic(){return this.http.get("./assets/database/activity-topic.json")}}return t.\u0275fac=function(e){return new(e||t)(o.Qb(r.b))},t.\u0275prov=o.Fb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},WEYH:function(t,e,s){"use strict";s.d(e,"a",(function(){return i}));var r=s("tk/3"),n=s("AytR"),o=s("fXoL");let i=(()=>{class t{constructor(t){this.http=t,this.baseURL=n.a.baseURLv2+"/Tourism/ScenicSpot"}getSpotsList(t){const e=new r.d({fromObject:t});return this.http.get(`${this.baseURL}?${e.toString()}`)}getCitySpotsList(t,e){const s=new r.d({fromObject:e});return this.http.get(`${this.baseURL}/${t}?${s.toString()}`)}getSpotsTopic(){return this.http.get("./assets/database/spots-topic.json")}}return t.\u0275fac=function(e){return new(e||t)(o.Qb(r.b))},t.\u0275prov=o.Fb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},"XXB/":function(t,e,s){"use strict";s.d(e,"a",(function(){return i}));var r=s("tk/3"),n=s("AytR"),o=s("fXoL");let i=(()=>{class t{constructor(t){this.http=t,this.baseURL=n.a.baseURLv2+"/Tourism/Restaurant"}getRestaurants(t){const e=new r.d({fromObject:t});return this.http.get(`${this.baseURL}?${e.toString()}`)}getCityRestaurants(t,e){const s=new r.d({fromObject:e});return this.http.get(`${this.baseURL}/${t}?${s.toString()}`)}getRestaurantTopic(){return this.http.get("./assets/database/restaurant-topic.json")}}return t.\u0275fac=function(e){return new(e||t)(o.Qb(r.b))},t.\u0275prov=o.Fb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()}}]);