import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Logger from '@ioc:Adonis/Core/Logger';
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler';

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger);
  }

  // todo: criar um json onde contenha os tipos de erros e retornos
  public errors = [];

  public async handle(error: any, ctx: HttpContextContract) {
    if (error.code === 'E_ROUTE_NOT_FOUND') {
      return ctx.response.json({
        statusCode: 404,
        message: 'Não foi possível encontrar a rota solicitada!',
      });
    }

    if (error.code === 'E_VALIDATION_FAILURE') {
      return ctx.response.json({
        statusCode: 400,
        message: 'Erro de validação!',
        errors: error.messages.errors,
      });
    }
  }
}
