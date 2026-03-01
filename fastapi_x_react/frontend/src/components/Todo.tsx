import TodoRadioButton from "./RadioButton.tsx";

type Priority = 1 | 2 | 3 | 4;

interface TodoProps {
    id: string;
    title: string;
    checked: boolean;
    dueDate: string;
    priority: Priority;
}

export default function Todo({ id, title, checked, dueDate, priority = 4 }: TodoProps){
    return (
        <div className="flex justify-between items-center gap-6 border-b border-quaternary px-4 py-6 w-150">
            <div className="flex items-center gap-6">
                <TodoRadioButton mark={checked} priority={priority} todoId={id} />
                <div className="flex flex-col gap-2 items-start">
                    <h2 className="text-xl font-semibold">{title}</h2>
                    <div className="flex items-center gap-2 text-[#404040]">
                        <img width="24px" src="src/assets/images/calendar.svg" alt="calendar"/>
                        <p>{dueDate}</p>
                    </div>
                </div>
            </div>
            <div className="items-center gap-2 hidden hover:flex">
                <img className="p-2 hover:bg-secondary rounded-lg" src="src/assets/images/edit.svg" alt="edit"/>
                <img className="p-2 hover:bg-secondary rounded-lg" src="src/assets/images/trash.svg" alt="remove"/>
            </div>
        </div>
    )
}
