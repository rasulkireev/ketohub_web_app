import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';

// Simply keeps track of the latest query param entered by the user
@Injectable()
export class QueryParamService {

    // keep a record of the last value emitted, or return empty if nothing yet emitted
    private _queryParam: BehaviorSubject<any> = new BehaviorSubject('');

    public readonly queryParams$: Observable<any> = this._queryParam.asObservable();

    public updateSearchParams(searchParams) {
        this._queryParam.next(searchParams);
    }
}



