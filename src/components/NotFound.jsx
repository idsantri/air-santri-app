import PropTypes from 'prop-types';
const NotFound = ({ children }) => {
  return (
    <div className="p-4 border border-red-600 rounded bg-red-50">
      <p className="text-lg text-center text-red-800">{children}</p>
    </div>
  );
};
NotFound.propTypes = {
  children: PropTypes.node,
};
export default NotFound;
