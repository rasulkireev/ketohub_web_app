import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { QueryParamService } from 'app/_services/query-param.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  public constructor(private titleService: Title, private queryParamService: QueryParamService) {}

  ngOnInit(): void {
    this.subscription = this.queryParamService.queryParams$.subscribe(params => this.setTitle(params));
  }

  ngOnDestroy() {
    // always unsubscribe from observables to avoid memory leaks
    this.subscription.unsubscribe();
  }

  public setTitle(params: any) {
    const title = params ? `KetoHub - ${params}` : 'KetoHub';
    this.titleService.setTitle(title);
  }
}

/* notes

order of methods follows best practice

* constructor
* lifecycle methods
* public method
* private methosd
*/
