import {Entity, model, property} from '@loopback/repository';

@model()
export class Referencia extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  Referencia: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;



  constructor(data?: Partial<Referencia>) {
    super(data);
  }
}

export interface ReferenciaRelations {
  // describe navigational properties here
}

export type ReferenciaWithRelations = Referencia & ReferenciaRelations;
