import { Injectable } from '@nestjs/common'
import { CallbackService } from './callback.service'

@Injectable()
export class GreetingService {
    constructor(private readonly projectService: CallbackService) {}
    async greeting(bot, chatId, msg) {
        await bot.sendMessage(
            chatId,
            `Здравствуйте @${msg?.chat?.username}! Это мой бот(@Zoomish). Напишите мне любое сообщение и я отвечу вам в ближайшее время.`,
            {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: 'Edit Text',
                                callback_data: 'edit',
                            },
                        ],
                    ],
                },
            }
        )
        await bot.on('callback_query', async (callbackQuery) => {
            await this.projectService.callback(bot, callbackQuery)
        })
    }
}
