import BaseSchema from '@ioc:Adonis/Lucid/Schema'

/**
 * Classe de migração para criar a tabela 'financeiro'.
 *
 * Esta migração verifica se a tabela 'financeiro' já existe no banco de dados.
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
  protected tableName: string = 'financeiro'

  /**
   * Método 'up' da migração.
   * Cria a tabela 'financeiro' se ela não existir.
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
          table.integer('usuario_id').nullable().unsigned().references('id').inTable('public.usuario').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.integer('cheque_id').nullable().unsigned().references('id').inTable('financeiro.cheque').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.integer('conta_pagar_id').nullable().unsigned().references('id').inTable('financeiro.conta_pagar').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.integer('unidade_id').nullable().unsigned().references('id').inTable('financeiro.unidade_financeiro').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.integer('conta_id').notNullable().unsigned().references('id').inTable('financeiro.conta').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.integer('forma_pagamento_id').notNullable().unsigned().references('id').inTable('public.forma_pagamento').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.integer('fornecedor_id').unsigned().references('id').inTable('financeiro.fornecedor').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.integer('plano_conta_id').notNullable().unsigned().references('id').inTable('financerio.plano_conta').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.integer('tipo_caixa_id').nullable().unsigned().references('id').inTable('public.tipo_caixa').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.string('numero_documento', 20).nullable()
          table.string('descricao', 150).notNullable()
          table.integer('tipo').notNullable().comment('1-Receita 2-Despesa')
          table.decimal('valor', 10, 2).notNullable()
          table.date('data_pagamento').notNullable()
          table.integer('origem').notNullable().defaultTo(4).comment('1-ESCRITORIO 2-COBRANCA 3-OS 4-FINANCEIRO 5-BANCARIO 6-VENDAS')
          table.boolean('lancamento_manual').notNullable().defaultTo(true)
          table.boolean('parcial').notNullable().defaultTo(false)
          table.integer('transferido').nullable()
          table.boolean('ativo').notNullable().defaultTo(true).comment('Se valor for TRUE o mesmo não aparece nas listagens, exceto nas financeiros de busca geral.')
          table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
          table.string('created_by', 150).notNullable()
          table.timestamp('updated_at', { useTz: true }).nullable()
          table.string('updated_by', 150).nullable()
        })
    }
  }

  /**
   * Método 'down' da migração.
   * Exclui a tabela 'financeiro' se ela existir.
   *
   * @public
   * @returns {Promise<void>}
   */
  public async down(): Promise<void> {
    this.schema.withSchema(this.schemaName)
      .dropTableIfExists(this.tableName)
  }
}