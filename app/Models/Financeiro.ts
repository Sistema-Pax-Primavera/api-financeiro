import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { formatarData, formatarDecimal, formatarString } from 'App/Util/Format'
import { DateTime } from 'luxon'

export default class Financeiro extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'financeiro.financeiro'

  @column({ isPrimary: true })
  public id: number

  // ID do usuario que cadastrou a movimentação.
  @column()
  public usuarioId: number

  // ID do cheque vinculado a movimentação.
  @column()
  public chequeId: number | null | undefined

  // ID da despesa vinculada a movimentação.
  @column()
  public contaPagarId: number | null | undefined

  // ID da unidade vinculada a movimentação.
  @column()
  public unidadeId: number | null | undefined

  // ID da conta vinculada a movimentação.
  @column()
  public contaId: number

  // ID da forma de pagamento vinculada a movimentação.
  @column()
  public formaPagamentoId: number

  // ID do fornecedor vinculado a movimentação.
  @column()
  public fornecedorId: number | null | undefined

  // ID do plano de conta vinculado a movimentação.
  @column()
  public planoContaId: number

  // ID do tipo de caixa vinculado a movimentação.
  @column()
  public tipoCaixaId: number | null | undefined

  // Número do documento da movimentação.
  @column()
  public numeroDocumento: string | null

  // Descrição da movimentação.
  @column()
  public descricao: string | null

  // Tipo da movimentação: 1-Escritorio 2-Cobrança 3-Os 4-Financeiro 5-Bancário 6-Vendas.
  @column()
  public tipo: number

  // Valor da movimentação.
  @column()
  public valor: number | null

  // Data de pagamento da movimentação.
  @column()
  public dataPagamento: string | DateTime | Date | null

  // Origem da movimentação: 1-Escritório 2-Cobrança 3-Os 4-Financeiro 5-Bancário 6-Vendas.
  @column()
  public origem: number

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
  * @param {Financeiro} financeiro - O objeto Financeiro a ser formatado.
  *
  * @memberOf Financeiro
  */
  @beforeSave()
  public static async formatFields(financeiro: Financeiro) {
    financeiro.descricao = formatarString(financeiro.descricao)
    financeiro.valor = formatarDecimal(financeiro.valor)
    financeiro.dataPagamento = formatarData(financeiro.dataPagamento)
    financeiro.createdBy = formatarString(financeiro.createdBy)
    financeiro.updatedBy = formatarString(financeiro.updatedBy)
  }
}
