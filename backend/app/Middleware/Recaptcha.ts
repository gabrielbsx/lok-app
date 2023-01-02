import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Env from '@ioc:Adonis/Core/Env';
import axios from 'axios';

export default class Recaptcha {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    const { token } = request.only(['token']);
    const { data } = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
      params: {
        secret: Env.get('RECAPTCHA_SECRET'),
        response: token,
      },
    });
    if (!data.success) {
      return response.status(400).json({
        statusCode: 400,
        errors: [
          { message: 'Recaptcha inválido e/ou expirado', }
        ],
      });
    }
    return await next();
  }
}
