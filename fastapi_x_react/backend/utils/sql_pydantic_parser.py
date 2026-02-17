from data.schemas import User, PendingUser, Todo
from utils.pydantic_cm import UserModel, PendingUserModel, TodoModel


def user_2_p(user: User) -> UserModel:
    return UserModel(
        id=user.id,
        firstName=user.firstName,
        lastName=user.lastName,
        email=user.email,
        passwordHash=user.passwordHash,
        authServiceProvider=user.authServiceProvider,
        avatar=user.avatar,
        refreshToken=user.refreshToken,
        createdAt=user.createdAt,
        deletedAt=user.deletedAt,
        lastLogIn=user.lastLogIn
    )

def user_2_s(user: UserModel) -> User:
    return User(
        id=user.id,
        firstName=user.firstName,
        lastName=user.lastName,
        email=user.email,
        passwordHash=user.passwordHash,
        authServiceProvider=user.authServiceProvider,
        avatar=user.avatar,
        refreshToken=user.refreshToken,
        createdAt=user.createdAt,
        deletedAt=user.deletedAt,
        lastLogIn=user.lastLogIn
    )

def pend_user_2_p(pend_user: PendingUser) -> PendingUserModel:
    return PendingUserModel(
        id=pend_user.id,
        firstName=pend_user.firstName,
        lastName=pend_user.lastName,
        email=pend_user.email,
        passwordHash=pend_user.passwordHash,
        authServiceProvider=pend_user.authServiceProvider
    )

def pend_user_2_s(pend_user: PendingUserModel) -> PendingUser:
    return PendingUser(
        id=pend_user.id,
        firstName=pend_user.firstName,
        lastName=pend_user.lastName,
        email=pend_user.email,
        passwordHash=pend_user.passwordHash,
        authServiceProvider=pend_user.authServiceProvider
    )

def todo_2_p(todo: Todo) -> TodoModel:
    print(f"todo id: -> {todo.userId}")
    return TodoModel(
        id=todo.id,
        title=todo.title,
        priority=todo.priority,
        isActive=todo.isActive,
        dueDate=todo.dueDate,
        createdAt=todo.createdAt,
        userId=todo.userId
    )

def todo_2_s(todo: TodoModel) -> Todo:
    return Todo(
        id=todo.id,
        title=todo.title,
        priority=todo.priority,
        isActive=todo.isActive,
        dueDate=todo.dueDate,
        createdAt=todo.createdAt,
        userId=todo.userId
    )