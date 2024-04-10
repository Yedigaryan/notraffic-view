import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IZone} from "../interfaces/zone";

@Injectable({
  providedIn: 'root'
})
export class ZoneApiService {
  api: string = 'http://localhost:3000/zones';

  constructor(private readonly http: HttpClient) {
  }

  public getZones(): Observable<IZone[]> {
    return this.http.get<IZone[]>(this.api);
  }

  public createZone(newZone: Partial<IZone>): Observable<IZone> {
    return this.http.post<IZone>(this.api, newZone);
  }

  public deleteZone(zoneId: string): Observable<any> {
    return this.http.delete(`${this.api}/${zoneId}`);
  }
}
