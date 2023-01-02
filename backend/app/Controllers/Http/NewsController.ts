import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import News, { INews } from 'App/Models/News'
import Application from '@ioc:Adonis/Core/Application'
import { v4 } from 'uuid'
import Env from '@ioc:Adonis/Core/Env'

export default class NewsController {
  private limit = 10

  public async all({ request, response }: HttpContextContract) {
    const news = await News.query()
      .orderBy('updatedAt', 'desc')
      .orderBy('id', 'desc')
      .paginate(request.input('page', 1), request.input('limit', this.limit))

    return response.json({
      news,
    })
  }

  public async create({ request, response, auth }: HttpContextContract) {
    const user = auth.use('api').user!
    const { title, description, content, category } = request.only([
      'title',
      'description',
      'content',
      'category',
    ]) as INews

    let { thumbnailUrl } = request.body()
    const thumbnail = request.file('thumbnail')

    if (thumbnail) {
      if (!['png', 'jpg', 'jpeg'].includes(thumbnail.extname!)) {
        return response.status(400).json({
          statusCode: 400,
          message: 'A imagem deve ser PNG, JPG ou JPEG',
        })
      }
      const fileName = `${v4()}.${thumbnail.extname}`
      await thumbnail.move(Application.publicPath('news/'), {
        name: fileName,
        overwrite: true,
      })
      thumbnailUrl = `${Env.get('SITE')}/news/${fileName}`
    }

    const news = new News()
    news.title = title
    news.description = description
    news.content = content
    news.category = category
    news.thumbnail = thumbnailUrl
    news.userId = user.id

    await news.save()

    return response.json({
      statusCode: 200,
      message: 'Notícia criada com sucesso',
      news,
    })
  }

  public async getBySlug({ params, response }: HttpContextContract) {
    const { slug } = params as { slug: string }

    const news = await News.findBy('slug', slug)

    return response.json({
      news,
    })
  }

  public async update({ request, params, response }: HttpContextContract) {
    const { title, description, content, category } = request.only([
      'title',
      'description',
      'content',
      'category',
    ]) as INews
    let { thumbnailUrl } = request.body()

    const news = await News.findBy('slug', params.slug)

    if (!news) {
      return response.status(404).json({
        statusCode: 404,
        message: 'Notícia não encontrada',
      })
    }

    news.title = title
    news.description = description
    news.content = content
    news.category = category
    news.thumbnail = thumbnailUrl

    const thumbnail = request.file('thumbnail')

    if (thumbnail) {
      if (!['png', 'jpg', 'jpeg'].includes(thumbnail.extname!)) {
        return response.status(400).json({
          statusCode: 400,
          message: 'A imagem deve ser PNG, JPG ou JPEG',
        })
      }
      const fileName = `${v4()}.${thumbnail.extname}`
      await thumbnail.move(Application.publicPath('news/'), {
        name: fileName,
        overwrite: true,
      })
      thumbnailUrl = `${Env.get('SITE')}/news/${fileName}`
    }

    await news.save()

    return response.json({
      statusCode: 200,
      message: 'Notícia atualizada com sucesso',
      news,
    })
  }

  public async delete({ params, response }: HttpContextContract) {
    const { slug } = params as { slug: string }

    const news = await News.findBy('slug', slug)

    if (!news) {
      return response.status(404).json({
        statusCode: 404,
        message: 'Notícia não encontrada',
      })
    }

    await news.delete()

    return response.json({
      statusCode: 200,
      message: 'Notícia deletada com sucesso',
    })
  }
}
