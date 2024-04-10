import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {IZone} from "../interfaces/zone";

@Injectable({
  providedIn: 'root'
})
export class ZoneHelperService {
  public selectedZone: BehaviorSubject<[number, number][]> = new BehaviorSubject<[number, number][]>([]);
  public mashtab: number = 20;
  public allZones: IZone[] = []

  constructor() { }
}
