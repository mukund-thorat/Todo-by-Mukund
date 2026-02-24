interface AvatarProps {
    name: string;
    selected: string | null;
    onClick: () => void;
}

function Avatar({name, onClick, selected}: AvatarProps) {
    const isSelected = name === selected;

    return (
        <img
            className={`rounded-full border-6 hover:border-10 border-quaternary ${isSelected ? "w-60 border-9": "w-50"}`}
            src={`src/assets/images/avatars/${name}.jpg`}
            alt={name}
            onClick={() => onClick()}
        />
    );
}

export default Avatar;
