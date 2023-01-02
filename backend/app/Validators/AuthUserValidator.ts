import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class AuthUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    username: schema.string({ trim: true }, [
      rules.required(),
      rules.exists({ table: 'users', column: 'username', caseInsensitive: true }),
      rules.maxLength(10),
      rules.minLength(4),
      rules.regex(/^[a-zA-Z0-9]+$/),
    ]),
    password: schema.string({ trim: true, }, [
      rules.required(),
      rules.maxLength(12),
      rules.minLength(4),
      rules.regex(/^[a-zA-Z0-9]+$/),
    ]),
  });
  
  public messages: CustomMessages = {
    'username.required': 'O usuário é obrigatório',
    'username.exists': 'O usuário ou senha inválido',
    'username.maxLength': 'O usuário deve ter no máximo 10 caracteres',
    'username.minLength': 'O usuário deve ter no mínimo 4 caracteres',
    'username.regex': 'O usuário deve conter apenas letras e números',
    'password.required': 'A senha é obrigatória',
    'password.maxLength': 'A senha deve ter no máximo 12 caracteres',
    'password.minLength': 'A senha deve ter no mínimo 4 caracteres',
    'password.regex': 'A senha deve conter apenas letras e números',
  };
}
