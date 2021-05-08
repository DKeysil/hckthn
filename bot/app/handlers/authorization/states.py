from aiogram.dispatcher.filters.state import StatesGroup, State


class AuthStates(StatesGroup):
    login_requested = State()
    password_requested = State()
