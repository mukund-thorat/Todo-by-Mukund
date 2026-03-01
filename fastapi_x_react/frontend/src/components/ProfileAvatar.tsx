interface ProfileAvatarProps {
    name: string;
}

function ProfileAvatar({name}: ProfileAvatarProps) {
    return (
        <img
            className={`rounded-full border-4 hover:border-6 border-quaternary w-20`}
            src={`src/assets/images/avatars/${name}.jpg`}
            alt={name}
        />
    );
}

export default ProfileAvatar;
