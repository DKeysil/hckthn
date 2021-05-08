from app.main import dp, bot
from aiogram import types
from aiogram.dispatcher import FSMContext
from .states import AuthStates


@dp.message_handler(commands=['start'], state='*')
async def authorization_handler(msg: types.Message, state: FSMContext):
    msg_text = "Приветствую! Тебя не должно волновать кто я такой. \n" \
               "Я помогу тебе узнать информацию о тасках, висящих в планах твоей команды."
    await bot.send_message(msg.from_user.id, msg_text)
    async with state.proxy() as data:
        if not data.get("authorized"):
            msg_text = "Для того чтобы я что-то тебе сказал, нужно пройти авторизацию." \
                       "Отправь мне свой логин"
            bot.send_message(msg.from_user.id, msg_text)
            await AuthStates.login_requested.set()
        else:
            txt = "Для запроса информации о планах и задачах, воспользуйся кнопкой меню ну..."
        await bot.send_message(msg.from_user.id, txt)


@dp.message_handler(state=AuthStates.login_requested, content_types=types.ContentType.ANY)
async def authorization_login_stage(msg: types.Message, state: FSMContext):
    if msg.content_type is not types.ContentType.TEXT:
        await bot.send_message(msg.from_user.id, text="Я жду твоего логина")
        return
    async with state.proxy() as data:
        data['login'] = msg.text
        data.state = AuthStates.password_requested
    await bot.send_message(msg.from_user.id, text="Окей, теперь отправь мне свой пароль")


@dp.message_handler(state=AuthStates.password_requested, content_types=types.ContentType.ANY)
async def authorization_login_stage(msg: types.Message, state: FSMContext):
    if msg.content_type is not types.ContentType.TEXT:
        await bot.send_message(msg.from_user.id, text="Я жду твоего пароля")
        return
    await bot.send_message(msg.from_user.id, text="Окей, теперь отправь мне свой пароль")
    await state.set_state(AuthStates.password_requested)