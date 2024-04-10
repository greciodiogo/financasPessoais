import { Deserializable } from '@app/shared/models/deserializable';
export class User implements Deserializable {
  [x: string]: any;
  id?: number = null;
  email: string;
  username: string;
  password: string;
  nome: string = null;
  telefone: string;
  is_actived: boolean;
  perfil: any = [];
  loja_id: number;
  direccao_id: number;
  loja:any;
  empresa:any;
  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
