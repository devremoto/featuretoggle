import { Injectable, Injector } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Breadcrumb, BreadcrumbLabel } from '../../models/Breadcrumb';


@Injectable({
  providedIn: 'root',
})
export class BreadcrumbsService {

  breadcrumbs: Observable<Array<Breadcrumb>>;

  private _breadcrumbs: BehaviorSubject<Array<Breadcrumb>>;

  constructor(private router: Router, private route: ActivatedRoute) {

    this._breadcrumbs = new BehaviorSubject<Breadcrumb[]>(new Array<Breadcrumb>());

    this.breadcrumbs = this._breadcrumbs.asObservable();

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event) => {
      const breadcrumbs: Breadcrumb[] = [];
      let currentRoute: ActivatedRoute | null = this.route.root,
        url = '';
      do {
        const childrenRoutes = currentRoute.children;
        currentRoute = null;
        // tslint:disable-next-line:no-shadowed-variable
        childrenRoutes.forEach(route => {
          if (route.outlet === 'primary') {
            const routeSnapshot = route.snapshot;
            url += '/' + routeSnapshot.url.map(segment => segment.path).join('/');
            breadcrumbs.push({
              label: route.snapshot.data as BreadcrumbLabel,
              url: url
            });
            currentRoute = route;
          }
        });
      } while (currentRoute);

      this._breadcrumbs.next(Object.assign([], breadcrumbs));

      return breadcrumbs;
    });
  }
}
