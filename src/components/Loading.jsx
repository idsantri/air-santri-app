const Loading = () => {
	return (
		<div
			style={{
				width: '150px',
				height: '150px',
				margin: 'auto',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<div
				className="loading loading-ring loading-lg"
				style={{ width: '100px' }}
			></div>
		</div>
	);
};
export default Loading;
