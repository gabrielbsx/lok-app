import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class RecoveryUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    username: schema.string({ trim: true }, [
      rules.required(),
      rules.exists({ table: 'users', column: 'username' }),
    ]),
  });

  public messages: CustomMessages = {
    'username.required': 'O usuário é obrigatório',
    'username.exists': 'O usuário inválido',
  };
}
