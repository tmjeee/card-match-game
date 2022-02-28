import {interval} from "rxjs";
import {untilDestroyed} from "@ngneat/until-destroy";


export const setupUntildestroy = (component: any)=> {
  interval(1000).pipe(
    untilDestroyed(component)
  ).subscribe();
}
