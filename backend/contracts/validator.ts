declare module '@ioc:Adonis/Core/Validator' {
    interface Rules {
        guildLeader(): Rule;
        guildmarkBaseExists(): Rule;
    }
}