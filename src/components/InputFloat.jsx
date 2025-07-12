const InputFloat = ({
	id,
	type = 'text',
	label,
	placeholder = '',
	value,
	onChange,
	className = '',
	labelClassName = '',
	required = false,
	disabled = false,
	...props
}) => {
	return (
		<div className="mt-4 mb-2">
			<label htmlFor={id} className="relative">
				<input
					type={type}
					id={id}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					required={required}
					disabled={disabled}
					className={`peer w-full rounded border-gray-300 p-2 border ${className}`}
					{...props}
				/>

				<span
					className={`absolute inset-y-0 start-2 -translate-y-5 px-0.5 text-sm font-medium text-gray-600 transition-transform 
            peer-placeholder-shown:translate-y-0 
            peer-focus:-translate-y-6
            peer-focus:bg-blue-50
            peer-focus:text-xs
            ${labelClassName}
          `}
				>
					{label}
				</span>
			</label>
		</div>
	);
};
export default InputFloat;
