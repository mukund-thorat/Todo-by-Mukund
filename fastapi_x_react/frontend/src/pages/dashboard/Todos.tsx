import Todo from "../../components/Todo.tsx";
import {useQuery} from "@tanstack/react-query";
import {getActiveTodos} from "../../api/active-todos.ts";


function Todos(){
    const {data, isError, isLoading} = useQuery({
        queryKey: ["todos"],
        queryFn: getActiveTodos,
        select: (todos) => [...todos].sort((a, b) => {
            const priorityA = Math.min(4, Math.max(1, a.priority));
            const priorityB = Math.min(4, Math.max(1, b.priority));

            if (priorityA !== priorityB) return priorityA - priorityB;

            const dueA = new Date(a.dueDate).getTime();
            const dueB = new Date(b.dueDate).getTime();
            return dueA - dueB;
        }),
        staleTime: Infinity,
        refetchOnWindowFocus: false
    });

    if (isLoading)
        return <div>Loading...</div>;

    if (isError)
        return <div>Something went wrong.</div>;

    return (
        <div className="mt-25 flex flex-col items-center justify-center">
            {data?.map((todo, index) => (
                <Todo
                    id={todo.id}
                    checked={todo.isActive}
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
