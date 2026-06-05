export default function SelectInput ({
    label,
    value,
    onChange,
    options,
    error,
    errorMessage,
    helpText
 }) {
    return (
        <div className = "question-block">
            <label>{label}</label>

            <select
                value = {value}
                onChange = {(e) => onChange (e.target.value)}
                className = {error ? "input-error" : ""}
            >
                <option value = "">Select</option>

                {options.map((option) => (
                    <option key = {option.value} value = {option.value}>
                        {option.label}
                    </option>
                ))}
                </select>

            {error && <p className = "error-text">{errorMessage}</p>}
            {helpText && <p className = "help-text">{helpText}</p>}

        </div>
    );
}