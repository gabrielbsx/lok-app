import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class CreatePackageValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    name: schema.string({ trim: true }, [
      rules.required(),
      rules.maxLength(255),
    ]),
    price: schema.number([
      rules.required(),
      rules.unsigned(),
    ]),
    bonus: schema.number([
      rules.required(),
      rules.unsigned(),
    ]),
    donate: schema.number([
      rules.required(),
      rules.unsigned(),
    ]),
    items: schema.array([
      rules.required(),
    ]).members(
      schema.object().members({
        id: schema.number([
          rules.required(),
          rules.unsigned(),
        ]),
        name: schema.string({ trim: true }, [
          rules.maxLength(255),
        ]),
        effects: schema.array([
          rules.required(),
          rules.minLength(3),
          rules.maxLength(3),
        ]).members(
          schema.object().members({
            effect: schema.number([
              rules.required(),
              rules.unsigned(),
            ]),
            value: schema.number([
              rules.required(),
              rules.unsigned(),
            ])
          })
        )
      })
    ),
  });
  public messages: CustomMessages = {
    'name.required': 'Nome do pacote é obrigatório',
    'name.maxLength': 'Nome do pacote deve conter no máximo 255 caracteres',
    'price.required': 'Preço do pacote é obrigatório',
    'price.unsigned': 'Preço do pacote inválido',
    'bonus.required': 'Bônus do pacote é obrigatório',
    'bonus.unsigned': 'Bônus do pacote inválido',
    'donate.required': 'Donate é obrigatório',
    'donate.unsigned': 'Donate inválido',
    'items.required': 'Itens do pacote obrigatório',
    'items.*.name.required': 'Nome do item obrigatório',
    'items.*.id.required': 'Index do item obrigatório',
    'items.*.id.unsigned': 'Index do item inválido',
    'items.*.effects.required': 'Efeitos do item obrigatório',
    'items.*.effects.minLength': 'Item deve conter 3 efeitos do item',
    'items.*.effects.maxLength': 'Item deve conter 3 efeitos do item',
    'items.*.effects.*.effect.required': 'Efeito do item obrigatório',
    'items.*.effects.*.effect.unsigned': 'Efeito inválido do item',
    'items.*.effects.*.value.required': 'Valor de efeito do item obrigatório',
    'items.*.effects.*.value.unsigned': 'Valor de efeito inválido do item',
  };
}
