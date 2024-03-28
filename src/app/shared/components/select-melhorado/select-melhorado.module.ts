import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingModule } from '../loading/loading.module';
import { FormsModule } from '@angular/forms';
import { SelectMelhoradoComponent } from './select-melhorado/select-melhorado.component';

import { TranslateModule, TranslateLoader, TranslateService } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient } from '@angular/common/http';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoadingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [TranslateService],
  declarations: [ SelectMelhoradoComponent ],
  exports: [ SelectMelhoradoComponent ],
})
export class SelectMelhoradoModule {}
