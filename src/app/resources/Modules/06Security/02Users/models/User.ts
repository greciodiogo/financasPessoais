import { Deserializable } from '@app/shared/models/deserializable';
export class User implements Deserializable {
  id?: number = null;
  email: string;
  username: string;
  password: string;
  name: string = null;
  telefone: string;
  is_actived: boolean;
  perfil: any = [];
  loja_id: number;
  direccao_id: number;
  loja:any;
  empresa:any;
  hasUserAccount?:boolean = false
  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
