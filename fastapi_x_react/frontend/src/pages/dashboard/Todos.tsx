import Todo from "../../components/Todo.tsx";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {fetchActiveTodos} from "../../store/todoSlice.ts";

function Todos(){
    const dispatch = useAppDispatch();
    const todos = useAppSelector((state) => state.todos.items);
    const status = useAppSelector((state) => state.todos.status);
    const error = useAppSelector((state) => state.todos.error);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchActiveTodos());
        }
    }, [status, dispatch]);

    if (status === "loading") {
        return <div className="mt-25 text-center">Loading todos...</div>;
    }

    if (status === "failed") {
        return <div className="mt-25 text-center text-red-500">{error}</div>;
    }

    return (
        <div className="mt-25 flex flex-col items-center justify-center">
            {todos.map((todo, index) => (
                <Todo
                    key={`${todo.title}-${index}`}
                    priority={Math.min(4, Math.max(1, Math.round(todo.priority))) as 1 | 2 | 3 | 4}
                    dueDate={todo.dueDate.toLocaleDateString()}
                    title={todo.title}
                />
            ))}
        </div>
    )
}

export default Todos;
