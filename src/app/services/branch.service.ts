import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BranchService extends DataService {

  constructor(http:HttpClient) {
    super(http,'branch')
  }

}
