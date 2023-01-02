import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    name: schema.string.nullableAndOptional({ trim: true }, [
      rules.maxLength(255),
    ],),
    email: schema.string.nullableAndOptional({ trim: true }, [
      rules.email(),
      rules.maxLength(255),
    ]),
    username: schema.string({ trim: true }, [
      rules.required(),
      rules.unique({ table: 'users', column: 'username', caseInsensitive: true }),
      rules.maxLength(10),
      rules.minLength(4),
      rules.regex(/^[a-zA-Z0-9]+$/),
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
    'name.maxLength': 'O nome deve ter no máximo 255 caracteres',
    'email.email': 'O email deve ser um email válido',
    'email.maxLength': 'O email deve ter no máximo 255 caracteres',
    'username.unique': 'Usuário já em uso',
    'username.required': 'O usuário é obrigatório',
    'username.maxLength': 'O usuário deve ter no máximo 10 caracteres',
    'username.minLength': 'O usuário deve ter no mínimo 4 caracteres',
    'username.regex': 'O uuárioe deve conter apenas letras e números',
    'password.required': 'A senha é obrigatória',
    'password.maxLength': 'A senha deve ter no máximo 12 caracteres',
    'password.minLength': 'A senha deve ter no mínimo 4 caracteres',
    'password.regex': 'A senha deve conter apenas letras e números',
    'password.confirmed': 'A senha deve ser igual a confirmação',
    'passwrordConfirmation.required': 'A confirmação de senha é obrigatória',
  };
}
