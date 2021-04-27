import * as React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { useContext } from 'react';
import { UserContext } from './../../App';

export const Shipment = () => {
     
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const onSubmit = data => {
    console.log('form submitted', data)
  };
  console.log(watch("example")); // watch input value by passing the name of it
  return (
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
      
      <input name="name" defaultValue={loggedInUser.name} {...register("nameRequired")} placeholder="Your Name" />
          
      <input name="email" defaultValue={loggedInUser.email}  {...register("rmailRequired")} placeholder="Your Email"/>
           
      <input name="address"  {...register("addressRequired", { required: true })} placeholder="Your Address"/>
      {errors.addressRequired && <span className="error">Address is required</span>}
      
      <input name="phone"  {...register("phoneRequired", { required: true })} placeholder="Your Phone number"/>
      {errors.phoneRequired && <span className="error">Phone Number is required</span>}
      
      <input type="submit" />
    </form>
  );

};

export default Shipment;

