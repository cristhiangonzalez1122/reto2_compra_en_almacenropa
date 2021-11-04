import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Referencia, ReferenciaRelations} from '../models';

export class ReferenciaRepository extends DefaultCrudRepository<
  Referencia,
  typeof Referencia.prototype.id,
  ReferenciaRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Referencia, dataSource);
  }
}
