import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateDonateValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    packageId: schema.number([rules.required(), rules.exists({ table: 'packages', column: 'id' })]),
    method: schema.enum(['picpay', 'mercado pago'] as const, [rules.required()]),
  })
  public messages: CustomMessages = {
    'packageId.required': 'Pacote é obrigatório',
    'packageId.exists': 'Pacote inválido',
    'method.required': 'Método de pagamento é obrigatório',
  }
}
