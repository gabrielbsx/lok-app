import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class RecoveryTokenValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    username: schema.string({ trim: true }, [
      rules.required(),
      rules.exists({ table: 'users', column: 'username' }),
    ]),
    tokenize: schema.string({ trim: true }, [
      rules.required(),
      rules.exists({ table: 'recoveries', column: 'token' }),
    ]),
    password: schema.string({ trim: true }, [
      rules.required(),
      rules.maxLength(12),
      rules.minLength(4),
      rules.regex(/^[a-zA-Z0-9]+$/),
      rules.confirmed('passwordConfirmation'),
    ]),
  });

  public messages: CustomMessages = {
    'username.required': 'O usuário é obrigatório',
    'username.exists': 'O usuário inválido',
    'password.required': 'A senha é obrigatória',
    'password.maxLength': 'A senha deve ter no máximo 12 caracteres',
    'password.minLength': 'A senha deve ter no mínimo 4 caracteres',
    'password.regex': 'A senha deve conter apenas letras e números',
    'password.confirmed': 'A senha deve ser igual a confirmação',
    'passwrordConfirmation.required': 'A confirmação de senha é obrigatória',
    'tokenize.required': 'O token é obrigatório',
    'tokenize.exists': 'O token é inválido',
  };
}
