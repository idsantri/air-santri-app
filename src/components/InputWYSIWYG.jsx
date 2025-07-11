import PropTypes from 'prop-types';
import {
  BtnBold,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnRedo,
  BtnStrikeThrough,
  BtnUnderline,
  BtnUndo,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from 'react-simple-wysiwyg';

const InputWYSIWYG = ({ value, onChange, disabled = false }) => {
  return (
    <>
      <label className="block font-medium text-slate-900 dark:text-slate-100 text-sm/6">Thread Content *</label>
      <EditorProvider>
        <Editor
          value={value}
          onChange={onChange}
          className={`bg-slate-50 text-slate-950 dark:bg-slate-800 dark:text-slate-50 ${disabled ? 'bg-slate-200' : ''}`}
          disabled={disabled}
        >
          <Toolbar>
            <BtnUndo />
            <BtnRedo />
            <Separator />
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnLink />
            <BtnClearFormatting />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </>
  );
};

InputWYSIWYG.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
export default InputWYSIWYG;
