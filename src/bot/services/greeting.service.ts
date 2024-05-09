import { Injectable } from '@nestjs/common'
import { CallbackService } from './callback.service'

@Injectable()
export class GreetingService {
    constructor(private readonly callbackService: CallbackService) {}
    async greeting(bot, chatId, msg) {
        await bot.sendMessage(
            chatId,
            `Здравствуйте ${msg?.chat?.first_name}! Это мой бот(@Zoomish). Он был написан для удобства HR-ов и для краткого обзора меня и моих проектов`,
            {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: 'About',
                                callback_data: 'about',
                            },
                        ],
                    ],
                },
            }
        )
        await bot.on('callback_query', async (callbackQuery) => {
            await this.callbackService.callback(bot, callbackQuery)
        })
    }
}
