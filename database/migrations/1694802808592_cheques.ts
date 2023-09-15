import BaseSchema from '@ioc:Adonis/Lucid/Schema'

/**
 * Classe de migração para criar a tabela 'cheque'.
 *
 * Esta migração verifica se a tabela 'cheque' já existe no banco de dados.
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
  protected tableName: string = 'cheque'

  /**
   * Método 'up' da migração.
   * Cria a tabela 'cheque' se ela não existir.
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
          table.integer('banco_id').notNullable().unsigned().references('id').inTable('financeiro.banco').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.integer('numero').notNullable()
          table.integer('agencia').notNullable()
          table.integer('agencia_digito').notNullable()
          table.integer('conta').notNullable()
          table.integer('digito_conta').notNullable()
          table.string('nome', 150).notNullable()
          table.date('date').notNullable()
          table.integer('status').notNullable().defaultTo(1).comment('1-EM ABERTO 2-REPASSADO 3-DEPOSITADO 4-COMPENSADO 5-DEVOLVIDO')
          table.decimal('valor', 10, 2).notNullable()
          table.boolean('ativo').notNullable().defaultTo(true).comment('Se valor for TRUE o mesmo não aparece nas listagens, exceto nas cheques de busca geral.')
          table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
          table.string('created_by', 150).notNullable()
          table.timestamp('updated_at', { useTz: true }).nullable()
          table.string('updated_by', 150).nullable()
        })
    }
  }

  /**
   * Método 'down' da migração.
   * Exclui a tabela 'cheque' se ela existir.
   *
   * @public
   * @returns {Promise<void>}
   */
  public async down(): Promise<void> {
    this.schema.withSchema(this.schemaName)
      .dropTableIfExists(this.tableName)
  }
}