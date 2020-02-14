import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { EntityService } from '../app/services/entity.service';

@Injectable()
export class Resolver implements Resolve<Observable<string>> {
  constructor() { }

  resolve() {
    return null;
  }
}
