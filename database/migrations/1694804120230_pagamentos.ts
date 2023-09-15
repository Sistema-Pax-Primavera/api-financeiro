import BaseSchema from '@ioc:Adonis/Lucid/Schema'

/**
 * Classe de migração para criar a tabela 'pagamento'.
 *
 * Esta migração verifica se a tabela 'pagamento' já existe no banco de dados.
 * Se não existir, a tabela é criada com as colunas especificadas.
 * Se já existir, nada é feito no método 'up'.
 *
 * @class
 * @extends BaseSchema
 */
export default class extends BaseSchema {
  /**
   * Nome do esquema no banco de dados.
   *
   * @protected
   * @type {string}
   */
  protected schemaName: string = 'financeiro'

  /**
   * Nome da tabela que esta migração cria.
   *
   * @protected
   * @type {string}
   */
  protected tableName: string = 'pagamento'

  /**
   * Método 'up' da migração.
   * Cria a tabela 'pagamento' se ela não existir.
   *
   * @public
   * @returns {Promise<void>}
   */
  public async up(): Promise<void> {
    const hasTable = await this.schema
      .withSchema(this.schemaName)
      .hasTable(this.tableName)

    if (!hasTable) {
      this.schema.withSchema(this.schemaName)
        .createTable(this.tableName, (table) => {
          table.increments('id').primary()
          table.integer('unidade_id').notNullable().unsigned().references('id').inTable('public.unidade').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.integer('usuario_id').notNullable().unsigned().references('id').inTable('public.usuario').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.integer('associado_id').notNullable().unsigned().references('id').inTable('associado.associado').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.integer('financeiro_id').nullable().unsigned().references('id').inTable('financeiro.financeiro').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.integer('cheque_id').nullable().unsigned().references('id').inTable('financeiro.cheque').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.integer('forma_pagamento_id').notNullable().unsigned().references('id').inTable('public.forma_pagamento').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.integer('conta_id').notNullable().unsigned().references('id').inTable('financeiro.conta').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.integer('tipo_caixa_id').notNullable().unsigned().references('id').inTable('public.tipo_caixa').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.decimal('valor', 10, 2).notNullable()
          table.decimal('quantidade_parcelas', 10, 2).notNullable().defaultTo(1)
          table.boolean('ativo').notNullable().defaultTo(true).comment('Se valor for TRUE o mesmo não aparece nas listagens, exceto nas pagamentos de busca geral.')
          table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
          table.string('created_by', 150).notNullable()
          table.timestamp('updated_at', { useTz: true }).nullable()
          table.string('updated_by', 150).nullable()
        })
    }
  }

  /**
   * Método 'down' da migração.
   * Exclui a tabela 'pagamento' se ela existir.
   *
   * @public
   * @returns {Promise<void>}
   */
  public async down(): Promise<void> {
    this.schema.withSchema(this.schemaName)
      .dropTableIfExists(this.tableName)
  }
}