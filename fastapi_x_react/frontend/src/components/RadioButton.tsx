type Priority = 1 | 2 | 3 | 4;

interface TodoRadioProps {
    priority: Priority;
}

function TodoRadioButton({priority}: TodoRadioProps) {
    const borderColorMap: Record<Priority, string> = {
        1: "border-radio-p1-p",
        2: "border-radio-p2-p",
        3: "border-radio-p3-p",
        4: "border-radio-p4-p",
    };
    const bgColorMap: Record<Priority, string> = {
        1: "bg-radio-p1-s",
        2: "bg-radio-p2-s",
        3: "bg-radio-p3-s",
        4: "bg-radio-p4-s",
    };

    const borderColor = borderColorMap[priority];
    const bgColor = bgColorMap[priority];

    return (
        <label className="flex items-center justify-center">
            <input className="hidden" type="radio"/>
            <span className={`w-8 h-8 border-4 ${borderColor} ${bgColor} rounded-full inline-block relative cursor-pointer`}></span>
        </label>
    );
}

export default TodoRadioButton;
