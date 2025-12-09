import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import './Dropdown.css';

const Dropdown = ({
    options = [],
    value,
    onChange,
    placeholder = "Select an option",
    name,
    disabled = false,
    className = "",
    multiSelection = false
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Helper to get label and value from option (handles both string and object)
    const getOptionLabel = (option) => {
        if (typeof option === 'object' && option !== null) {
            return option.label || option.value;
        }
        return option;
    };

    const getOptionValue = (option) => {
        if (typeof option === 'object' && option !== null) {
            return option.value;
        }
        return option;
    };

    const handleSelect = (option) => {
        if (disabled) return;

        const optionValue = getOptionValue(option);
        const optionLabel = getOptionLabel(option);

        if (multiSelection) {
            let newValue = Array.isArray(value) ? [...value] : [];

            // Check if already selected by value
            const existingIndex = newValue.findIndex(item => item.value === optionValue);

            if (existingIndex >= 0) {
                // Remove if already selected
                newValue.splice(existingIndex, 1);
            } else {
                // Add if not selected
                newValue.push({ label: optionLabel, value: optionValue });
            }

            if (onChange) {
                onChange(newValue);
            }
            // Don't close dropdown for multi-selection
        } else {
            if (onChange) {
                onChange(optionValue);
            }
            setIsOpen(false);
        }
    };

    let displayValue = placeholder;
    if (multiSelection) {
        if (Array.isArray(value) && value.length > 0) {
            displayValue = value.map(v => v.label).join(', ');
        }
    } else {
        const selectedOption = options.find(opt => getOptionValue(opt) === value);
        if (selectedOption) {
            displayValue = getOptionLabel(selectedOption);
        }
    }

    return (
        <div className={`dropdown ${className}`} ref={dropdownRef}>
            <div
                className={`dropdown-header ${isOpen ? 'open' : ''} ${disabled ? 'disabled' : ''} ${value && (multiSelection ? value.length > 0 : true) ? 'selected' : ''}`}
                onClick={() => !disabled && setIsOpen(!isOpen)}
                role="combobox"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                aria-controls={`${name}-listbox`}
                tabIndex={disabled ? -1 : 0}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        if (!disabled) setIsOpen(!isOpen);
                    } else if (e.key === 'Escape') {
                        setIsOpen(false);
                    }
                }}
            >
                <span className="dropdown-display-value">{displayValue}</span>
                <ChevronDown
                    size={20}
                    style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s',
                        color: 'var(--primary-o-color)'
                    }}
                />
            </div>
            {isOpen && (
                <div
                    className="dropdown-list"
                    role="listbox"
                    id={`${name}-listbox`}
                >
                    {!multiSelection && (
                        <div
                            className={`dropdown-item ${value === "" ? 'selected' : ''}`}
                            onClick={() => handleSelect({ value: "", label: placeholder })}
                            role="option"
                            aria-selected={value === ""}
                            tabIndex={0}
                        >
                            <span>{placeholder}</span>
                            {value === "" && <Check size={16} />}
                        </div>
                    )}

                    {options.map((option, index) => {
                        const optValue = getOptionValue(option);
                        const optLabel = getOptionLabel(option);

                        let isSelected = false;
                        if (multiSelection) {
                            isSelected = Array.isArray(value) && value.some(v => v.value === optValue);
                        } else {
                            isSelected = optValue === value;
                        }

                        return (
                            <div
                                key={index}
                                className={`dropdown-item ${isSelected ? 'selected' : ''}`}
                                onClick={() => handleSelect(option)}
                                role="option"
                                aria-selected={isSelected}
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        handleSelect(option);
                                    }
                                }}
                            >
                                <span>{optLabel}</span>
                                {isSelected && <Check size={16} />}
                            </div>
                        );
                    })}
                    {options.length === 0 && (
                        <div className="dropdown-item" style={{ cursor: 'default', color: 'var(--muted-o)' }}>
                            No options available
                        </div>
                    )}
                </div>
            )}

            {/* Hidden input for form submission compatibility */}
            <input type="hidden" name={name} value={multiSelection ? JSON.stringify(value) : (value || '')} />
        </div>
    );
};

export default Dropdown;
