type Props = {
    children: React.ReactNode;
}

export const FeedWrapper = ({
    children    
}: Props) => {
    return (
        <div className="flex-1 relative top-0 pb-20 ">
            {children}
        </div>
    );
};

export default FeedWrapper;