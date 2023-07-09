import './form-input.styles.scss';

const FormInput = ({label , ...otherProps}) => {
   return (
    <div className="group">
       <input className='form-input' {...otherProps}></input>
       {label && (<label 
        className={`${otherProps.value.length ? 'shrink':null} form-input-label`}
        > 
        {label}
        </label>
       )}
      
    </div>
   );
};

export default FormInput;

//Give div a dynamic class name, as if you look it its functionality it moved up as we click on input field

/* This class name value typically is a string, but you can render string in JavaScript, which means

that you can actually say that for this class name.

I want to render some string interpolated string where the value inside is going to be dependent on

this other props value. */

/* Essentially what this code says is that for this group element, which is our top level div inside,

there's a form input.

If you focus on the input, meaning that if it's selected, I want you to find the next sibling or a

generally subsequent sibling with this class and then attach that shrink label.

Nixon Which is what creates the label shrinking effect.*/