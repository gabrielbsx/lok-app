import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class UpdateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string.nullableAndOptional({ trim: true }, [
      rules.maxLength(255),
    ]),
    email: schema.string.nullableAndOptional({ trim: true }, [
      rules.email(),
      rules.maxLength(255),
    ]),
    password: schema.string.nullableAndOptional({ trim: true, }, [
      rules.maxLength(12),
      rules.minLength(4),
      rules.regex(/^[a-zA-Z0-9]+$/),
      rules.confirmed('passwordConfirmation'),
    ]),
    tokenize: schema.string({ trim: true }, [
      rules.required(),
      rules.exists({ table: 'recoveries', column: 'token' }),
    ]),
  });

  public messages: CustomMessages = {
    'name.maxLength': 'O nome deve ter no máximo 255 caracteres',
    'email.email': 'O email deve ser um email válido',
    'email.maxLength': 'O email deve ter no máximo 255 caracteres',
    'password.maxLength': 'A senha deve ter no máximo 12 caracteres',
    'password.minLength': 'A senha deve ter no mínimo 4 caracteres',
    'password.regex': 'A senha deve conter apenas letras e números',
    'password.confirmed': 'A senha deve ser igual a confirmação',
    'passwrordConfirmation.required': 'A confirmação de senha é obrigatória',
    'tokenize.required': 'O token é obrigatório',
    'tokenize.exists': 'O token é inválido',
  };
}
