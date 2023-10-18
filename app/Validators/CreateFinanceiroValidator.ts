import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateFinanceiroValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    usuarioId: schema.number(),
    chequeId: schema.number.nullableAndOptional(),
    contaPagarId: schema.number.nullableAndOptional(),
    unidadeId: schema.number.nullableAndOptional(),
    contaId: schema.number(),
    formaPagamentoId: schema.number(),
    fornecedorId: schema.number.nullableAndOptional(),
    planoContaId: schema.number(),
    tipoCaixaId: schema.number.nullableAndOptional(),
    numeroDocumento: schema.string([
      rules.maxLength(20)
    ]),
    descricao: schema.string([
      rules.maxLength(150)
    ]),
    tipo: schema.enum([
      1, 2
    ]),
    valor: schema.number(),
    dataPagamento: schema.date({ format: 'DD/MM/YYYY'}),
    origem: schema.enum([
      1, 2, 3, 4, 5, 6
    ])
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    'required': 'Campo {{field}} é obrigatório',
    'maxLength': 'Campo {{field}} deve possuir tamanho máximo de {{options.maxLength}}',
    'enum': 'Campo {{field}} deve ser de uma das opções a seguir: ({{options.choices}})'
  }
}
