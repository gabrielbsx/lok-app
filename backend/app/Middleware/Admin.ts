import { AuthenticationException } from '@adonisjs/auth/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class Admin {
  public async handle({ auth }: HttpContextContract, next: () => Promise<void>) {
    const user = auth.use('api').user!;

    if (user.accessLevel === 'Admin') {
      return await next();
    }

    throw new AuthenticationException(
      'Unauthorized access',
      'E_UNAUTHORIZED_ACCESS',
    );
  }
}
