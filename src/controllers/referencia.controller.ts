import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Referencia} from '../models';
import {ReferenciaRepository} from '../repositories';

export class ReferenciaController {
  constructor(
    @repository(ReferenciaRepository)
    public referenciaRepository : ReferenciaRepository,
  ) {}

  @post('/referencias')
  @response(200, {
    description: 'Referencia model instance',
    content: {'application/json': {schema: getModelSchemaRef(Referencia)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Referencia, {
            title: 'NewReferencia',
            exclude: ['id'],
          }),
        },
      },
    })
    referencia: Omit<Referencia, 'id'>,
  ): Promise<Referencia> {
    return this.referenciaRepository.create(referencia);
  }

  @get('/referencias/count')
  @response(200, {
    description: 'Referencia model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Referencia) where?: Where<Referencia>,
  ): Promise<Count> {
    return this.referenciaRepository.count(where);
  }

  @get('/referencias')
  @response(200, {
    description: 'Array of Referencia model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Referencia, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Referencia) filter?: Filter<Referencia>,
  ): Promise<Referencia[]> {
    return this.referenciaRepository.find(filter);
  }

  @patch('/referencias')
  @response(200, {
    description: 'Referencia PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Referencia, {partial: true}),
        },
      },
    })
    referencia: Referencia,
    @param.where(Referencia) where?: Where<Referencia>,
  ): Promise<Count> {
    return this.referenciaRepository.updateAll(referencia, where);
  }

  @get('/referencias/{id}')
  @response(200, {
    description: 'Referencia model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Referencia, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Referencia, {exclude: 'where'}) filter?: FilterExcludingWhere<Referencia>
  ): Promise<Referencia> {
    return this.referenciaRepository.findById(id, filter);
  }

  @patch('/referencias/{id}')
  @response(204, {
    description: 'Referencia PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Referencia, {partial: true}),
        },
      },
    })
    referencia: Referencia,
  ): Promise<void> {
    await this.referenciaRepository.updateById(id, referencia);
  }

  @put('/referencias/{id}')
  @response(204, {
    description: 'Referencia PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() referencia: Referencia,
  ): Promise<void> {
    await this.referenciaRepository.replaceById(id, referencia);
  }

  @del('/referencias/{id}')
  @response(204, {
    description: 'Referencia DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.referenciaRepository.deleteById(id);
  }
}
