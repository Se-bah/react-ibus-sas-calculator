export default function ResultBox({
    title,
    score,
    interpretation,
    referenceValues
}) {
    return (
        <div className = "result">
            <h2>{title}: {score}</h2>

            <p>
                <strong>Interpretation: </strong> {interpretation}
            </p>

            <div className = "reference-values">
                <strong>Values: </strong>
                <ul>
                    {referenceValues.map((item) => (
                        <li key = {item}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}