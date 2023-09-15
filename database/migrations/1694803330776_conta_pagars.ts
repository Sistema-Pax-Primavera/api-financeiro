import BaseSchema from '@ioc:Adonis/Lucid/Schema'

/**
 * Classe de migração para criar a tabela 'conta_pagar'.
 *
 * Esta migração verifica se a tabela 'conta_pagar' já existe no banco de dados.
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
  protected tableName: string = 'conta_pagar'

  /**
   * Método 'up' da migração.
   * Cria a tabela 'conta_pagar' se ela não existir.
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
          table.integer('fornecedor_id').notNullable().unsigned().references('id').inTable('financeiro.fornecedor').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.integer('plano_conta_id').notNullable().unsigned().references('id').inTable('financeiro.plano_conta').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.string('numero_documento', 50).nullable()
          table.string('descricao', 150).notNullable()         
          table.integer('usuario_id').notNullable().unsigned().references('id').inTable('public.usuario').onDelete('NO ACTION').onUpdate('NO ACTION') 
          table.date('data_vencimento').notNullable()
          table.decimal('valor_pagar', 10, 2).notNullable()
          table.boolean('lancamento_manual').notNullable().defaultTo(true)
          table.integer('unidade_id').notNullable().unsigned().references('id').inTable('financeiro.unidade_financeira').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.integer('status').notNullable().defaultTo(1).comment('1-NORMAL 2-COMPARTILHADA ANTES DE LIQUIDAR AGUARDANDO 3-COMPARTILHADA ANTES DE LIQUIDAR ACEITA 4-COMPARTILHADA ANTES DE LIQUIDAR REJEITADA 5-COMPARTILHADA EM ABERTO 6-COMPARTILHADA LIQUIDADA A ACEITAR 7-COMPARTILHADA LIQUIDADA ACEITA 8-COMPARTILHADA LIQUIDADA REJEITADA 9-LIQUIDADA NORMAL 10-CONFERIDA 11-CONFERIDA COM ALERTA 12-CONFERIDA REJEITADA')
          table.integer('tipo_despesa').notNullable().defaultTo(1).comment('1-NORMAL 2-COMPARTILHADA ANTES DE LIQUIDAR 3-COMPARTILHADA APOS LIQUIDAR 4-DESPESA PROVISORIA')
          table.boolean('anexo').nullable().defaultTo(false)
          table.boolean('ativo').notNullable().defaultTo(true).comment('Se valor for TRUE o mesmo não aparece nas listagens, exceto nas conta_pagars de busca geral.')
          table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
          table.string('created_by', 150).notNullable()
          table.timestamp('updated_at', { useTz: true }).nullable()
          table.string('updated_by', 150).nullable()
        })
    }
  }

  /**
   * Método 'down' da migração.
   * Exclui a tabela 'conta_pagar' se ela existir.
   *
   * @public
   * @returns {Promise<void>}
   */
  public async down(): Promise<void> {
    this.schema.withSchema(this.schemaName)
      .dropTableIfExists(this.tableName)
  }
}