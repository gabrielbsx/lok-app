import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class GuildmarkValidator {
  constructor(protected ctx: HttpContextContract) {}

  public refs = schema.refs({
    userId: this.ctx.auth.user!.id,
  })
  
  public schema = schema.create({
    guildmark: schema.file.optional({
      extnames: ['bmp', 'png'],
      size: '1mb',
    }, [
      rules.requiredIfNotExists('guildmarkSelected'),
    ]),
    guildmarkSelected: schema.string.optional({}, [
      rules.requiredIfNotExists('guildmark'),
      rules.guildmarkBaseExists(),
    ]),
    guild: schema.string([
      rules.required(),
      rules.exists({ table: 'guilds', column: 'id' }),
      rules.guildLeader(),
    ]),
  });
  
  public messages: CustomMessages = {
    'file.extname': 'O arquivo deve ser do tipo bmp',
    'file.size': 'Apenas imagens de até 1MB são permitidas',
    'guild.required': 'O campo guild é obrigatório',
    'guild.exists': 'Guild não encontrada',
    'guild.guildLeader': 'O usuário não é o líder do seu guild',
    'guild.guildLeader.userNotFound': 'Usuário não encontrado',
    'guild.guildLeader.userNotInGuild': 'Usuário não está em uma guilda',
    'guild.guildLeader.userNotGuildLeader': 'Usuário não é líder ou sublíder da referida guilda',
    'guildmarkSelected.required': 'É necessário que selecione uma guildmark ou envie uma guildmark obrigatório',
    'guildmarkSelected.guildmarkBaseExists.guildmarkBaseNotFound': 'Guildmark não encontrada',
    'guildmark.required': 'É necessário que selecione uma guildmark ou envie uma guildmark obrigatório',
    'guildmark.extname': 'O arquivo deve ser do tipo bmp',
    'guildmark.size': 'Tamanho da imagem incompatível',
  };
}
