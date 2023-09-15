import BaseSchema from '@ioc:Adonis/Lucid/Schema'

/**
 * Classe de migração para criar a tabela 'unidade_devedora'.
 *
 * Esta migração verifica se a tabela 'unidade_devedora' já existe no banco de dados.
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
  protected tableName: string = 'unidade_devedora'

  /**
   * Método 'up' da migração.
   * Cria a tabela 'unidade_devedora' se ela não existir.
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
          table.integer('conta_pagar_id').notNullable().unsigned().references('id').inTable('financeiro.conta_pagar').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.integer('unidade_id').notNullable().unsigned().references('id').inTable('financeiro.unidade_financeira').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.decimal('valor_pagar', 10, 2).notNullable()
          table.decimal('valor_pago', 10, 2).nullable()
          table.decimal('porcentagem', 10, 2).nullable()
          table.integer('status').notNullable().defaultTo(0).comment('0-LOCAL 1-A ENVIAR 2-ENVIADA 3-ACEITA 4-REJEITADA 5-FALHA AO ENVIAR')
          table.boolean('ativo').notNullable().defaultTo(true).comment('Se valor for TRUE o mesmo não aparece nas listagens, exceto nas unidade_devedoras de busca geral.')
          table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
          table.string('created_by', 150).notNullable()
          table.timestamp('updated_at', { useTz: true }).nullable()
          table.string('updated_by', 150).nullable()

          table.primary(['conta_pagar_id', 'unidade_id'])
        })
    }
  }

  /**
   * Método 'down' da migração.
   * Exclui a tabela 'unidade_devedora' se ela existir.
   *
   * @public
   * @returns {Promise<void>}
   */
  public async down(): Promise<void> {
    this.schema.withSchema(this.schemaName)
      .dropTableIfExists(this.tableName)
  }
}