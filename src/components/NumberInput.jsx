export default function NumberInput ({
    label,
    value,
    onChange,
    error,
    errorMessage,
    helpText,
    min = "0",
    step = "1",
}) {
    return (
        <div className = "question-block">
            <label>{label}</label>

            <input
                type = "number"
                min = {min}
                step = {step}
                value = {value}
                onChange = {(e) => onChange(e.target.value)}
                className = {error ? "input-error" : ""}
                />

            {error && <p className = "error-text">{errorMessage}</p>}
            {helpText && <p className = "help-text">{helpText}</p>}
        </div>
    );
}