import TodoRadioButton from "./RadioButton.tsx";

type Priority = 1 | 2 | 3 | 4;

interface TodoProps {
    title: string;
    dueDate: string;
    priority: Priority;
}

export default function Todo({ title, dueDate, priority = 4 }: TodoProps){
    return (
        <div className="flex items-center gap-6 border-b border-quaternary px-4 py-6 w-150">
            <TodoRadioButton priority={priority} />
            <div className="flex flex-col gap-2 items-start">
                <h2 className="text-xl font-semibold">{title}</h2>
                <div className="flex items-center gap-2 text-[#404040]">
                    <img width="24px" src="src/assets/images/calendar.svg" alt="calendar"/>
                    <p>{dueDate}</p>
                </div>
            </div>
        </div>
    )
}
