from aiogram.utils.executor import start_polling

from main import dp, on_startup, on_shutdown

if __name__ == '__main__':
    start_polling(
        dispatcher=dp,
        on_startup=on_startup,
        on_shutdown=on_shutdown,
        skip_updates=True,
    )
