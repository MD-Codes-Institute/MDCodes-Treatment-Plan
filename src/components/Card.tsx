interface CardProps {
    children: React.ReactNode
    className: string
}

const Card: React.FC<CardProps> = ({children, className}) => {
    return (
        <div className={`flex ${className} shadow-container w-full rounded-md bg-(--ion-background-inputs) p-2 min-h-10`}>
        {children}
        </div>
    )
}
export default Card