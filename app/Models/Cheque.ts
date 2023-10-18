import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { formatarData, formatarDecimal, formatarString } from 'App/Util/Format'
import { DateTime } from 'luxon'

export default class Cheque extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'financeiro.cheque'

  @column({ isPrimary: true })
  public id: number

  // ID do banco vinculado ao cheque.
  @column()
  public bancoId: number

  // Número do cheque.
  @column()
  public numero: number | null

  // Agência do cheque.
  @column()
  public agencia: number | null

  // Dígito da agência do cheque.
  @column()
  public digitoAgencia: number | null

  // Número da conta do cheque.
  @column()
  public conta: number

  // Dígito do número da conta do cheque.
  @column()
  public digitoConta: number

  // Nome impresso no cheque.
  @column()
  public nome: string | null

  // Data do cheque.
  @column()
  public data: string | DateTime | Date | null 

  // Status do cheque: 1-Em aberto 2-Repassado 3-Depositado 4-Compensado 5-Devolvido.
  @column()
  public status: number

  // Valor do cheque.
  @column()
  public valor: number | null

  // Indica se o resgistro está ativo.
  @column()
  public ativo: boolean

  // Data de criação do registro.
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  // Nome do criador do registro.
  @column()
  public createdBy: string | null

  // Data de atualização do registro.
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Nome do responsável pela atualização do registro.
  @column()
  public updatedBy: string | null

  /**
  * Método de gancho (hook) que formata os campos do registro antes de salvá-los.
  *
  * @param {Cheque} cheque - O objeto Cheque a ser formatado.
  *
  * @memberOf Cheque
  */
  @beforeSave()
  public static async formatFields(cheque: Cheque) {
    cheque.nome = formatarString(cheque.nome)
    cheque.data = formatarData(cheque.data)
    cheque.valor = formatarDecimal(cheque.valor)
    cheque.createdBy = formatarString(cheque.createdBy)
    cheque.updatedBy = formatarString(cheque.updatedBy)
  }
}
