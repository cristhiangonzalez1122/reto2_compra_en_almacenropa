import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Compra, CompraRelations, Cliente, Referencia} from '../models';
import {ClienteRepository} from './cliente.repository';
import {ReferenciaRepository} from './referencia.repository';

export class CompraRepository extends DefaultCrudRepository<
  Compra,
  typeof Compra.prototype.id,
  CompraRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Compra.prototype.id>;

  public readonly referencia: BelongsToAccessor<Referencia, typeof Compra.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('ReferenciaRepository') protected referenciaRepositoryGetter: Getter<ReferenciaRepository>,
  ) {
    super(Compra, dataSource);
    this.referencia = this.createBelongsToAccessorFor('referencia', referenciaRepositoryGetter,);
    this.registerInclusionResolver('referencia', this.referencia.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
