export default function CheckboxGroup ({
    label,
    options,
    selectedOptions,
    onToggle,
    helpText
   }) {
    return (
        <div className = "question-block">
            <label>{label}</label>

            <div className = "checkbox-group">
                {options.map((item) => (
                    <label key = {item} className = "checkbox-item">
                        <input
                            type = "checkbox"
                            checked = {selectedOptions.includes(item)}
                            onChange = {() => onToggle(item)}
                    />
                        {item}
                    </label>
                ))}
            </div>

            {helpText && <p className = "help-text">{helpText}</p>}

        </div>
    );
}