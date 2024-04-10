import {Routes} from '@angular/router';
import {ZonePreviewComponent} from "./components/zones/zone-preview/zone-preview.component";
import {ZonesComponent} from "./components/zones/zones.component";
import {AppComponent} from "./app.component";
import {ZoneAddComponent} from "./components/zones/zone-add/zone-add.component";

export const routes: Routes = [
  {
    path: "zones", title: "Home Page", component: AppComponent,
    children: [
      {path: "", title: "Current Zone", component: ZonesComponent},
      {path: "add", title: "Add new Zone", component: ZoneAddComponent},
      {path: ":id", title: "Current Zone", component: ZonePreviewComponent}
    ]
  },
  {path: "", pathMatch: "full", redirectTo: "zones"},
  { path: '**', pathMatch: "full", component: AppComponent },
];
