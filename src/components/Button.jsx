import { Icon } from '@iconify/react/dist/iconify.js';

/**
 * <Button variant="normal" />
 * <Button.Normal />
 * <ButtonNormal />
 */

// Base button component that all variants use
function BaseButton({
	as: Component = 'button',
	children = 'Tombol',
	iconName,
	disabled,
	className,
	...props
}) {
	return (
		<Component
			{...props}
			disabled={Component === 'button' ? disabled : undefined}
			className={className}
			aria-disabled={disabled}
		>
			{iconName && (
				<Icon className="inline mr-2" icon={iconName} width="1.5em" height="1.5em" />
			)}
			{children}
		</Component>
	);
}

// BaseButton.propTypes = {
// 	/** Render as different HTML element or component, eg: button, a, Link */
// 	as: PropTypes.elementType,
// 	/** Button children */
// 	children: PropTypes.node,
// 	/** Icon name from Iconify (https://iconify.design/) */
// 	iconName: PropTypes.string,
// 	/** Disabled state */
// 	disabled: PropTypes.bool,
// 	/** Additional CSS class */
// 	className: PropTypes.string,
// };

// Style configurations for each variant
const VARIANT_STYLES = {
	normal: {
		enabled:
			'cursor-pointer bg-white text-slate-900 ring-1 ring-inset ring-slate-600 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700',
		disabled:
			'bg-slate-300 text-slate-500 cursor-not-allowed dark:bg-slate-700 dark:text-slate-400',
	},
	danger: {
		enabled:
			'cursor-pointer text-red-700 bg-white ring-1 ring-inset ring-red-600 hover:bg-red-100',
		disabled: 'bg-red-200 text-red-400 cursor-not-allowed',
	},
	dark: {
		enabled:
			'cursor-pointer text-slate-200 bg-slate-800 ring-1 ring-inset ring-slate-600 hover:bg-slate-700',
		disabled: 'bg-slate-700 text-slate-400 cursor-not-allowed',
	},
};

// Create a factory function to generate button variants
function createButtonVariant(variant) {
	const buttonFunction = ({ disabled, ...props }) => {
		const variantStyles = VARIANT_STYLES[variant];
		const className = `
      flex items-center px-4 py-2 text-sm rounded-md shadow-sm 
      ${disabled ? variantStyles.disabled : variantStyles.enabled}
    `;

		return <BaseButton disabled={disabled} className={className} {...props} />;
	};

	buttonFunction.propTypes = BaseButton.propTypes;

	return buttonFunction;
}

// Create the button variants
const ButtonNormal = createButtonVariant('normal');
const ButtonDanger = createButtonVariant('danger');
const ButtonDark = createButtonVariant('dark');

// Main Button component
function Button({ variant = 'normal', ...props }) {
	switch (variant.toLowerCase()) {
		case 'danger':
			return <ButtonDanger {...props} />;
		case 'dark':
			return <ButtonDark {...props} />;
		default:
			return <ButtonNormal {...props} />;
	}
}

// Button.propTypes = {
// 	/** Button variant */
// 	variant: PropTypes.oneOf(['normal', 'danger', 'dark']),
// 	...BaseButton.propTypes,
// };

// Attach variants as properties of Button
Button.Normal = ButtonNormal;
Button.Danger = ButtonDanger;
Button.Dark = ButtonDark;

export default Button;
export { ButtonNormal, ButtonDanger, ButtonDark };
