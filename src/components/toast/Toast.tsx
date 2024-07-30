export interface IToastProps {
    className?: string;
    show: boolean;
}

function Toast({className, show}: IToastProps) {
    return <div className={`absolute top-4 right-4 ${className}`}>
        teste
    </div>
}

export default Toast;