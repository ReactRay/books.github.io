const { useState } = React


export function LongTxt({ txt, length = 40 }) {
    const [isExpanded, setIsExpanded] = useState(false);

    function toggleText() {
        setIsExpanded(!isExpanded);
    };

    return (
        <div >
            {isExpanded ? txt : `${txt.slice(0, length)}${txt.length > length ? '...' : ''}`}
            {txt.length > length && (
                <span
                    onClick={toggleText}
                    className="long-txt"
                >
                    {isExpanded ? 'Read Less' : 'Read More'}
                </span>
            )}
        </div>
    );
};

