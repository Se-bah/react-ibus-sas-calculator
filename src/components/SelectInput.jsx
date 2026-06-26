export default function SelectInput ({
    label,
    value,
    onChange,
    options,
    helpText
 }) {
    return (
        <div className = "question-block">
            <label>{label}</label>

            <select
                value = {value}
                onChange = {(e) => onChange (e.target.value)}
            >
                <option value = "">Select</option>

                {options.map((option) => (
                    <option key = {option.value} value = {option.value}>
                        {option.label}
                    </option>
                ))}
                </select>
            {/* Error message is no longer needed in the current live-update score state
            {error && <p className = "error-text">{errorMessage}</p>}
            */}

            {helpText && <p className = "help-text">{helpText}</p>}

        </div>
    );
}