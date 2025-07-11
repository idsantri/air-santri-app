const InputField = ({
	label,
	id,
	name,
	type = 'text',
	value,
	onChange,
	required = false,
	className = '',
	placeholder = '',
	disabled = false,
	additionalProps = {},
}) => {
	const defaultClassName =
		'block w-full rounded-md px-3 py-1.5 text-base text-slate-900 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-slate-500 sm:text-sm/6';

	return (
		<div className="p-2">
			{label && (
				<label
					htmlFor={id}
					className="block font-medium text-slate-900 dark:text-slate-100 text-sm/6"
				>
					{label}
				</label>
			)}
			<div className="mt-1">
				<input
					id={id}
					name={name}
					type={type}
					value={value}
					onChange={onChange}
					required={required}
					placeholder={placeholder}
					className={`${defaultClassName} ${className} ${
						disabled ? 'bg-slate-200' : ''
					}`}
					{...additionalProps}
					disabled={disabled}
				/>
			</div>
		</div>
	);
};

// InputField.propTypes = {
//   label: PropTypes.string,
//   id: function (props, propName, componentName) {
//     if (props['label'] && !props[propName]) {
//       return new Error(
//         `The prop \`${propName}\` is marked as required in \`${componentName}\`, but its value is \`undefined\`.`,
//       );
//     }
//   },
//   name: PropTypes.string.isRequired,
//   type: PropTypes.string,
//   value: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired,
//   required: PropTypes.bool,
//   className: PropTypes.string,
//   placeholder: PropTypes.string,
//   additionalProps: PropTypes.object,
//   disabled: PropTypes.bool,
// };

export default InputField;
