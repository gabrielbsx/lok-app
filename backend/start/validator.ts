//import { string } from '@ioc:Adonis/Core/Helpers';
import { validator } from '@ioc:Adonis/Core/Validator';
import Users from 'App/Models/Users';
import Application from '@ioc:Adonis/Core/Application';
import { readdirSync } from 'fs';

validator.rule('guildLeader', async (_value, _, options) => {
    let userId = parseInt(options.refs.userId.value as string);
    const user = await Users
        .query()
        .where('id', userId)
        .preload('characters', (characters) => {
            characters.preload('guild');
        })
        .first();
    if (!user) {
        options.errorReporter.report(
            options.pointer,
            'guildLeader.userNotFound',
            'User not found',
            options.arrayExpressionPointer
        );
        return;
    }
    let isGuildLeader = false;
    let hasGuild = false;
    for (const character of user!.characters) {
        if (character.guildId) {
            hasGuild = true;
            if (character.guildLevel >= 6) {
                isGuildLeader = true;
            }
        }
    }
    if (!hasGuild) {
        options.errorReporter.report(
            options.pointer,
            'guildLeader.userNotInGuild',
            'User is not in a guild',
            options.arrayExpressionPointer
        );
        return;
    }
    if (!isGuildLeader) {
        options.errorReporter.report(
            options.pointer,
            'guildLeader.userNotGuildLeader',
            'User is not a guild leader',
            options.arrayExpressionPointer
        );
        return;
    }
    return true;
}, () => {
    return {
        async: true,
        compiledOptions: {},
    };
});

validator.rule('guildmarkBaseExists', async (value, _, options) => {
    const guildmarks = readdirSync(Application.publicPath('guildmark'));
    const guildmark = value;
    if (!guildmarks.includes(guildmark)) {
        options.errorReporter.report(
            options.pointer,
            'guildmarkBaseExists.guildmarkBaseNotFound',
            'Guildmark não encontrada',
            options.arrayExpressionPointer
        );
        return;
    }
    return true;
}, () => {
    return {
        async: true,
        compiledOptions: {},
    };
});
