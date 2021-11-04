import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Referencia} from './referencia.model';

@model()
export class Compra extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

  @property({
    type: 'number',
    required: true,
  })
  total: number;

  @belongsTo(() => Cliente)
  clienteId: string;

  @belongsTo(() => Referencia)
  referenciaId: string;

  constructor(data?: Partial<Compra>) {
    super(data);
  }
}

export interface CompraRelations {
  // describe navigational properties here
}

export type CompraWithRelations = Compra & CompraRelations;
