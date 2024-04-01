import { HttpParams } from "@angular/common/http";
import { UntypedFormGroup } from "@angular/forms";

export interface StateModuleApiInterface{ 

  list(search?: string, filters?: HttpParams): any;
  
  show(id: number): any;
  
  store(form: UntypedFormGroup, id): any;

  update(form: UntypedFormGroup, id): any;

  delete(id: number): void;

}
